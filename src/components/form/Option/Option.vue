<template>
  <li
    :class="classes"
    :style="optionStyle"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.stop="handleClick"
  >
    <span class="m-option__label">{{ currentLabel }}</span>
    <span v-if="isSelected" class="m-option__check">&#10003;</span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, onBeforeUnmount, watch } from 'vue'

defineOptions({ name: 'MOption' })

const props = withDefaults(defineProps<{
  value: string | number          // 选项的值，必填
  label?: string | number         // 选项的标签，默认取 value
  disabled?: boolean              // 是否禁用
  key?: string | number           // 选项的唯一标识
  color?: string                  // 选项背景颜色
  activeColor?: string            // 选中时的颜色
}>(), {
  disabled: false,
  color: '',
  activeColor: '',
})

const select = inject<any>('mSelect', undefined)

const hover = ref(false)

const currentLabel = computed(() => {
  return props.label !== undefined ? props.label : props.value
})

const isSelected = computed(() => {
  if (select) {
    const modelValue = select.modelValue?.value
    if (Array.isArray(modelValue)) {
      return modelValue.includes(props.value)
    }
    return modelValue === props.value
  }
  return false
})

function handleClick() {
  if (props.disabled) return
  if (select) {
    select.handleOptionSelect(props.value, currentLabel.value)
  }
}

// 向 Select 注册选项标签，用于触发器回显
onMounted(() => {
  select?.registerOption?.(props.value, currentLabel.value)
})

onBeforeUnmount(() => {
  select?.unregisterOption?.(props.value)
})

watch(currentLabel, (newLabel) => {
  select?.registerOption?.(props.value, newLabel)
})

const classes = computed(() => [
  'm-option',
  {
    'm-option--selected': isSelected.value,
    'm-option--disabled': props.disabled,
    'm-option--hover': hover.value,
    'm-option--custom-color': props.color,
    'm-option--custom-active': props.activeColor && isSelected.value,
  },
])

const optionStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.color
  }
  if (props.activeColor && isSelected.value) {
    style.color = props.activeColor
    style['--m-option-active-color'] = props.activeColor
  }
  return style
})
</script>

<style lang="scss">
.m-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  line-height: 34px;
  padding: 0 16px;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);
  cursor: pointer;
  transition: background-color 0.2s;
  list-style: none;

  &:hover:not(.m-option--disabled):not(.m-option--custom-color),
  &--hover:not(.m-option--custom-color) {
    background-color: var(--mosaic-fill-color-light);
  }

  &--custom-color {
    &:hover:not(.m-option--disabled),
    &.m-option--hover {
      filter: brightness(0.95);
    }
  }

  &--selected {
    color: var(--m-option-active-color, var(--mosaic-primary));
    font-weight: bold;

    &.m-option--hover:not(.m-option--custom-color) {
      background-color: var(--mosaic-fill-color-light);
    }
  }

  &__check {
    color: var(--m-option-active-color, var(--mosaic-primary));
    font-size: 12px;
    margin-left: 8px;
  }

  &--disabled {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;
  }

  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__check {
    color: var(--mosaic-primary);
    font-size: 12px;
    margin-left: 8px;
  }
}
</style>