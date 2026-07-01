<template>
  <div :class="classes" :style="{ fontSize: size + 'px' }">
    <span
      v-for="star in max"
      :key="star"
      class="m-rate__star"
      :style="getStarStyle(star)"
      @mousemove="handleMouseMove($event, star)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(star)"
    >
      <span class="m-rate__item m-rate__item--left" @click.stop="handleClick(star, true)" />
      <span class="m-rate__item m-rate__item--right" @click.stop="handleClick(star, false)" />
    </span>
    <span v-if="showText && currentText" class="m-rate__text" :style="{ color: textColor }">
      {{ currentText }}
    </span>
    <span v-if="showScore" class="m-rate__score" :style="{ color: textColor }">
      {{ scoreTemplate.replace('{value}', String(hoverValue ?? modelValue)) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MRate' })

const props = withDefaults(defineProps<{
  modelValue?: number            // 绑定值，评分值
  max?: number                   // 最大分值
  disabled?: boolean             // 是否禁用
  allowHalf?: boolean            // 是否允许半选
  showScore?: boolean            // 是否显示当前分值
  showText?: boolean             // 是否显示辅助文字
  textColor?: string             // 辅助文字颜色
  texts?: string[]               // 辅助文字数组
  colors?: string[]              // 星星颜色数组，[低, 中, 高]
  scoreTemplate?: string         // 分数显示模板
  size?: number                  // 星星大小（像素）
}>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  allowHalf: false,
  showScore: false,
  showText: false,
  textColor: '#e6a23c',
  texts: () => ['极差', '失望', '一般', '满意', '惊喜'],
  colors: () => ['#c0c4cc', '#e6a23c', '#a78bfa'],
  scoreTemplate: '{value}',
  size: 14,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]  // v-model 更新事件
  change: [value: number]               // 值变更时触发
}>()

const hoverValue = ref<number | null>(null)

const displayValue = computed(() => hoverValue.value ?? props.modelValue)

const currentText = computed(() => {
  const index = Math.ceil(displayValue.value) - 1
  if (index < 0 || index >= props.texts.length) return ''
  return props.texts[index]
})

function getActiveColor(): string {
  return props.colors[1] ?? props.colors[0]
}

function getStarStyle(star: number) {
  const val = displayValue.value

  if (val >= star) {
    // Full star
    return { color: getActiveColor() }
  }
  if (props.allowHalf && val >= star - 0.5) {
    // Half star - use gradient trick
    const color = getActiveColor()
    return {
      color: props.colors[0],
      background: 'linear-gradient(90deg, ' + color + ' 50%, ' + props.colors[0] + ' 50%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  }
  // Void star
  return { color: props.colors[0] }
}

function handleMouseMove(event: MouseEvent, star: number) {
  if (props.disabled) return

  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const isLeft = event.clientX - rect.left <= rect.width / 2
    hoverValue.value = isLeft ? star - 0.5 : star
  } else {
    hoverValue.value = star
  }
}

function handleMouseLeave() {
  if (props.disabled) return
  hoverValue.value = null
}

function handleClick(star: number, isLeft?: boolean) {
  if (props.disabled) return

  let value: number
  if (props.allowHalf && isLeft !== undefined) {
    value = isLeft ? star - 0.5 : star
  } else {
    value = star
  }

  // Click same value to reset
  if (value === props.modelValue) {
    value = 0
  }

  emit('update:modelValue', value)
  emit('change', value)
}

const classes = computed(() => [
  'm-rate',
  {
    'm-rate--disabled': props.disabled,
  },
])
</script>

<style lang="scss">
.m-rate {
  display: inline-flex;
  align-items: center;
  height: 20px;
  line-height: 1;

  &__star {
    position: relative;
    display: inline-block;
    font-size: 1em;
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
    margin-right: 6px;
    color: var(--mosaic-text-placeholder);

    &::before {
      content: '\2605';
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.2;
      text-align: center;
    }
  }

  &__item {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 1;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  &--disabled {
    opacity: 0.6;

    & .m-rate__star {
      cursor: default;
    }
  }

  &__text {
    margin-left: 8px;
    font-size: var(--mosaic-font-size);
    color: #e6a23c;
  }

  &__score {
    margin-left: 8px;
    font-size: var(--mosaic-font-size);
    color: #e6a23c;
  }
}
</style>