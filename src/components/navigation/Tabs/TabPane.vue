<template>
  <div v-if="shouldRender" v-show="active" class="m-tabs__pane" role="tabpanel">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, onMounted, onUnmounted, getCurrentInstance, type Ref } from 'vue'

defineOptions({ name: 'MTabPane' })

interface TabPaneData {
  label: string
  name: string | number
  disabled: boolean
  closable: boolean
}

const props = withDefaults(defineProps<{
  label?: string              // 标签页标题
  name?: string | number      // 标签页名称，对应 v-model 的值
  disabled?: boolean          // 是否禁用
  closable?: boolean          // 标签是否可关闭
  lazy?: boolean              // 是否延迟渲染，首次激活时才渲染内容
}>(), {
  label: '',
  name: '',
  disabled: false,
  closable: false,
  lazy: false,
})

const tabs = inject<{
  activeName: Ref<string | number>;
  type: () => string;
  closable: () => boolean;
  tabPosition: () => string;
  registerPane: (pane: TabPaneData) => void;
  unregisterPane: (pane: TabPaneData) => void;
}>('mTabs', {
  activeName: ref(''),
  type: () => 'line',
  closable: () => false,
  tabPosition: () => 'top',
  registerPane: () => {},
  unregisterPane: () => {},
})

const paneData: TabPaneData = {
  label: props.label,
  name: props.name,
  disabled: props.disabled,
  closable: props.closable,
}

const active = computed(() => tabs.activeName.value === props.name)
const loaded = ref(false)

const shouldRender = computed(() => {
  if (props.lazy) {
    return active.value || loaded.value
  }
  return true
})

watch(active, (val) => {
  if (val && props.lazy) {
    loaded.value = true
  }
})

onMounted(() => {
  tabs.registerPane(paneData)
})

onUnmounted(() => {
  tabs.unregisterPane(paneData)
})
</script>

<style lang="scss">
.m-tabs__pane {
  padding: 16px 0;
  color: var(--mosaic-text-regular);
  font-size: var(--mosaic-font-size);
}
</style>
