<template>
  <Transition name="m-zoom-in-top">
    <div v-show="visible" class="m-dropdown-menu">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'

defineOptions({ name: 'MDropdownMenu' })

const dropdown = inject<{
  dropdown: { visible: Ref<boolean> };
  disabled: () => boolean;
  size: () => string;
  trigger: () => string;
  showTimeout: () => number;
  hideTimeout: () => number;
  hideOnClick: () => boolean;
  command: (cmd: string | number | object) => void;
}>('mDropdown', {
  dropdown: { visible: ref(false) },
  disabled: () => false,
  size: () => 'default',
  trigger: () => 'hover',
  showTimeout: () => 250,
  hideTimeout: () => 150,
  hideOnClick: () => true,
  command: () => {},
})

const visible = computed(() => dropdown.dropdown.visible.value)
</script>

<style lang="scss">
.m-dropdown-menu {
  padding: 6px 0;
  background-color: #fff;
  border: 1px solid var(--mosaic-border-color-light);
  border-radius: var(--mosaic-border-radius);
  box-shadow: var(--mosaic-box-shadow-base);
  min-width: 100px;
  margin: 4px 0;
}
</style>
