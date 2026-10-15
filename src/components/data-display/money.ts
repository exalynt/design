/*
 * Money as the API has it: a whole number of the currency's minor unit
 * (cents, for dollars), never a decimal, so sums never pick up float error.
 * These turn it into text for the reader, in their browser's locale, and turn
 * what they type back into cents.
 */

export type MoneyOptions = {
  /** The ISO 4217 code the amount is in. Pass the one the API gives with it. */
  currency?: string;
  /**
   * Round to whole units ($38,000) for a headline figure where cents are
   * noise. Never for an amount someone pays or is owed.
   */
  rounded?: boolean;
};

const formats = new Map<string, Intl.NumberFormat>();

/* One formatter per currency and rounding, kept, since tables call this for every row. */
function format(currency: string, rounded: boolean) {
  const key = `${currency}:${rounded}`;
  let found = formats.get(key);
  if (!found) {
    found = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      ...(rounded ? { maximumFractionDigits: 0 } : {}),
    });
    formats.set(key, found);
  }
  return found;
}

/* Digits after the point in the currency: 2 for USD, 0 for JPY. */
function minorDigits(currency: string) {
  return format(currency, false).resolvedOptions().maximumFractionDigits ?? 2;
}

/**
 * An amount in cents as the reader reads money: `formatMoney(120050)` is
 * "$1,200.50" in the US. The decimal is written out as text ("1200.50") for
 * the formatter, never divided into a float, so every cent survives.
 */
export function formatMoney(
  cents: number,
  { currency = "USD", rounded = false }: MoneyOptions = {},
) {
  const digits = minorDigits(currency);
  const units = String(Math.abs(cents)).padStart(digits + 1, "0");
  const decimal = digits ? `${units.slice(0, -digits)}.${units.slice(-digits)}` : units;
  return format(currency, rounded).format(`${cents < 0 ? "-" : ""}${decimal}` as `${number}`);
}

/**
 * What someone typed into an amount field, in cents: "1,200.50" is 120050.
 * Commas and spaces are ignored and a leading minus is kept. It's `null` when
 * the text isn't an amount, or has more decimals than the currency, so the
 * field can say so. Worked out from the digits as text, never through a float.
 */
export function parseMoney(
  text: string,
  { currency = "USD" }: Pick<MoneyOptions, "currency"> = {},
) {
  const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(text.replace(/[\s,]/g, ""));
  if (!match) return null;
  const [, minus, whole, fraction = ""] = match;
  const digits = minorDigits(currency);
  if (!whole && !fraction) return null;
  if (fraction.length > digits) return null;
  const cents = Number(whole || 0) * 10 ** digits + Number(fraction.padEnd(digits, "0") || 0);
  if (!Number.isSafeInteger(cents)) return null;
  return minus && cents ? -cents : cents;
}
