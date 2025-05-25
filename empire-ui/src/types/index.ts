import { type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export type Size = "sm" | "md" | "lg";

export type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface WithTheme {
  theme?: Theme;
}

export interface WithSize {
  size?: Size;
}

export interface WithVariant {
  variant?: Variant;
}

export interface WithDisabled {
  disabled?: boolean;
}

export interface WithLoading {
  loading?: boolean;
}

export interface WithError {
  error?: string;
}

export interface WithLabel {
  label?: string;
}

export interface WithPlaceholder {
  placeholder?: string;
}

export interface WithValue<T = string> {
  value?: T;
  onChange?: (value: T) => void;
}

export interface WithName {
  name?: string;
}

export interface WithId {
  id?: string;
}

export interface WithTestId {
  "data-testid"?: string;
}

export interface WithAriaLabel {
  "aria-label"?: string;
}

export interface WithAriaDescribedBy {
  "aria-describedby"?: string;
}

export interface WithAriaControls {
  "aria-controls"?: string;
}

export interface WithAriaExpanded {
  "aria-expanded"?: boolean;
}

export interface WithAriaHidden {
  "aria-hidden"?: boolean;
}

export interface WithAriaLive {
  "aria-live"?: "off" | "polite" | "assertive";
}

export interface WithAriaRelevant {
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
}

export interface WithAriaAtomic {
  "aria-atomic"?: boolean;
}

export interface WithAriaBusy {
  "aria-busy"?: boolean;
}

export interface WithAriaCurrent {
  "aria-current"?: boolean | "page" | "step" | "location" | "date" | "time";
}

export interface WithAriaPressed {
  "aria-pressed"?: boolean | "mixed";
}

export interface WithAriaSelected {
  "aria-selected"?: boolean;
}

export interface WithAriaSort {
  "aria-sort"?: "none" | "ascending" | "descending" | "other";
}

export interface WithAriaChecked {
  "aria-checked"?: boolean | "mixed";
}

export interface WithAriaReadOnly {
  "aria-readonly"?: boolean;
}

export interface WithAriaRequired {
  "aria-required"?: boolean;
}

export interface WithAriaInvalid {
  "aria-invalid"?: boolean | "grammar" | "spelling";
}

export interface WithAriaMultiLine {
  "aria-multiline"?: boolean;
}

export interface WithAriaMultiSelectable {
  "aria-multiselectable"?: boolean;
}

export interface WithAriaOrientation {
  "aria-orientation"?: "horizontal" | "vertical";
}

export interface WithAriaLevel {
  "aria-level"?: number;
}

export interface WithAriaPosInSet {
  "aria-posinset"?: number;
}

export interface WithAriaSetSize {
  "aria-setsize"?: number;
}

export interface WithAriaValueNow {
  "aria-valuenow"?: number;
}

export interface WithAriaValueMin {
  "aria-valuemin"?: number;
}

export interface WithAriaValueMax {
  "aria-valuemax"?: number;
}

export interface WithAriaValueText {
  "aria-valuetext"?: string;
}

export interface WithAriaModal {
  "aria-modal"?: boolean;
}

export interface WithAriaHaspopup {
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
}

export interface WithAriaControls {
  "aria-controls"?: string;
}

export interface WithAriaDescribedBy {
  "aria-describedby"?: string;
}

export interface WithAriaDetails {
  "aria-details"?: string;
}

export interface WithAriaErrorMessage {
  "aria-errormessage"?: string;
}

export interface WithAriaFlowTo {
  "aria-flowto"?: string;
}

export interface WithAriaLabelledBy {
  "aria-labelledby"?: string;
}

export interface WithAriaOwns {
  "aria-owns"?: string;
}

export interface WithAriaRelevant {
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
}

export interface WithAriaRoledescription {
  "aria-roledescription"?: string;
}

export interface WithAriaKeyshortcuts {
  "aria-keyshortcuts"?: string;
}

export interface WithAriaPlaceholder {
  "aria-placeholder"?: string;
}

export interface WithAriaRole {
  "aria-role"?: string;
}

export interface WithAriaRoleDescription {
  "aria-roledescription"?: string;
}

export interface WithAriaRolePresentation {
  "aria-role"?: "presentation";
}

export interface WithAriaRoleNone {
  "aria-role"?: "none";
}

export interface WithAriaRoleAlert {
  "aria-role"?: "alert";
}

export interface WithAriaRoleAlertdialog {
  "aria-role"?: "alertdialog";
}

export interface WithAriaRoleApplication {
  "aria-role"?: "application";
}

export interface WithAriaRoleArticle {
  "aria-role"?: "article";
}

export interface WithAriaRoleBanner {
  "aria-role"?: "banner";
}

export interface WithAriaRoleButton {
  "aria-role"?: "button";
}

export interface WithAriaRoleCheckbox {
  "aria-role"?: "checkbox";
}

export interface WithAriaRoleColumnheader {
  "aria-role"?: "columnheader";
}

export interface WithAriaRoleCombobox {
  "aria-role"?: "combobox";
}

export interface WithAriaRoleComplementary {
  "aria-role"?: "complementary";
}

export interface WithAriaRoleContentinfo {
  "aria-role"?: "contentinfo";
}

export interface WithAriaRoleDefinition {
  "aria-role"?: "definition";
}

export interface WithAriaRoleDialog {
  "aria-role"?: "dialog";
}

export interface WithAriaRoleDirectory {
  "aria-role"?: "directory";
}

export interface WithAriaRoleDocument {
  "aria-role"?: "document";
}

export interface WithAriaRoleForm {
  "aria-role"?: "form";
}

export interface WithAriaRoleGrid {
  "aria-role"?: "grid";
}

export interface WithAriaRoleGridcell {
  "aria-role"?: "gridcell";
}

export interface WithAriaRoleGroup {
  "aria-role"?: "group";
}

export interface WithAriaRoleHeading {
  "aria-role"?: "heading";
}

export interface WithAriaRoleImg {
  "aria-role"?: "img";
}

export interface WithAriaRoleLink {
  "aria-role"?: "link";
}

export interface WithAriaRoleList {
  "aria-role"?: "list";
}

export interface WithAriaRoleListbox {
  "aria-role"?: "listbox";
}

export interface WithAriaRoleListItem {
  "aria-role"?: "listitem";
}

export interface WithAriaRoleLog {
  "aria-role"?: "log";
}

export interface WithAriaRoleMain {
  "aria-role"?: "main";
}

export interface WithAriaRoleMarquee {
  "aria-role"?: "marquee";
}

export interface WithAriaRoleMath {
  "aria-role"?: "math";
}

export interface WithAriaRoleMenu {
  "aria-role"?: "menu";
}

export interface WithAriaRoleMenubar {
  "aria-role"?: "menubar";
}

export interface WithAriaRoleMenuitem {
  "aria-role"?: "menuitem";
}

export interface WithAriaRoleMenuitemcheckbox {
  "aria-role"?: "menuitemcheckbox";
}

export interface WithAriaRoleMenuitemradio {
  "aria-role"?: "menuitemradio";
}

export interface WithAriaRoleNavigation {
  "aria-role"?: "navigation";
}

export interface WithAriaRoleNote {
  "aria-role"?: "note";
}

export interface WithAriaRoleOption {
  "aria-role"?: "option";
}

export interface WithAriaRoleProgressbar {
  "aria-role"?: "progressbar";
}

export interface WithAriaRoleRadio {
  "aria-role"?: "radio";
}

export interface WithAriaRoleRadiogroup {
  "aria-role"?: "radiogroup";
}

export interface WithAriaRoleRegion {
  "aria-role"?: "region";
}

export interface WithAriaRoleRow {
  "aria-role"?: "row";
}

export interface WithAriaRoleRowgroup {
  "aria-role"?: "rowgroup";
}

export interface WithAriaRoleRowheader {
  "aria-role"?: "rowheader";
}

export interface WithAriaRoleScrollbar {
  "aria-role"?: "scrollbar";
}

export interface WithAriaRoleSearch {
  "aria-role"?: "search";
}

export interface WithAriaRoleSearchbox {
  "aria-role"?: "searchbox";
}

export interface WithAriaRoleSeparator {
  "aria-role"?: "separator";
}

export interface WithAriaRoleSlider {
  "aria-role"?: "slider";
}

export interface WithAriaRoleSpinbutton {
  "aria-role"?: "spinbutton";
}

export interface WithAriaRoleStatus {
  "aria-role"?: "status";
}

export interface WithAriaRoleTab {
  "aria-role"?: "tab";
}

export interface WithAriaRoleTablist {
  "aria-role"?: "tablist";
}

export interface WithAriaRoleTabpanel {
  "aria-role"?: "tabpanel";
}

export interface WithAriaRoleTextbox {
  "aria-role"?: "textbox";
}

export interface WithAriaRoleTimer {
  "aria-role"?: "timer";
}

export interface WithAriaRoleToolbar {
  "aria-role"?: "toolbar";
}

export interface WithAriaRoleTooltip {
  "aria-role"?: "tooltip";
}

export interface WithAriaRoleTree {
  "aria-role"?: "tree";
}

export interface WithAriaRoleTreegrid {
  "aria-role"?: "treegrid";
}

export interface WithAriaRoleTreeitem {
  "aria-role"?: "treeitem";
}

export interface WithAriaRoleArticle {
  "aria-role"?: "article";
}

export interface WithAriaRoleBanner {
  "aria-role"?: "banner";
}

export interface WithAriaRoleComplementary {
  "aria-role"?: "complementary";
}

export interface WithAriaRoleContentinfo {
  "aria-role"?: "contentinfo";
}

export interface WithAriaRoleForm {
  "aria-role"?: "form";
}

export interface WithAriaRoleMain {
  "aria-role"?: "main";
}

export interface WithAriaRoleNavigation {
  "aria-role"?: "navigation";
}

export interface WithAriaRoleRegion {
  "aria-role"?: "region";
}

export interface WithAriaRoleSearch {
  "aria-role"?: "search";
}
