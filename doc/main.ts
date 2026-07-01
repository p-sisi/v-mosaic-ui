import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import MosaicUI from '@pang/mosaic-ui'
import App from './App.vue'

// 首页
import Home from './pages/home.vue'

// 通用
import ButtonDoc from './pages/general/button.vue'
import ButtonGroupDoc from './pages/general/button-group.vue'
import TextDoc from './pages/general/text.vue'
import LinkDoc from './pages/general/link.vue'
import DividerDoc from './pages/general/divider.vue'
import BadgeDoc from './pages/general/badge.vue'
import TagDoc from './pages/general/tag.vue'
import AvatarDoc from './pages/general/avatar.vue'
import AvatarGroupDoc from './pages/general/avatar-group.vue'
import SkeletonDoc from './pages/general/skeleton.vue'
import EmptyDoc from './pages/general/empty.vue'
import ResultDoc from './pages/general/result.vue'
import StatisticDoc from './pages/general/statistic.vue'
import SpinnerDoc from './pages/general/spinner.vue'
import ScrollbarDoc from './pages/general/scrollbar.vue'

// 布局
import ContainerDoc from './pages/layout/container.vue'
import RowColDoc from './pages/layout/row-col.vue'

// 表单
import InputDoc from './pages/form/input.vue'
import InputNumberDoc from './pages/form/input-number.vue'
import InputTagDoc from './pages/form/input-tag.vue'
import InputOTPDoc from './pages/form/input-otp.vue'
import CheckboxDoc from './pages/form/checkbox.vue'
import RadioDoc from './pages/form/radio.vue'
import SwitchDoc from './pages/form/switch.vue'
import SliderDoc from './pages/form/slider.vue'
import RateDoc from './pages/form/rate.vue'
import SelectDoc from './pages/form/select.vue'
import TransferDoc from './pages/form/transfer.vue'
import TreeSelectDoc from './pages/form/tree-select.vue'
import FormDoc from './pages/form/form.vue'
import AutocompleteDoc from './pages/form/autocomplete.vue'
import CascaderDoc from './pages/form/cascader.vue'
import ColorPickerDoc from './pages/form/color-picker.vue'
import DatePickerDoc from './pages/form/date-picker.vue'
import TimePickerDoc from './pages/form/time-picker.vue'
import UploadDoc from './pages/form/upload.vue'

// 导航
import BreadcrumbDoc from './pages/navigation/breadcrumb.vue'
import TabsDoc from './pages/navigation/tabs.vue'
import DropdownDoc from './pages/navigation/dropdown.vue'
import MenuDoc from './pages/navigation/menu.vue'
import PaginationDoc from './pages/navigation/pagination.vue'
import StepsDoc from './pages/navigation/steps.vue'
import PageHeaderDoc from './pages/navigation/page-header.vue'

// 数据展示
import ProgressDoc from './pages/data/progress.vue'
import ImageDoc from './pages/data/image.vue'
import CardDoc from './pages/data/card.vue'
import TimelineDoc from './pages/data/timeline.vue'
import TableDoc from './pages/data/table.vue'
import TreeDoc from './pages/data/tree.vue'
import CalendarDoc from './pages/data/calendar.vue'
import CarouselDoc from './pages/data/carousel.vue'
import CollapseDoc from './pages/data/collapse.vue'
import DescriptionsDoc from './pages/data/descriptions.vue'

// 消息反馈
import MessageIndex from './pages/message/index.vue'
import AlertDoc from './pages/feedback/alert.vue'
import BacktopDoc from './pages/feedback/backtop.vue'
import PopoverDoc from './pages/feedback/popover.vue'
import TooltipDoc from './pages/feedback/tooltip.vue'
import PopconfirmDoc from './pages/feedback/popconfirm.vue'
import DialogDoc from './pages/feedback/dialog.vue'
import DrawerDoc from './pages/feedback/drawer.vue'
import MessageDoc from './pages/feedback/message.vue'
import MessageBoxDoc from './pages/feedback/message-box.vue'
import NotificationDoc from './pages/feedback/notification.vue'

const routes = [
  { path: '/', component: Home },

  // 通用
  { path: '/general/button', component: ButtonDoc },
  { path: '/general/button-group', component: ButtonGroupDoc },
  { path: '/general/text', component: TextDoc },
    { path: '/general/link', component: LinkDoc },
  { path: '/general/divider', component: DividerDoc },
  { path: '/general/badge', component: BadgeDoc },
  { path: '/general/tag', component: TagDoc },
  { path: '/general/avatar', component: AvatarDoc },
  { path: '/general/avatar-group', component: AvatarGroupDoc },
  { path: '/general/skeleton', component: SkeletonDoc },
  { path: '/general/empty', component: EmptyDoc },
  { path: '/general/result', component: ResultDoc },
  { path: '/general/statistic', component: StatisticDoc },
  { path: '/general/spinner', component: SpinnerDoc },
  { path: '/general/scrollbar', component: ScrollbarDoc },

  // 布局
  { path: '/layout/container', component: ContainerDoc },
  { path: '/layout/row-col', component: RowColDoc },

  // 表单
  { path: '/form/input', component: InputDoc },
  { path: '/form/input-number', component: InputNumberDoc },
  { path: '/form/input-tag', component: InputTagDoc },
  { path: '/form/input-otp', component: InputOTPDoc },
  { path: '/form/checkbox', component: CheckboxDoc },
  { path: '/form/radio', component: RadioDoc },
  { path: '/form/switch', component: SwitchDoc },
  { path: '/form/slider', component: SliderDoc },
  { path: '/form/rate', component: RateDoc },
  { path: '/form/select', component: SelectDoc },
  { path: '/form/transfer', component: TransferDoc },
  { path: '/form/tree-select', component: TreeSelectDoc },
  { path: '/form/form', component: FormDoc },
  { path: '/form/autocomplete', component: AutocompleteDoc },
  { path: '/form/cascader', component: CascaderDoc },
  { path: '/form/color-picker', component: ColorPickerDoc },
  { path: '/form/date-picker', component: DatePickerDoc },
  { path: '/form/time-picker', component: TimePickerDoc },
  { path: '/form/upload', component: UploadDoc },

  // 导航
  { path: '/navigation/breadcrumb', component: BreadcrumbDoc },
  { path: '/navigation/tabs', component: TabsDoc },
  { path: '/navigation/dropdown', component: DropdownDoc },
  { path: '/navigation/menu', component: MenuDoc },
  { path: '/navigation/pagination', component: PaginationDoc },
  { path: '/navigation/steps', component: StepsDoc },
  { path: '/navigation/page-header', component: PageHeaderDoc },

  // 数据展示
  { path: '/data/progress', component: ProgressDoc },
  { path: '/data/image', component: ImageDoc },
  { path: '/data/card', component: CardDoc },
  { path: '/data/timeline', component: TimelineDoc },
  { path: '/data/table', component: TableDoc },
  { path: '/data/tree', component: TreeDoc },
  { path: '/data/calendar', component: CalendarDoc },
  { path: '/data/carousel', component: CarouselDoc },
  { path: '/data/collapse', component: CollapseDoc },
  { path: '/data/descriptions', component: DescriptionsDoc },

  // 消息反馈
  { path: '/message', component: MessageIndex },
  { path: '/feedback/alert', component: AlertDoc },
  { path: '/feedback/backtop', component: BacktopDoc },
  { path: '/feedback/popover', component: PopoverDoc },
  { path: '/feedback/tooltip', component: TooltipDoc },
  { path: '/feedback/popconfirm', component: PopconfirmDoc },
  { path: '/feedback/dialog', component: DialogDoc },
  { path: '/feedback/drawer', component: DrawerDoc },
  { path: '/feedback/message', component: MessageDoc },
  { path: '/feedback/message-box', component: MessageBoxDoc },
  { path: '/feedback/notification', component: NotificationDoc },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(MosaicUI)
app.mount('#app')