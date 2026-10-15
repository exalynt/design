import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import type { ReactNode } from "react";
import { CapabilityLabel, CapabilityStability } from "./CapabilityLabel";
import { Grip } from "../Grip";
import { featureMaturity } from "../maturity/maturity";
import { MaturityRing } from "../maturity/MaturityRing";
import { STABILITY_LEVEL_IDS, type StabilityLevelId } from "../stability/stability";

export type FeatureCapability = {
  /** Keeps its row when names repeat or change. Its name without one. */
  id?: string;
  name: string;
  /** Its stability, or null for a draft. */
  level: StabilityLevelId | null;
  /** At the end of its row: the app's menu for it. */
  actions?: ReactNode;
};

export type FeatureCardProps = {
  /** The Feature's name: "Signing for deliveries". */
  name: string;
  /** A line or two on what it's for, under its name. */
  description?: string;
  /** Its Capabilities, in their order; its maturity is worked out from their levels. */
  capabilities: FeatureCapability[];
  /** Show drag grips on the Feature and each Capability, where the app lets them be dragged. */
  grip?: boolean;
  /** Beside its maturity: the app's menu for the Feature. */
  actions?: ReactNode;
  /** Ends it with "Add a Capability", which the app answers with a new one. */
  onAddCapability?: () => void;
};

const rank = (level: StabilityLevelId | null) => (level ? STABILITY_LEVEL_IDS.indexOf(level) : -1);

/*
 * A Feature with its Capabilities, as one card: its icon, its name, cut
 * short on one line, and its maturity as a 24px ring, which shows its own
 * percentage, worked out from its Capabilities' levels and listing them,
 * most stable first, in its popover; its description under its name; then a row per Capability, as on
 * a CapabilityCard; and, where the reader can add one, "Add a Capability".
 * A Feature with no Capabilities has no maturity yet, and says so.
 * Editing and dragging are the app's: `grip` shows where each can be
 * picked up, and `actions` hold their menus.
 */
export function FeatureCard({
  name,
  description,
  capabilities,
  grip = false,
  actions,
  onAddCapability,
}: FeatureCardProps) {
  const progress = featureMaturity(capabilities.map((capability) => capability.level));
  return (
    <Card
      component="article"
      aria-label={name}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        cursor: grip ? "grab" : undefined,
        /* Not while over one of its Capabilities, which lights up on its own instead. */
        "&:hover:not(:has(li:hover))": grip
          ? { borderColor: "text.disabled", "& > header .grip": { color: "text.secondary" } }
          : {},
      }}
    >
      <Box component="header" sx={{ display: "flex", gap: 0.75, px: 1, pt: 1.25, pb: 1 }}>
        {grip ? (
          <Box sx={{ height: 24, display: "flex", alignItems: "center" }}>
            <Grip />
          </Box>
        ) : null}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minHeight: 24 }}>
            <WidgetsOutlinedIcon sx={{ flex: "none", fontSize: 18, color: "secondary.main" }} />
            <Tooltip title={name}>
              <Box
                component="h3"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  m: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  typography: "subtitle1",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                {name}
              </Box>
            </Tooltip>
            {progress === null ? null : (
              <Box sx={{ flex: "none", display: "flex", alignItems: "center", gap: 0.75 }}>
                <MaturityRing
                  progress={progress}
                  subject="feature"
                  count={capabilities.length}
                  label={name}
                  size={24}
                  breakdown={
                    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                      {[...capabilities]
                        .sort((a, b) => rank(b.level) - rank(a.level))
                        .map((capability) => (
                          <Box
                            key={capability.id ?? capability.name}
                            component="li"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 2,
                              py: 0.5,
                            }}
                          >
                            <span>{capability.name}</span>
                            <CapabilityStability
                              name={capability.name}
                              level={capability.level}
                              focusable={false}
                            />
                          </Box>
                        ))}
                    </Box>
                  }
                />
              </Box>
            )}
            {actions}
          </Box>
          {description ? (
            <Box sx={{ mt: 0.25, ml: "24px", typography: "body2", color: "text.secondary" }}>
              {description}
            </Box>
          ) : null}
        </Box>
      </Box>

      {capabilities.length ? (
        <Box component="ul" aria-label="Capabilities" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {capabilities.map((capability) => (
            <Box
              key={capability.id ?? capability.name}
              component="li"
              sx={{
                px: 1,
                py: 0.75,
                borderTop: 1,
                borderColor: "divider",
                transition: "background-color 120ms",
                "&:hover": grip ? { bgcolor: "action.hover" } : undefined,
                "&:hover .grip": { color: "text.secondary" },
              }}
            >
              <CapabilityLabel
                name={capability.name}
                level={capability.level}
                grip={grip}
                actions={capability.actions}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderTop: 1,
            borderColor: "divider",
            typography: "body2",
            color: "text.secondary",
          }}
        >
          No Capabilities yet{onAddCapability ? "; add one to start its maturity." : "."}
        </Box>
      )}

      {onAddCapability ? (
        <Box sx={{ px: 0.75, py: 0.5, borderTop: 1, borderColor: "divider" }}>
          <Button size="small" startIcon={<AddRoundedIcon />} onClick={onAddCapability}>
            Add a Capability
          </Button>
        </Box>
      ) : null}
    </Card>
  );
}
