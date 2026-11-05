import { CAPACITY_BLOCKS, type CapacityBlockId } from "./capacity";
import { TypeBadge } from "../TypeBadge";

export type CapacityBadgeProps = { block: CapacityBlockId };

/* A block's name, as a TypeBadge. Its figure is what shows its size at a glance. */
export function CapacityBadge({ block }: CapacityBadgeProps) {
  return <TypeBadge>{CAPACITY_BLOCKS[block].name}</TypeBadge>;
}
