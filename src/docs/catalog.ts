import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { CalloutPanelDemo } from "../components/CalloutPanel.demo";
import { CapacityBlockDemo } from "../components/CapacityBlock.demo";
import { CapacityDetailsDemo } from "../components/CapacityDetails.demo";
import { CapacityEngineerDemo } from "../components/CapacityEngineer.demo";
import { CapacityFigureDemo } from "../components/CapacityFigure.demo";
import { CapacityLineDemo } from "../components/CapacityLine.demo";
import { CapacityPlacementDemo } from "../components/CapacityPlacement.demo";
import { ConfirmDialogDemo } from "../components/ConfirmDialog.demo";
import { DateTimeDemo } from "../components/DateTime.demo";
import { EmptyStateDemo } from "../components/EmptyState.demo";
import { EngineerDetailsDemo } from "../components/EngineerDetails.demo";
import { EngineerLevelBadgeDemo } from "../components/EngineerLevelBadge.demo";
import { EngineerLevelDetailsDemo } from "../components/EngineerLevelDetails.demo";
import { PageHeaderDemo } from "../components/PageHeader.demo";
import { SearchMultiSelectDemo } from "../components/SearchMultiSelect.demo";
import { SearchSelectDemo } from "../components/SearchSelect.demo";
import { SectionCardDemo } from "../components/SectionCard.demo";
import { StatCardDemo } from "../components/StatCard.demo";
import { MaturityDetailsDemo } from "../components/MaturityDetails.demo";
import { MaturityRingDemo } from "../components/MaturityRing.demo";
import { StabilityBannerDemo } from "../components/StabilityBanner.demo";
import { StabilityDetailsDemo } from "../components/StabilityDetails.demo";
import { StabilityMarkDemo } from "../components/StabilityMark.demo";
import { ThemeToggleDemo } from "../components/ThemeToggle.demo";
import { ToastProviderDemo } from "../components/ToastProvider.demo";
import { CursorPagerDemo } from "../components/table/CursorPager.demo";
import { DataTableDemo } from "../components/table/DataTable.demo";
import { ListTableDemo } from "../components/table/ListTable.demo";
import { Mark } from "../exalynt";
import { BrandDemo } from "../exalynt/Brand.demo";
import { PaletteDemo } from "./foundations/Palette";
import { CapacityBlocksGuideline } from "./guidelines/CapacityBlocks";
import { DatesAndTimesGuideline } from "./guidelines/DatesAndTimes";
import { EngineerLevelsGuideline } from "./guidelines/EngineerLevels";
import { FormsGuideline } from "./guidelines/Forms";
import { MoneyGuideline } from "./guidelines/Money";
import { MuiFirstGuideline } from "./guidelines/MuiFirst";
import { PagesGuideline } from "./guidelines/Pages";
import { TablesGuideline } from "./guidelines/Tables";
import { ToastsGuideline } from "./guidelines/Toasts";
import { TypographyDemo } from "./foundations/Typography";
import { MaturityGuideline } from "./guidelines/Maturity";
import { StabilityLevelsGuideline } from "./guidelines/StabilityLevels";

export type Entry = {
  /** The export's name; also the page's address (#PageHeader). */
  title: string;
  description: string;
  /** The package entry point it's imported from, if it's exported. */
  importFrom?: "components" | "exalynt";
  /** How it behaves on a phone, shown in the page's "On phones" callout. */
  phone?: string;
  icon: ComponentType<SvgIconProps>;
  Demo: ComponentType;
};

export type Group = { title: string; entries: Entry[] };

/* Every page, grouped as the side nav shows them. A new component adds its demo here. */
export const catalog: Group[] = [
  {
    title: "Foundations",
    entries: [
      {
        title: "MUI first",
        description:
          "Pages are built from MUI's components, styled by the theme. This system adds a component only where MUI alone doesn't do the job well, and when it lists one for a job, use it.",
        icon: LayersOutlinedIcon,
        Demo: MuiFirstGuideline,
      },
      {
        title: "Palette",
        description:
          "The palette roles components may use, as the current mode paints them. Components take colors from these roles only, never from raw tokens, so they also render under a client project's own theme.",
        phone:
          "Nothing changes by screen size. Check a page in both modes on a phone anyway: small text in `text.secondary` is the first thing to get hard to read.",
        icon: PaletteOutlinedIcon,
        Demo: PaletteDemo,
      },
      {
        title: "Typography",
        description: "The type scale, one line per variant.",
        phone:
          "The scale is fixed, so h1 and h2 are for big moments only. An app page's title comes from PageHeader, which steps down to 22px on phones. Long words wrap rather than push the page sideways.",
        icon: TextFieldsOutlinedIcon,
        Demo: TypographyDemo,
      },
    ],
  },
  {
    title: "Responsive",
    entries: [
      {
        title: "Pages",
        description:
          "How every page holds up on a phone: the rules, and the layouts that follow them. Open the phone preview to see these examples at 375px.",
        icon: DevicesOutlinedIcon,
        Demo: PagesGuideline,
      },
      {
        title: "Tables",
        description:
          "Tables are the widest thing on most pages, so each one picks how it fits a phone: scroll inside its container, hide its secondary columns, or turn its rows into cards.",
        icon: TableChartOutlinedIcon,
        Demo: TablesGuideline,
      },
    ],
  },
  {
    title: "Brand",
    entries: [
      {
        title: "Brand",
        description:
          "The wordmark lockup: the mark, tracked caps, and the tool's name as a badge. It renders no link of its own; wrap it in the app's router link. `compact` drops the badge on phones.",
        importFrom: "exalynt",
        phone:
          "`compact` hides the product badge below sm, so a phone's top bar has room for the menu button and account controls.",
        icon: Mark,
        Demo: BrandDemo,
      },
    ],
  },
  {
    title: "Layout",
    entries: [
      {
        title: "PageHeader",
        description:
          "How every page opens: breadcrumbs or a record switcher, the title, one line of orientation, and actions pinned right. Compact, so the work starts above the fold.",
        importFrom: "components",
        phone:
          "Below sm the actions drop under the title and wrap onto more lines rather than squeezing it, and the title steps down from 26px to 22px.",
        icon: WebAssetOutlinedIcon,
        Demo: PageHeaderDemo,
      },
      {
        title: "SectionCard",
        description:
          "The workhorse panel: an outlined card with an optional titled header and action, a hairline divider, and a body. Pass `disableContentPadding` when the body is a table or list.",
        importFrom: "components",
        phone:
          "It fills its container's width. Put cards in a Grid with `size={{ xs: 12, md: 6 }}` so they stack on phones. A table inside uses `disableContentPadding` and follows the Tables guideline.",
        icon: ViewAgendaOutlinedIcon,
        Demo: SectionCardDemo,
      },
      {
        title: "CalloutPanel",
        description:
          "A raised band for the one or two panels on a page that speak to the reader rather than show their data, such as buying more capacity.",
        importFrom: "components",
        phone: "Its padding steps down from 32px to 24px on phones.",
        icon: CampaignOutlinedIcon,
        Demo: CalloutPanelDemo,
      },
    ],
  },
  {
    title: "Data display",
    entries: [
      {
        title: "StatCard",
        description:
          "A single headline number with its label and one line of context. `accent` is for the one number a page is about.",
        importFrom: "components",
        phone:
          "Its type doesn't change. Give a row of stats `size={{ xs: 12, sm: 4 }}` so each gets the full width on a phone, or `xs: 6` for two across when the numbers are short.",
        icon: InsightsOutlinedIcon,
        Demo: StatCardDemo,
      },
      {
        title: "EmptyState",
        description: "What a list or page shows before it has anything in it.",
        importFrom: "components",
        phone: "Centered, with its description capped at 48ch, so it reads the same at any width.",
        icon: InboxOutlinedIcon,
        Demo: EmptyStateDemo,
      },
      {
        title: "Dates and times",
        description:
          "The API sends every point in time as an RFC 3339 timestamp in UTC. Pages show it in the reader's own time zone and locale with DateTime, and keep calendar dates, which aren't moments, as the day they are.",
        icon: CalendarMonthOutlinedIcon,
        Demo: DatesAndTimesGuideline,
      },
      {
        title: "DateTime",
        description:
          "A timestamp from the server in the reader's time zone and locale, from their browser, with a popover giving it in full in their zone and in UTC as sent. `value` is an RFC 3339 UTC string; anything else, a calendar date included, is shown as given. `dateOnly` drops the time of day; pass `focusable={false}` inside a button or link.",
        importFrom: "components",
        phone:
          "It never wraps, so a date and time stays on one line in a table cell. A tap opens the popover, which is 300px wide at most and keeps 12px from the screen's edges.",
        icon: AccessTimeOutlinedIcon,
        Demo: DateTimeDemo,
      },
      {
        title: "Money",
        description:
          "The API sends and takes every amount as whole cents, never a decimal. Pages keep it in cents and show it with `formatMoney`, in the reader's locale and the amount's currency, and turn what someone types back into cents with `parseMoney`.",
        phone:
          "Nothing changes by screen size. A rounded headline figure in a StatCard is the one place to drop the cents when space is tight.",
        icon: PaymentsOutlinedIcon,
        Demo: MoneyGuideline,
      },
    ],
  },
  {
    title: "Stability",
    entries: [
      {
        title: "Stability levels",
        description:
          "How to show a stability level: the mark at each size and in which colors, the banner for the few pages that need one, where each goes in web and mobile apps, and how it differs from maturity on screen. Used everywhere, above all in client projects. What each level means is in the readme.",
        icon: StairsOutlinedIcon,
        Demo: StabilityLevelsGuideline,
      },
      {
        title: "StabilityMark",
        description:
          "A stability level's mark: the Track and the level's name in the level's color, with a popover telling the client how stable it is. No mark means GA, so pass `ga` only in Exalynt's own tools, where clients follow the Features we're working on. Pass `feature` so it opens with \"Invoice export is in Alpha.\" `size` is `short`, `long`, or `extra-long`; pass `focusable={false}` inside a button or link.",
        importFrom: "components",
        phone:
          "It's sized in em, so it scales with the text beside it and never wraps. A tap opens the popover, which is 300px wide at most and keeps 12px from the screen's edges. Where a row is tight on a phone, drop to the short mark rather than let the name wrap.",
        icon: SignalCellularAltOutlinedIcon,
        Demo: StabilityMarkDemo,
      },
      {
        title: "StabilityBanner",
        description:
          "A stability level as a callout, for the few pages where missing it would cost someone something: a Prototype's fake data, or real work going into an Alpha. The extra-long mark, the level's summary and what people can rely on it for, and one optional `action`. Pass `title` and children for copy specific to the page. Never for GA.",
        importFrom: "components",
        phone:
          "The action drops under the text and the padding steps down from 24px to 20px. Keep the copy to two short sentences: on a phone, a banner can fill the first screen.",
        icon: FlagOutlinedIcon,
        Demo: StabilityBannerDemo,
      },
      {
        title: "StabilityDetails",
        description:
          "How stable something is, as StabilityMark's popover shows it: the level's full name and how stable it is in a word, the four levels as boxes with this one lit, what to expect, and what stability is. On its own, for help text or a legend; `card={false}` drops the card to sit in one of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: StabilityDetailsDemo,
      },
    ],
  },
  {
    title: "Maturity",
    entries: [
      {
        title: "Maturity",
        description:
          "How to show a Feature's or a project's maturity: always as the ring, worked out with `featureMaturity` and `projectMaturity`, never by hand. Mostly for Exalynt's own tools, so clients can follow progress. What it means and how it's counted are in the readme.",
        icon: TrendingUpOutlinedIcon,
        Demo: MaturityGuideline,
      },
      {
        title: "MaturityRing",
        description:
          "Maturity's only look, for a Feature or a project: four quarter arcs from Prototype to General Availability, filled to the percentage in its band's color, with a popover (MaturityDetails) saying how mature it is. Pass `subject` and `count`, `labelled` at the top of a project's page, and a `breakdown` of what it's made of.",
        importFrom: "components",
        phone:
          "Fixed at `size`: 52px by default, 24px in a list row, where the percentage sits beside it. On a phone's project page, put the labelled ring under the title rather than squeezing it beside a long one.",
        icon: DonutLargeOutlinedIcon,
        Demo: MaturityRingDemo,
      },
      {
        title: "MaturityDetails",
        description:
          "How mature a Feature or a project is, as MaturityRing's popover shows it: the ring and its band, what the band means, an optional `breakdown`, and a short definition of maturity. On its own with `card={false}` in a card of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: MaturityDetailsDemo,
      },
    ],
  },
  {
    title: "Capacity",
    entries: [
      {
        title: "Capacity blocks",
        description:
          "How to show a capacity block: by its name and its share of an engineer's capacity, never in hours or weeks, with the figure, the card wherever the block is, its popover, and offering blocks to buy. For Exalynt's own tools. What capacity is and how blocks are priced are in the readme.",
        icon: WidgetsOutlinedIcon,
        Demo: CapacityBlocksGuideline,
      },
      {
        title: "CapacityBlock",
        description:
          "A capacity block as a card, the same wherever it is: its figure, its name, which opens CapacityDetails, and its size in words, then `children`, normally CapacityPlacement (its project and focus), and `footer` (when it's worked on). `selected`, `scheduled`, `preview`, `faded`, and `locked` are its states; `onClick` and `onDragStart` make it act. One card per block.",
        importFrom: "components",
        phone:
          "It fills its container's width, and long project names are cut short rather than wrapping. Put cards in a Grid with `size={{ xs: 12, sm: 4 }}` so they stack on phones. Dragging doesn't work on touch, so give a phone another way to schedule, such as the footer's Schedule button.",
        icon: ViewWeekOutlinedIcon,
        Demo: CapacityBlockDemo,
      },
      {
        title: "CapacityPlacement",
        description:
          "Where a block goes, as two lines for CapacityBlock's children: its project, then its focus. With no project it asks to be assigned one and holds the focus line, disabled; on a project with no focus it follows Up next. `onProjectClick` and `onFocusClick` open the app's pickers; without them the lines are read-only.",
        importFrom: "components",
        phone:
          "It fills the card's width, and long names are cut short with an ellipsis, saying them in full on hover. Each line is a small MUI button, the same height as the portal's other inline controls; the picker it opens should use SearchSelect, whose rows are 48px on phones.",
        icon: AccountTreeOutlinedIcon,
        Demo: CapacityPlacementDemo,
      },
      {
        title: "CapacityEngineer",
        description:
          "Who works on a block, as one line for CapacityBlock's footer, above when: the engineer's picture and name, which open EngineerDetails, or \"No engineer yet\". `onAssignClick` makes it the admin's inline control: \"Assign engineer\" with no one assigned, and a change button at the end of an assigned engineer's line. Without it, as in a client's view, it's read-only.",
        importFrom: "components",
        phone:
          "It fills the card's width, and a long name is cut short; the popover says it in full. A tap on the name opens the popover, and the change button is separate, so a tap never opens both. The picker it opens should use SearchSelect, whose rows are 48px on phones.",
        icon: EngineeringOutlinedIcon,
        Demo: CapacityEngineerDemo,
      },
      {
        title: "CapacityLine",
        description:
          "One line on a block's card: an 18px icon centred in a column as wide as the figure, so every line's icon sits on the figure's axis in every state, then text cut short with an ellipsis. Read-only by default; `onClick` makes it a button, `menu` adds the chevron, `action` is the primary prompt, and `disabled` and `muted` hold a place. Build a block's footer from it.",
        importFrom: "components",
        phone:
          "It fills the card's width, and long text is cut short, said in full in its `hint`. Every line is the same height, so changing state never moves the lines below.",
        icon: FormatListBulletedOutlinedIcon,
        Demo: CapacityLineDemo,
      },
      {
        title: "CapacityFigure",
        description:
          "A block's share of one engineer's capacity, pictured as the readme does: one engineer filled from the feet up, a quarter per capacity unit. Decorative, so always beside the block's name and size in words. `size` is its height; `color` is `primary.main` for the reader's block, `text.secondary` for one not picked.",
        importFrom: "components",
        phone:
          "Fixed at `size`, 48px tall by default and half as wide, so it reads the same at 375px. Three 80px figures fit side by side on a phone.",
        icon: AccessibilityNewOutlinedIcon,
        Demo: CapacityFigureDemo,
      },
      {
        title: "CapacityDetails",
        description:
          "How big a block is, as CapacityBlock's popover shows it: its figure, name, and share of an engineer's capacity, the hours it's comparable to as a sense of size, that the price is for the block, not hours, and a link to the readme's Engineering Capacity page. `card={false}` drops the card to sit in one of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: CapacityDetailsDemo,
      },
    ],
  },
  {
    title: "Engineers",
    entries: [
      {
        title: "Engineer levels",
        description:
          "How to show an engineer's level: always as the badge, beside their name, with its popover, and never to decorate a person or mention pay. For Exalynt's own tools. What the levels mean and how they're set are in the readme.",
        icon: WorkspacePremiumOutlinedIcon,
        Demo: EngineerLevelsGuideline,
      },
      {
        title: "EngineerLevelBadge",
        description:
          "An engineer's level as a small, quiet outlined Chip: four squares filled in reading order to the level, and its name, in the theme's secondary text color so the engineer's name beside it leads. Every level looks alike, so none reads as a better or cheaper deal, and a popover (EngineerLevelDetails) saying what the level means. Beside the engineer's name, never in place of it. Pass `focusable={false}` inside a button or link.",
        importFrom: "components",
        phone:
          "A 20px Chip with 11px text that never wraps, so it reads the same at 375px; Principal's is the widest, at about 80px. A tap opens the popover, which is 300px wide at most and keeps 12px from the screen's edges. Where a row is tight, let the name wrap above the badge rather than cut the badge.",
        icon: BadgeOutlinedIcon,
        Demo: EngineerLevelBadgeDemo,
      },
      {
        title: "EngineerLevelDetails",
        description:
          "What an engineer's level means, as EngineerLevelBadge's popover shows it: the four levels' squares and names with this one a step brighter, what an engineer at it leads, what a level is, and a link to the level in the readme's Levels and growth page. Never pay. `card={false}` drops the card to sit in one of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. The four levels fit side by side down to a 320px screen. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: EngineerLevelDetailsDemo,
      },
      {
        title: "EngineerDetails",
        description:
          "Who an engineer is, as CapacityEngineer's popover shows it: their picture, or initials without one, their name and level badge, a short bio cut at four lines, and an optional link to their profile page in the same tab. Takes an `EngineerProfile`. `card={false}` drops the card to sit in one of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. A tap on the level badge inside opens its own popover. With `card={false}` it fills its container.",
        icon: AccountCircleOutlinedIcon,
        Demo: EngineerDetailsDemo,
      },
    ],
  },
  {
    title: "Inputs",
    entries: [
      {
        title: "Forms",
        description:
          "Which MUI input fits which job, and how a form is labelled, checked and laid out. Inputs are MUI's, as the theme styles them, except SearchSelect and SearchMultiSelect.",
        phone:
          "Fields fill the width and side-by-side pairs stack. Input text stays at 16px so iOS doesn't zoom in on focus. A select's menu and the search selects' lists keep MUI's 48px rows on phones.",
        icon: DynamicFormOutlinedIcon,
        Demo: FormsGuideline,
      },
      {
        title: "SearchSelect",
        description:
          "Picks one option from a list long enough to search: people, clients, projects. Every typed word must match the label, `description` or `group`, in any order and ignoring accents; matches are bolded and Enter takes the top one. For a short list, use a select.",
        importFrom: "components",
        phone:
          "Fills its container's width. The list always opens under it, never flipping above, at up to 40% of the screen's height, with 48px rows below sm so they're easy to tap.",
        icon: ManageSearchOutlinedIcon,
        Demo: SearchSelectDemo,
      },
      {
        title: "SearchMultiSelect",
        description:
          "Picks several options from a list long enough to search, searching like SearchSelect. The list stays open while picking, each row has a checkbox, and the chosen options show as chips; `limitChips` counts the rest until the field is focused. For a handful of choices, use checkboxes.",
        importFrom: "components",
        phone:
          "Fills its container's width, and chips wrap onto more lines as they're added. The list always opens under it, never flipping above, at up to 40% of the screen's height, with 48px rows below sm so they're easy to tap.",
        icon: PlaylistAddCheckOutlinedIcon,
        Demo: SearchMultiSelectDemo,
      },
    ],
  },
  {
    title: "Tables",
    entries: [
      {
        title: "ListTable",
        description:
          "A whole table in a card, with each extra picked by a prop: `search`, `filters`, `pagination`, and sorting from any column marked `sortable`. It works on rows the app already has in full, in memory.",
        importFrom: "components",
        phone:
          "Search and the Filters button share a row, and the filters stack full width when opened. The row count hides, and pagination keeps its arrows but drops the Per page label. Columns follow their `hideBelow`.",
        icon: TableRowsOutlinedIcon,
        Demo: ListTableDemo,
      },
      {
        title: "DataTable",
        description:
          "The table alone: columns, striped rows, sortable headings, and rows that open something on click. It holds no state, so the rows and their order can come from anywhere, a server-paged list included.",
        importFrom: "components",
        phone:
          "Wider than the screen, it scrolls inside its own container. A column with `hideBelow` drops out instead, and while one does the table lets go of its minimum width so the rest fits.",
        icon: GridOnOutlinedIcon,
        Demo: DataTableDemo,
      },
      {
        title: "CursorPager",
        description:
          "A DataTable's footer when the server pages its rows by cursor: the range showing, the page size, and previous and next, since a cursor only steps to the page beside it and there's no total to number pages by. The caller fetches each page and keeps the cursors behind it. For rows the app has in full, ListTable's `pagination` numbers the pages instead.",
        importFrom: "components",
        phone:
          "Like ListTable's footer: the Per page picker hides below sm, and the arrows wrap under the range if they don't fit beside it. They keep MUI's tap size.",
        icon: SwapHorizOutlinedIcon,
        Demo: CursorPagerDemo,
      },
    ],
  },
  {
    title: "Feedback",
    entries: [
      {
        title: "Toasts",
        description:
          "How a request went, success or failure, is a toast: raised with `useToast()` where the request finishes, never a banner the page renders itself. The four severities (success, error, warning, info), when to use each, with examples, and what isn't a toast.",
        phone:
          "Toasts span the top of the screen, 8px from its edges, rather than sitting top right. Keep it to two short sentences so it doesn't cover the page's title and actions for long.",
        icon: NotificationsNoneOutlinedIcon,
        Demo: ToastsGuideline,
      },
      {
        title: "ToastProvider",
        description:
          'Shows the toasts raised with `useToast()`: `success`, `info`, `warning` or `error`, each with one message. Top right and newest in front, up to three stack with the older ones peeking out underneath; hovering the stack spreads them into a list, with Clear all under it when there\'s more than one, and pauses their timers. With more than three, the list scrolls one toast at a time by wheel, swipe, arrow keys or its arrows, with a scrollbar and "4–6 of 9" saying where it is. Each stays up longer the longer it is (4 to 15 seconds). Mount it once around the app, inside the ThemeProvider.',
        importFrom: "components",
        phone:
          "Below sm the stack spans the top of the screen, 8px from its edges; from sm it's 356px wide, top right. A tap spreads the stack as hover does, and a swipe up or down scrolls it. The close button shows all the time on a touch screen, 22px to look at with a 38px tap area.",
        icon: NotificationsNoneOutlinedIcon,
        Demo: ToastProviderDemo,
      },
    ],
  },
  {
    title: "Actions",
    entries: [
      {
        title: "ConfirmDialog",
        description:
          "Asks before something that can't be taken back with a click. It stays open, its buttons disabled, while `onConfirm` runs, and closes only when that succeeds.",
        importFrom: "components",
        phone:
          "On phones the theme sets every dialog 16px from the screen's edges instead of 32px, so it uses nearly the full width. The buttons keep their full size.",
        icon: HelpOutlineOutlinedIcon,
        Demo: ConfirmDialogDemo,
      },
      {
        title: "ThemeToggle",
        description:
          "Flips between light and dark mode through MUI's `useColorScheme()`, so it needs a theme with both color schemes.",
        importFrom: "components",
        phone:
          "A 34px square at every width. Keep it in a top bar with room around it rather than squeezed between other controls.",
        icon: ContrastOutlinedIcon,
        Demo: ThemeToggleDemo,
      },
    ],
  },
];
