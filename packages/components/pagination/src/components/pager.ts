import { buildProps } from '@vuesax-alpha/utils'
import type { ExtractPropTypes } from 'vue'
import type Pager from './pager.vue'

export const paginationPagerProps = buildProps({
  pagerCount: {
    type: Number,
    default: 7,
  },
} as const)

export type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>

export type PagerInstance = InstanceType<typeof Pager>