import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import ViewStreamOutlinedIcon from "@mui/icons-material/ViewStreamOutlined";
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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
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
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { CalloutPanelDemo } from "../components/layout/CalloutPanel.demo";
import { CapabilityCardDemo } from "../components/catalog/CapabilityCard.demo";
import { CapacityBlockDemo } from "../components/capacity/CapacityBlock.demo";
import { CapacityDetailsDemo } from "../components/capacity/CapacityDetails.demo";
import { CapacityEngineerDemo } from "../components/capacity/CapacityEngineer.demo";
import { CapacityProgressDemo } from "../components/capacity/CapacityProgress.demo";
import { CapacityFigureDemo } from "../components/capacity/CapacityFigure.demo";
import { CapacityLineDemo } from "../components/capacity/CapacityLine.demo";
import { CapacityMiniCardDemo } from "../components/capacity/CapacityMiniCard.demo";
import { CapacityNameDemo } from "../components/capacity/CapacityName.demo";
import { CapacityPlacementDemo } from "../components/capacity/CapacityPlacement.demo";
import { CapacityStatusDemo } from "../components/capacity/CapacityStatus.demo";
import { CapacityTagDemo } from "../components/capacity/CapacityTag.demo";
import { ProgressCapabilityDemo } from "../components/progress/ProgressCapability.demo";
import { ProgressFeatureDemo } from "../components/progress/ProgressFeature.demo";
import { ProgressCardDemo } from "../components/progress/ProgressCard.demo";
import { ProgressKindDemo } from "../components/progress/ProgressKind.demo";
import { ProgressLinkDemo } from "../components/progress/ProgressLink.demo";
import { RelatedPanelDemo } from "../components/related/RelatedPanel.demo";
import { ProgressMediaDemo } from "../components/progress/ProgressMedia.demo";
import { ProgressMetricDemo } from "../components/progress/ProgressMetric.demo";
import { ConfirmDialogDemo } from "../components/actions/ConfirmDialog.demo";
import { DateTimeDemo } from "../components/data-display/DateTime.demo";
import { EmptyStateDemo } from "../components/data-display/EmptyState.demo";
import { EngineerDetailsDemo } from "../components/engineers/EngineerDetails.demo";
import { FeatureCardDemo } from "../components/catalog/FeatureCard.demo";
import { EngineerLevelBadgeDemo } from "../components/engineers/EngineerLevelBadge.demo";
import { EngineerLevelDetailsDemo } from "../components/engineers/EngineerLevelDetails.demo";
import { PageHeaderDemo } from "../components/layout/PageHeader.demo";
import { SearchMultiSelectDemo } from "../components/inputs/SearchMultiSelect.demo";
import { SearchSelectDemo } from "../components/inputs/SearchSelect.demo";
import { SectionCardDemo } from "../components/layout/SectionCard.demo";
import { StatCardDemo } from "../components/data-display/StatCard.demo";
import { MaturityDetailsDemo } from "../components/maturity/MaturityDetails.demo";
import { MaturityRingDemo } from "../components/maturity/MaturityRing.demo";
import { StabilityBannerDemo } from "../components/stability/StabilityBanner.demo";
import { StabilityDetailsDemo } from "../components/stability/StabilityDetails.demo";
import { StabilityMarkDemo } from "../components/stability/StabilityMark.demo";
import { ThemeToggleDemo } from "../components/actions/ThemeToggle.demo";
import { ToastProviderDemo } from "../components/feedback/ToastProvider.demo";
import { UserAttributionDemo } from "../components/engineers/UserAttribution.demo";
import { ConversationMessageDemo } from "../components/conversations/ConversationMessage.demo";
import { ConversationPopoutDemo } from "../components/conversations/ConversationPopout.demo";
import { ConversationPreviewDemo } from "../components/conversations/ConversationPreview.demo";
import { ConversationRowDemo } from "../components/conversations/ConversationRow.demo";
import { MentionFieldDemo } from "../components/conversations/MentionField.demo";
import { MessageComposerDemo } from "../components/conversations/MessageComposer.demo";
import { TypingIndicatorDemo } from "../components/conversations/TypingIndicator.demo";
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
          "A stability level's mark: the Track and the level's name in the level's color, with a popover telling the client how stable it is. No mark means GA, so pass `ga` only in Exalynt's own tools, where clients follow the Features we're working on. Pass `feature` so it opens with \"Invoice export is in Alpha.\", and `statement={false}` to leave that line out where the level isn't where it stands now, such as a Capability's old and new levels on a record of it reaching one; `feature` still names a short mark for assistive tech. `size` is `short`, `long`, or `extra-long`; pass `focusable={false}` inside a button or link.",
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
          "How stable something is, as StabilityMark's popover shows it: the level's full name and how stable it is in a word, the four levels as boxes with this one lit, what to expect, with \"Invoice export is in Alpha.\" before it where `feature` is given and `statement` isn't off, and what stability is. On its own, for help text or a legend; `card={false}` drops the card to sit in one of your own.",
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
    title: "Catalog",
    entries: [
      {
        title: "FeatureCard",
        description:
          "A Feature with its Capabilities, as one card: its icon, its name, and its maturity as a 24px ring with its percentage, worked out from its Capabilities and listing them in its popover; its `description`; a row per Capability, as on a CapabilityCard; and, with `onAddCapability`, Add a Capability. Editing and dragging are the app's: `grip` shows the grips, and `actions` hold the Feature's and each Capability's menus.",
        importFrom: "components",
        phone:
          "It fills its container's width. Its name and each Capability's are cut short on one line, with the whole name on hover; its maturity and each Capability's stability always show. Drag doesn't work on touch, so give a phone menus to move things with.",
        icon: WidgetsOutlinedIcon,
        Demo: FeatureCardDemo,
      },
      {
        title: "CapabilityCard",
        description:
          "A Capability on its own, in no Feature: its bolt, its name, and its stability as a short mark, or Draft for one nobody has started on, in one line. `grip` shows its drag grip, `actions` holds its menu, and `onClick` makes it a button.",
        importFrom: "components",
        phone:
          "It fills its container's width; the name is cut short first, and its stability and menu always show.",
        icon: BoltOutlinedIcon,
        Demo: CapabilityCardDemo,
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
          "A capacity block as a card, the same wherever it is: a top row with its drag handle or lock, its `number`, and its status (`badge`, a CapacityStatus), then its figure, its badge, and its size in words across the full width, opening CapacityDetails, then `children`, normally CapacityPlacement (its product and Focus), and `footer` (when it's worked on). `selected`, `scheduled`, `preview`, `faded`, and `locked` are its states, and `attention` edges it in warning with the kind of attention it needs; `onClick` and `onDragStart` make it act. One card per block.",
        importFrom: "components",
        phone:
          "It fills its container's width, and long product names are cut short rather than wrapping. Put cards in a Grid with `size={{ xs: 12, sm: 4 }}` so they stack on phones. Dragging doesn't work on touch, so give a phone another way to schedule, such as the footer's Schedule button.",
        icon: ViewWeekOutlinedIcon,
        Demo: CapacityBlockDemo,
      },
      {
        title: "CapacityPlacement",
        description:
          "Where a block goes, as lines for CapacityBlock's children: its product, then the Focus on that product's board it goes towards, under its client organization where `organization` is given, for views that mix organizations. With no product it asks to be assigned one and holds the Focus line, disabled; on a product with no Focus it follows Up next. The icons are the portal's for a product, a Focus, and Up next. `onProductClick` and `onFocusClick` open the app's pickers; without them the lines are read-only.",
        importFrom: "components",
        phone:
          "It fills the card's width, and long names are cut short with an ellipsis, saying them in full on hover. Each line is a small MUI button, the same height as the portal's other inline controls; the picker it opens should use SearchSelect, whose rows are 48px on phones.",
        icon: AccountTreeOutlinedIcon,
        Demo: CapacityPlacementDemo,
      },
      {
        title: "CapacityMiniCard",
        description:
          "A capacity block where it's related to something else, such as the blocks a Focus, a conversation, or progress came from: a 24px figure and its badge, its week, and its status's icon, then its engineer and number, in two lines. `details` opens CapacityDetails over the figure and badge, for readers who may not know the sizes. A reference, not the block: `href` goes to the block's page, rendered with the theme's LinkComponent so an app's router link works.",
        importFrom: "components",
        phone:
          "It fills its container's width, and its text never wraps; a long week or number is cut short. The whole card is the link, about 60px tall, so it's an easy tap. Stack them, one per row, rather than side by side.",
        icon: ViewStreamOutlinedIcon,
        Demo: CapacityMiniCardDemo,
      },
      {
        title: "CapacityTag",
        description:
          "A capacity block named inline, where a card is too much: a 24px figure, its badge, and its `number`, such as in a byline saying which block progress came from. `details` opens CapacityDetails over it; inside a link or button, pass `inLink` so it takes no focus of its own.",
        importFrom: "components",
        phone:
          "About 150px wide with a number, and it never wraps, so give it a line of its own where a row is tight. A tap opens its popover.",
        icon: LabelOutlinedIcon,
        Demo: CapacityTagDemo,
      },
      {
        title: "CapacityStatus",
      {
        title: "CapacityName",
        description:
          "A capacity block at its smallest, where even CapacityTag is too much, such as a ConversationRow's foot: a 16px figure, filled to the block's size, and its `number`, in the text's own size and color. Its type isn't shown, only read out to assistive tech, as \"Core block BLK-0042\"; where the type matters on screen, use CapacityTag.",
        importFrom: "components",
        phone:
          "About 80px wide with a number. In a tight row the number is cut short before the figure goes.",
        icon: LabelOutlinedIcon,
        Demo: CapacityNameDemo,
      },
        description:
          "Where a block is in its life, for CapacityBlock's `badge`: Available, Scheduled, In progress, or Fulfilled, each with its own icon and color: grey, blue (info), violet, and green (success). In progress's violet is its own, the same under every theme, since no palette role is free: primary and info are often the same blue, and warning is left for CapacityBlock's `attention`. A small outlined Chip with the icon and word, or with `iconOnly` the icon alone, saying the word on hover and to assistive tech.",
        importFrom: "components",
        phone:
          "The Chip never wraps; In progress is the widest, at about 100px. Use `iconOnly` where cards sit four or more across, or in a week's column. On a phone, where cards stack full width, show the word; the icon alone says it on a tap.",
        icon: TimelapseRoundedIcon,
        Demo: CapacityStatusDemo,
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
        title: "CapacityProgress",
        description:
          "What progress came of a block, at a glance, as the last line of its footer once it's started, beside the rising chart that stands for progress: each kind it has, Functionality, Improvement, then Clarity, as the kind's icon in its color and how many, said in words on hover and to assistive tech, or \"No progress yet\". `onClick` is the app's action, such as going to the ProgressCards on the block's page, handed the line to anchor a popover to; a click on it never reaches the block's own `onClick`. Leave it off a block waiting for its week.",
        importFrom: "components",
        phone:
          "A CapacityLine, so it fills the card's width at the same height as the lines above it. All three kinds fit on one line at 375px; a tap opens the block's progress, and the words are a long press away.",
        icon: FactCheckOutlinedIcon,
        Demo: CapacityProgressDemo,
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
    title: "Progress",
    entries: [
      {
        title: "ProgressCard",
        description:
          "One record of progress, what came of work on a Focus within a block of capacity, for a Focus's listing and a block's. One column: its kind and day, what happened as its headline, then only the sections it has (the Features and Capabilities it's about, whatever its kind, results, what shows it, and `links` to related things, such as its pull request or a ticket), and at its foot who reported it and `source`, where it came from. Edged in its kind's color so a listing scans by kind. It starts closed, as `defaultExpanded` changes: its kind and day over how many Features, Capabilities, results, pictures, and videos it has, as icons and counts (for Functionality, its Capabilities counted by what it did to them, each saying Capability: 1 New Capability, 1 Capability reached Alpha, in Alpha's color as on its outline, and 1 Capability retired), its links under them, inline, to follow without opening it, with `source` at the bottom right, and its words in a tooltip on hover rather than on the card. A click anywhere on it opens or closes it, except on something of its own to click, such as its kind or a picture; the chevron, muted until the card is hovered, does the same from the keyboard. A first pass, to experiment with.",
        importFrom: "components",
        phone:
          "One column at every width, so nothing moves on a phone. Results tiles fit as many to a row as there's room for, one on a phone; media thumbnails wrap; the foot wraps `source` under who reported it. Closed, its counts and links wrap, a long link name cut short, and `source` wraps under them, where they need to; its words are a long press away; and the whole card is the tap target to open or close it.",
        icon: ShowChartRoundedIcon,
        Demo: ProgressCardDemo,
      },
      {
        title: "ProgressKind",
        description:
          "What kind of progress a record is: Functionality, what the software can do; Improvement, how well it works; or Clarity, what we now understand. A small tinted Chip with its icon and name, or with `iconOnly` the icon alone: Functionality's puzzle piece in primary, Improvement in success, and Clarity in warning. Any kind can be about Features and Capabilities, and what a record did to a Capability (added, made more stable, or retired) isn't a kind: it's on that Capability, as ProgressCapability shows. Hover, focus, or tap says what the kind means to the client.",
        importFrom: "components",
        phone:
          "A 24px Chip that never wraps; Functionality is the widest. A tap opens its popover.",
        icon: CategoryOutlinedIcon,
        Demo: ProgressKindDemo,
      },
      {
        title: "ProgressFeature",
        description:
          "One Feature a record of progress is about, of any kind, as a small outlined card that sits beside others and wraps, like a ProgressCapability: the Feature's icon, as on a FeatureCard, and its name, cut short with the whole name on hover.",
        importFrom: "components",
        phone:
          "At most the width of its container; a long name is cut short. The full name is a long press away.",
        icon: WidgetsOutlinedIcon,
        Demo: ProgressFeatureDemo,
      },
      {
        title: "ProgressCapability",
        description:
          "One Capability a record of progress touched, as a small outlined card that sits beside others and wraps: its icon, its name, cut short with the whole name on hover, and its level as a short stability mark, or for one made more stable its old level, faded, to its new. What the progress did to it is in its outline, named in the outline's top edge: New in primary, Reached and the level it reached in that level's color, such as Reached Alpha, Retired dashed and muted with its name struck through. One it was only about has the plain outline.",
        importFrom: "components",
        phone:
          "At most the width of its container; a long name is cut short first, and the marks always show. A tap on a mark opens its popover; the full name is a long press away. Leave room above a row of them for the change in their outlines.",
        icon: BoltOutlinedIcon,
        Demo: ProgressCapabilityDemo,
      },
      {
        title: "ProgressMetric",
        description:
          'Something measured, as a tile: what was measured, then Before and After side by side, each labelled, with an arrow from one to the other. `before` and `after` are numbers in the reader\'s own format, and `unit`, optional, follows each, smaller and fainter: "s", "%", "per day". Each stays on one line, cut short with an ellipsis and said in full in a tooltip where it\'s too long. `description`, optional, adds an info icon beside the name that says what the measure is on hover, focus, or tap. Whichever says most is the highlight. With `showDifference`, Before and After are the same size, and how much it moved, signed and with the unit, is centred on the line below in a larger pill. Without it, or without a `before`, After is the larger. `direction`, optional, puts the trend it took for the better beside the highlight and makes it green: `down` for fewer failures or less time, `up` for more of something wanted. Whether more is better depends on the measure, so it\'s the reporter\'s to give; without it the highlight stays neutral.',
        importFrom: "components",
        phone:
          "It fills its grid cell; in a grid of `minmax(180px, 1fr)` columns, a phone shows one a row. Before and After share the line at every width, each cut short rather than wrapping, its full value a long press away; the difference keeps a line of its own. The info icon is a tap target of its own.",
        icon: InsightsOutlinedIcon,
        Demo: ProgressMetricDemo,
      },
      {
        title: "ProgressMedia",
        description:
          "Pictures and recordings that show progress, as 128px thumbnails that wrap. Each opens full size over the darkened page, with its name under it and the others a step away by button or arrow key; a video plays there with its controls. A click on the dark around it closes it.",
        importFrom: "components",
        phone:
          "Thumbnails wrap, two or three to a row. Open, it fills the screen edge to edge, with the previous and next buttons over its sides.",
        icon: PhotoLibraryOutlinedIcon,
        Demo: ProgressMediaDemo,
      },
      {
        title: "ProgressLink",
        description:
          "Something related to a record of progress, elsewhere, such as its pull request, a ticket, a design, or a write-up, opening in a new tab. A small outlined card that sits beside others and wraps, like a ProgressFeature: a link icon in primary, its `name`, cut short with the whole name on hover, and the site it goes to, fainter, so the reader knows where it leads before following it. `compact` is the icon and name alone as a text link, as a closed ProgressCard lists them. Name it for what it is, not its URL.",
        importFrom: "components",
        phone:
          "At most the width of its container; the site is cut short first, then the name. The full name is a long press away on the card; compact, a long name is cut short.",
        icon: LinkRoundedIcon,
        Demo: ProgressLinkDemo,
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
          "An engineer's level as a small, quiet outlined Chip: four squares filled in reading order to the level, and its name, in the theme's secondary text color so the engineer's name beside it leads. Every level looks alike, so none reads as a better or cheaper deal, and a popover (EngineerLevelDetails) saying what the level means. Beside the engineer's name, never in place of it. Pass `focusable={false}` inside a button or link, and `details={false}` inside something whose own popover already says the level.",
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
        title: "UserAttribution",
        description:
          "Who something is by, for, or assigned to, such as who reported progress or a block's engineer on its mini card: their picture, or initials without one, and their name, in the primary text color at weight 600 and the size of the text around it. `photoOnly` is just the picture, naming them on hover and to assistive tech, where names would crowd. Takes a `UserProfile`, or an `EngineerProfile` for an engineer, who can also have `showLevel`, their level badge under the name, and `details`, EngineerDetails over all of it; with both, the badge's own popover is left out, since EngineerDetails has it. Use it wherever a card or line names a person, rather than an avatar and name of your own. `size` is the picture's: 20px by default, 40px with the level.",
        importFrom: "components",
        phone:
          "It never grows wider than its container: a long name is cut short, and `details` says it in full. A tap opens the details popover, or with `photoOnly` and no details, the name. Give a row of `photoOnly` pictures at least 32px each so they're easy to tell apart and tap.",
        icon: PersonOutlineOutlinedIcon,
        Demo: UserAttributionDemo,
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
    title: "Conversations",
    entries: [
      {
        title: "ConversationMessage",
        description:
          "One message in a conversation: the author's picture, or initials without one, beside a card headed with their name and when it was sent (DateTime), and what they wrote with its line breaks kept. Mentions are kept in the text by id, as `<@id>` (MentionField writes them), and read as \"@\" and that person's current name in `people`, so a rename never leaves an old one behind. They're picked out in the primary color, or in the warning color where it's the reader (`you`), whose mention also puts Mentions you in the header. `attachments` are the files sent with it, under the text: its images and videos as ProgressMedia shows progress's, thumbnails that open full size, and its documents as tiles with their type and size that open in a new tab; a message can be files alone. A message longer than ten lines starts cut to eight, fading out, with Show more and then Show less, unless it's `unread`, when it starts open. `original` marks the message that started it, and `lines` cuts it short without Show more, its line breaks read as spaces, counting its files rather than showing them, for a glance, such as a conversation's row in a list. `avatar=\"header\"` puts the picture small before their name, in the card's top corner, rather than beside it, leaving the card the room. `compact` slims it down for a glance in a list, as ConversationRow's latest message is: tighter, the picture in the header, the organization as its logo, and no time, since the row says when; pair it with `lines`. `details` opens EngineerDetails on hovering, focusing or tapping an engineer author's name or picture, as UserAttribution's does; the author is then an `EngineerProfile`. Put messages in a `ConversationThread`, oldest first. `organization` (an `OrganizationProfile`: its name and `logoUrl`, or its initials without one) names who they wrote on behalf of, beside their name, for conversations with people from more than one, such as Exalynt and a client. Each kind of message has its own color, so none is mistaken for another. `mine` marks the reader's own: filled in the primary color, as a sent text is, and the only ones on the right, with the avatar after the card and the header mirrored: their name by their avatar, then their organization, and the time on the far left. `ours` marks a teammate's, from the organization the reader's in context of: on the left with everyone else's, which are plain, but tagged after their name with Teammate's icon, filled in the secondary color (hover it for whose team), their picture ringed in the secondary color, and tinted in it too, so a teammate never rests on color or the organization alone. `assignedTeam` tags someone on one of the reader's assigned teams, as a client's engineers at Exalynt are, with Your team's icon, filled in the primary color, which says on hover \"On your Exalynt Engineering Team\" from their organization's name. The tags are always just their icons, named to assistive tech and in a tooltip on hover. `condensed` shows the organization as just its logo, which still names it on hover, as it is anyway on a card under 400px wide, such as a popout's. Where a thread has the reader's own, every card keeps the same distance from the other side, 15% of the thread or 48px at least, so all are the same width and the reader's sit off-centre, as texts do. `unread` marks one the reader hadn't read with a mark rather than a color, so it shows over a teammate's tint or a plain card alike: a thick primary edge on its side and New beside its time, and the thread draws a line counting the new ones above the first.",
        importFrom: "components",
        phone:
          "The header stays on one line: the name is cut short before the time is, the organization is just its logo, as on any card under 400px wide, such as a popout's, and under 340px the author's name goes too, with the dots between, leaving their picture (still read out to assistive tech), unless it's `compact`, which has no time to make room for; Original message hides under 400px, and Mentions you is just its icon. The text wraps, breaking long links and words rather than widening the page. Thumbnails wrap onto more rows, and open edge to edge; each document takes a row of its own.",
        icon: SmsOutlinedIcon,
        Demo: ConversationMessageDemo,
      },
      {
        title: "ConversationPopout",
        description:
          "A conversation in a window over the page, to read and reply to without leaving it: its ConversationMessages, and a MessageComposer sending with `onSend`, where @ mentions one of `people`; the draft lasts while it's minimized, and empties once sent unless `onSend` returns `false`. It opens 560px wide, or the screen less 32px where that's narrower, so a message's header has room for the name, tags and time. Drag the title bar to move it and the bottom-right corner to size it; the bar minimizes, maximizes (as does double-clicking it), opens `href` in a new tab, and closes it, as does Esc. `notice` takes the reply box's place for one that takes no replies, and `actions` puts something such as a StabilityMark in the bar. `canAttach` lets a reply carry files, which `onSend` gets with the text, and `typing` says who else is writing just above the reply box (TypingIndicator). For a long conversation, pass its latest few with `earlier`, the count of those before them, and `onShowEarlier` to bring in more from beside that count, with `loadingEarlier` while they're read; what's being read holds still as they come in above it. ConversationThread takes the same three on its own. For several at once, render one per open conversation and raise the one in `onFocus` with `zIndex`. It opens at the first `unread` message, under the line counting the new ones, or else at the latest: keep which were unread as it opened, so marking it read on opening doesn't clear them while they're read. `onMarkUnread` puts Mark as unread in the title bar, which then closes it, as an inbox goes back to the list.",
        importFrom: "components",
        phone:
          "It fills the screen, without minimize, maximize, moving or sizing; Close, Mark as unread and the link are 40px to tap. With several open, the one in front covers the others. The keyboard hint under the reply box hides.",
        icon: ForumOutlinedIcon,
        Demo: ConversationPopoutDemo,
      },
      {
        title: "ConversationPreview",
        description:
          "A glance at a conversation's latest messages on hovering or focusing what it wraps, such as its row in a list, without opening it: ConversationPopout's title bar and its ConversationMessages, read-only, on the same paper, so opening the popout after a glance changes only the size. Pass the latest few as `messages`, cut short with `lines` (four reads well), and how many came before them as `earlier`, which it counts rather than draws. A list only has each conversation's summary, so read them in `onOpen`, the first time it opens, showing `loading` meanwhile and `failed` if they couldn't be read. Under a mouse it follows the pointer, below it; from the keyboard it opens beside the row. `suppressed` keeps it shut while it would cover something in the row, such as an open menu.",
        importFrom: "components",
        phone:
          "A tap never opens it, since a tap opens the row, so on a phone it only opens from a keyboard. It's 400px wide, or the screen less 32px when that's narrower.",
        icon: PreviewOutlinedIcon,
        Demo: ConversationPreviewDemo,
      },
      {
        title: "ConversationRow",
        description:
          "One conversation in a list, built to be scanned: its subject in full, wrapping as it needs to, and how long ago it last moved, its `latest` message, if it's wanted, as a ConversationMessage, which the row makes `compact` and cuts to two lines, its line breaks read as spaces, so it reads as it will once opened, and at the foot who's in it (`people`) and how many messages, by a message icon. The message is part of the row's link, so clicking it opens the row; leave its `unread` off, since the row counts what's new. The whole row links to `href`; `onOpen` opens it in place instead, such as in a ConversationPopout, while a new tab still goes to `href`. Unread, it stands out from the read rows around it: a bar down its left edge, a faint tint behind it, a bold subject, and a pill counting what's new beside its time, all in the primary color, or in the warning color with `mentionsYou`, as ConversationMessage marks a mention, which also adds Mentioned you at the foot. Read rows stay plain. `closed` says who closed it and when, beside its time, and fades its tile; it still opens with `onOpen` and `preview`, such as in a ConversationPopout with a `notice` in place of the reply box. `related` goes under the latest message, `actions` holds the app's menu at the end of the top line, and `preview` opens a ConversationPreview on hover or focus, except over `actions`. Stack rows in an outlined Card with dividers between them.",
        importFrom: "components",
        phone:
          "The subject is cut short to one line, where on a wider screen it wraps, before the new pill and its time are. The latest message keeps its author's name, its organization just its logo, and wraps to two lines. The margins narrow to 16px. A tap opens the row; the preview never opens from touch.",
        icon: ListAltOutlinedIcon,
        Demo: ConversationRowDemo,
      },
      {
        title: "MessageComposer",
        description:
          "Where a reply is written, as ConversationPopout's is: a MentionField, so @ mentions one of `people` and : and a shortcode finds an emoji, the files attached, and under them the emoji picker, the paperclip, a hint and the Reply button, which waits until there's something to send, words or files. Enter sends and Shift+Enter starts a new line. With `onAttachmentsChange`, images, videos and documents can be attached with the paperclip, dropped anywhere on the composer, or pasted, such as a screenshot (a paste with text in it, as from Word, pastes the text), shown with a preview, their size and a button to take each off; any other file is named in a line saying it wasn't attached. The caller keeps the draft in `value` and the files in `attachments`, so they outlast the composer, uploads them, and empties both once `onSend` has sent it; `sending` makes the button wait meanwhile.",
        importFrom: "components",
        phone:
          "The field fills the width, each attached file takes a row of its own, and the keyboard hint hides, leaving the emoji and attach buttons on the left and Reply on the right, all at their full size. The emoji picker is 336px wide, or the screen less 32px when that's narrower, and opens above its button. Phones can't drag files, so the paperclip is how they attach.",
        icon: RateReviewOutlinedIcon,
        Demo: MessageComposerDemo,
      },
      {
        title: "TypingIndicator",
        description:
          "Who's writing in a conversation right now: three dots rising in turn and \"Priya Shah is typing…\", each name with its picture, or initials, beside it (UserAttribution), naming up to three and counting the rest, as in \"Priya Shah, Sam Okafor and 2 others are typing…\". Put it just above the MessageComposer, as ConversationPopout's `typing` does. It keeps its line when no one is typing, so the composer doesn't jump, and tells screen readers as it changes. It only shows the `people` it's given: the app sends that the reader is typing and drops anyone it hasn't heard from in a few seconds.",
        importFrom: "components",
        phone:
          'One line that never wraps: the names are cut short before "are typing…" would push past the edge. The dots stay still for anyone who\'s asked for less motion.',
        icon: MoreHorizOutlinedIcon,
        Demo: TypingIndicatorDemo,
      },
      {
        title: "MentionField",
        description:
          "A multiline field for a message where people can be @mentioned, as MessageComposer's is. Typing @ lists `people` with their pictures, narrowed by each word typed after it as SearchSelect searches; the arrows move through the list, and Enter, Tab or a click puts \"@Full Name \" in the text. The field shows names, but `value` keeps each mention as the person's id, `<@id>`, as ConversationMessage reads it, so mentions survive a rename; a mention edited inside turns back into plain text. `people` are `MentionProfile`s, a `UserProfile` with an `id`. Esc closes just the list, not a dialog or popout around it. An @ run into a word, as in an email address, doesn't open it. A colon and two letters of a shortcode, as in Slack (`:tada`), lists matching emoji the same way and puts the emoji in; a colon after a word or number, as in 10:30, doesn't. Its `ref` has `insert(text)`, which puts text at the caret, as MessageComposer's emoji picker does. Controlled by `value` and `onChange`; `onKeyDown` gets the keys the list doesn't take, such as Enter to send.",
        importFrom: "components",
        phone:
          "It fills its container's width. The list is 280px wide, or the screen less 32px when that's narrower, opens under the field or above it where there's no room, such as a reply box at the foot of the screen, and keeps MUI's 48px rows below sm.",
        icon: AlternateEmailOutlinedIcon,
        Demo: MentionFieldDemo,
      },
    ],
  },
  {
    title: "Related",
    entries: [
      {
        title: "RelatedPanel",
        description:
          "What something is related to, such as the Products, Focuses, Features, Capabilities, and capacity a conversation or a Focus is about, as a card for a side column: its `title` (Related), with Add where `add` is given, `description`, a line on what belongs here, then a section per kind it has, broadest first, leaving out any kind it has none of. Each row is one line: the thing's icon and name, cut short with an ellipsis and said in full in a tooltip, a Capability's stability, or a capacity block's tag and week; `href` makes a row a link to its page, opening in a new tab. With no `items`, it shows its empty state, `empty` (Nothing related yet) in a dashed outline, saying which kinds can be added where `add` is given. `onRemove` puts a remove button on each row, a ✕ in the error color on a faint tint of it, shown on its hover or focus, in an area of its own outside the row's link, so a click that misses it opens nothing. Without `add` and `onRemove` it's read-only, as for someone who can't change it. What can be added depends on where it is, so `add` names its `kinds`, such as Features and Capabilities alone in a conversation about the Catalog; the empty state names only those. The picker is the app's, offering only those kinds: `add.onAdd` hands it the Add button to anchor a popover with a SearchSelect to.",
        importFrom: "components",
        phone:
          "It fills its container's width, and every row stays one line: a long name is cut short, with the whole name a long press away. Where nothing hovers, every row's remove button shows, so a tap removes without hunting for it. It sits apart from the row's link, with room around it, so a tap that misses it doesn't open a new tab.",
        icon: HubOutlinedIcon,
        Demo: RelatedPanelDemo,
      },
    ],
  },
  {
    title: "Inputs",
    entries: [
      {
        title: "Forms",
        description:
          "Which MUI input fits which job, and how a form is labelled, checked and laid out. Inputs are MUI's, as the theme styles them, except SearchSelect, SearchMultiSelect and MentionField.",
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
