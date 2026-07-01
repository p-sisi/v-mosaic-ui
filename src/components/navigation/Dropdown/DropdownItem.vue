<template>
  <li
    :class="classes"
    :style="itemStyle"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'

defineOptions({ name: 'MDropdownItem' })

const props = withDefaults(defineProps<{
  command?: string | number | object  // 菜单项指令值
  disabled?: boolean                  // 是否禁用
  divided?: boolean                   // 是否显示分割线
}>(), {
  command: '',
  disabled: false,
  divided: false,
})

const emit = defineEmits<{
  click: [command: string | number | object]  // 点击菜单项时触发
}>()

const dropdown = inject<{
  dropdown: { visible: Ref<boolean> };
  disabled: () => boolean;
  size: () => string;
  trigger: () => string;
  showTimeout: () => number;
  hideTimeout: () => number;
  hideOnClick: () => boolean;
  color: () => string;
  command: (cmd: string | number | object) => void;
}>('mDropdown', {
  dropdown: { visible: ref(false) },
  disabled: () => false,
  size: () => 'default',
  trigger: () => 'hover',
  showTimeout: () => 250,
  hideTimeout: () => 150,
  hideOnClick: () => true,
  color: () => '',
  command: () => {},
})

const itemStyle = computed(() => {
  const color = dropdown.color?.()
  return color ? { '--m-dropdown-color': color } : {}
})

const classes = computed(() => [
  'm-dropdown-item',
  {
    'm-dropdown-item--disabled': props.disabled,
    'm-dropdown-item--divided': props.divided,
  },
])

function handleClick() {
  if (props.disabled) return
  const cmd = props.command
  emit('click', cmd)
  dropdown.command(cmd)
}
</script>

<style lang="scss">
.m-dropdown-item {
  list-style: none;
  padding: 0 16px;
  height: 34px;
  line-height: 34px;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);
  cursor: pointer;
  transition: background-color var(--mosaic-transition-duration-fast), color var(--mosaic-transition-duration-fast);
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background-color: var(--mosaic-fill-color-light);
    color: var(--m-dropdown-color, var(--mosaic-primary));
  }

  &--disabled {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
      color: var(--mosaic-disabled-text-color);
    }
  }

  &--divided {
    border-top: 1px solid var(--mosaic-border-color-lighter);
    margin-top: 6px;
    padding-top: 6px;
  }
}
</style>
