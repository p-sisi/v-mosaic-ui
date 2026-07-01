import type { App, Component } from 'vue'
import {
  MButton, MButtonGroup, MText, MLink, MDivider, MBadge, MTag, MAvatar, MAvatarGroup,
  MSkeleton, MSkeletonItem, MEmpty, MResult, MStatistic, MSpinner, MScrollbar,
  MRow, MCol, MContainer, MHeader, MAside, MMain, MFooter,
  MInput, MForm, MFormItem, MInputNumber, MInputTag, MInputOTP, MSelect,
  MCheckboxGroup, MCheckbox, MCheckboxButton,
  MRadioGroup, MRadio, MRadioButton,
  MSwitch, MSlider, MRate, MOption, MOptionGroup, MTransfer, MTreeSelect, MAutocomplete, MCascader, MColorPickerPanel, MColorPicker, MDatePickerPanel, MDatePicker, MTimePicker, MUpload,
  MBreadcrumb, MBreadcrumbItem, MTabs, MTabPane,
  MDropdown, MDropdownMenu, MDropdownItem,
  MMenu, MMenuItem, MMenuItemGroup, MSubmenu,
  MPagination, MSteps, MStep, MPageHeader,
  MProgress, MImage, MCard, MTimeline, MTimelineItem,
  MTable, MTableColumn, MTree, MCalendar,
  MCarousel, MCarouselItem, MCollapse, MCollapseItem,
  MDescriptions, MDescriptionsItem,
  MAlert, MBacktop, MPopconfirm, MPopover, MTooltip,
  MDialog, MDrawer,
} from './components'
import { installDirectives } from './directives'

// SFC components that can be registered via app.component()
const allComponents: Component[] = [
  MButton, MButtonGroup, MText, MLink, MDivider, MBadge, MTag, MAvatar, MAvatarGroup,
  MSkeleton, MSkeletonItem, MEmpty, MResult, MStatistic, MSpinner, MScrollbar,
  MRow, MCol, MContainer, MHeader, MAside, MMain, MFooter,
  MInput, MForm, MFormItem, MInputNumber, MInputTag, MInputOTP, MSelect,
  MCheckboxGroup, MCheckbox, MCheckboxButton,
  MRadioGroup, MRadio, MRadioButton,
  MSwitch, MSlider, MRate, MOption, MOptionGroup, MTransfer, MTreeSelect, MAutocomplete, MCascader, MColorPickerPanel, MColorPicker, MDatePickerPanel, MDatePicker, MTimePicker, MUpload,
  MBreadcrumb, MBreadcrumbItem, MTabs, MTabPane,
  MDropdown, MDropdownMenu, MDropdownItem,
  MMenu, MMenuItem, MMenuItemGroup, MSubmenu,
  MPagination, MSteps, MStep, MPageHeader,
  MProgress, MImage, MCard, MTimeline, MTimelineItem,
  MTable, MTableColumn, MTree, MCalendar,
  MCarousel, MCarouselItem, MCollapse, MCollapseItem,
  MDescriptions, MDescriptionsItem,
  MAlert, MBacktop, MPopconfirm, MPopover, MTooltip,
  MDialog, MDrawer,
]

function install(app: App) {
  allComponents.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
  installDirectives(app)
}

export { install }
export {
  MButton, MButtonGroup, MText, MLink, MDivider, MBadge, MTag, MAvatar, MAvatarGroup,
  MSkeleton, MSkeletonItem, MEmpty, MResult, MStatistic, MSpinner, MScrollbar,
  MRow, MCol, MContainer, MHeader, MAside, MMain, MFooter,
  MInput, MForm, MFormItem, MInputNumber, MInputTag, MInputOTP, MSelect,
  MCheckboxGroup, MCheckbox, MCheckboxButton,
  MRadioGroup, MRadio, MRadioButton,
  MSwitch, MSlider, MRate, MOption, MOptionGroup, MTransfer, MTreeSelect, MAutocomplete, MCascader, MColorPickerPanel, MColorPicker, MDatePickerPanel, MDatePicker, MTimePicker, MUpload,
  MBreadcrumb, MBreadcrumbItem, MTabs, MTabPane,
  MDropdown, MDropdownMenu, MDropdownItem,
  MMenu, MMenuItem, MMenuItemGroup, MSubmenu,
  MPagination, MSteps, MStep, MPageHeader,
  MProgress, MImage, MCard, MTimeline, MTimelineItem,
  MTable, MTableColumn, MTree, MCalendar,
  MCarousel, MCarouselItem, MCollapse, MCollapseItem,
  MDescriptions, MDescriptionsItem,
  MAlert, MBacktop, MPopconfirm, MPopover, MTooltip,
  MDialog, MDrawer,
}
export { MLoading } from './components/feedback/Loading'
export { MMessage } from './components/feedback/Message'
export { MMessageBox } from './components/feedback/MessageBox'
export { MNotification } from './components/feedback/Notification'
export { vInfiniteScroll } from './directives'
export { useClickOutside, useZIndex, useLockScroll, useEmitter, useFormItem, useSize, usePopper, usePopup, useFocusTrap, useResizeObserver, useIntersection, useTeleportTarget } from './hooks'
export { bem } from './utils'

export default { install }