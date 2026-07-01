<template>
  <div class="m-statistic">
    <div class="m-statistic__head">
      <slot name="title">
        <span v-if="title" class="m-statistic__title">{{ title }}</span>
        <MTooltip v-if="info" :content="info" placement="top">
          <span class="m-statistic__info-icon">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
              <path d="M512 348m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"/>
              <path d="M512 432c-17.7 0-32 14.3-32 32v228c0 17.7 14.3 32 32 32s32-14.3 32-32V464c0-17.7-14.3-32-32-32z"/>
            </svg>
          </span>
        </MTooltip>
      </slot>
    </div>

    <div class="m-statistic__content">
      <span v-if="prefix || $slots.prefix" class="m-statistic__prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="m-statistic__value">{{ formattedValue }}</span>
      <span v-if="suffix || $slots.suffix" class="m-statistic__suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>

    <!-- 底部趋势 -->
    <div v-if="$slots.footer || trend !== undefined || trendLabel || trendValue" class="m-statistic__footer">
      <slot name="footer">
        <div v-if="trend !== undefined || trendLabel || trendValue" class="m-statistic__trend" :class="trend !== undefined ? (trend ? 'm-statistic__trend--up' : 'm-statistic__trend--down') : ''">
          <span v-if="trendLabel" class="m-statistic__trend-label">{{ trendLabel }}</span>
          <span v-if="trendValue" class="m-statistic__trend-value">{{ trendValue }}</span>
          <span v-if="trend !== undefined" class="m-statistic__trend-icon">
            <!-- 增长 -->
            <svg v-if="trend" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 192l384 448H128z"/>
            </svg>
            <!-- 减少 -->
            <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M128 192h768L512 640z"/>
            </svg>
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MTooltip from '../../feedback/Tooltip/Tooltip.vue'

defineOptions({ name: 'MStatistic' })

const props = withDefaults(defineProps<{
  title?: string           // 统计项标题
  value?: number | string  // 统计数值
  precision?: number       // 数值精度（小数位数）
  prefix?: string          // 数值前缀，如货币符号
  suffix?: string          // 数值后缀，如单位
  info?: string            // 标题旁的提示信息，hover 显示
  separator?: boolean      // 是否启用千分位分隔符
  trend?: boolean          // 增长情况，true 为增长（绿色上三角），false 为减少（红色下三角）
  trendLabel?: string      // 增长/减少标签，展示在趋势数值左侧，如"同比"
  trendValue?: string      // 增长/减少数值字符串，展示在三角图标左侧
}>(), {
  title: '',
  value: '',
  precision: undefined,
  prefix: '',
  suffix: '',
  info: '',
  separator: false,
  trend: undefined,
  trendLabel: '',
  trendValue: '',
})

const formattedValue = computed(() => {
  if (props.value === '' || props.value === undefined) return ''
  const num = Number(props.value)
  if (isNaN(num)) return String(props.value)
  // 先处理精度
  let str: string
  if (props.precision !== undefined) {
    str = num.toFixed(props.precision)
  } else {
    str = String(props.value)
  }
  // 再处理千分位
  if (props.separator) {
    const [intPart, decPart] = str.split('.')
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    str = decPart !== undefined ? `${grouped}.${decPart}` : grouped
  }
  return str
})
</script>

<style lang="scss">
.m-statistic {
  display: inline-flex;
  flex-direction: column;

  &__head {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__title {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    line-height: 1.5;
  }

  &__info-icon {
    display: inline-flex;
    align-items: center;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-placeholder);
    cursor: help;
    line-height: 1;

    &:hover {
      color: var(--mosaic-text-secondary);
    }
  }

  &__content {
    display: flex;
    align-items: baseline;
    font-size: var(--mosaic-font-size-lg);
    color: var(--mosaic-text-primary);
  }

  &__value {
    font-size: 28px;
    font-weight: 600;
    color: var(--mosaic-text-primary);
    line-height: 1.2;
  }

  &__prefix {
    font-size: var(--mosaic-font-size);
    margin-right: 4px;
    color: var(--mosaic-text-regular);
  }

  &__suffix {
    font-size: var(--mosaic-font-size);
    margin-left: 4px;
    color: var(--mosaic-text-regular);
  }

  &__footer {
    margin-top: 4px;
    display: flex;
    justify-content: flex-end;
  }

  &__trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--mosaic-font-size-ssm);

    &-label {
      color: var(--mosaic-text-secondary);
    }

    &-value {
      font-weight: 600;
    }

    &-icon {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      line-height: 1;
      margin-top: 2px;
    }

    &--up {
      .m-statistic__trend-value,
      .m-statistic__trend-icon {
        color: var(--mosaic-color-success, #67c23a);
      }
    }

    &--down {
      .m-statistic__trend-value,
      .m-statistic__trend-icon {
        color: var(--mosaic-color-danger, #f56c6c);
      }
    }
  }
}
</style>

