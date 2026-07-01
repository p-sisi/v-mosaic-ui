<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

defineOptions({ name: 'MSteps' })

type StepDirection = 'horizontal' | 'vertical'
type StepProcessStatus = 'process' | 'wait' | 'success' | 'error' | 'finish'
type StepFinishStatus = 'wait' | 'success' | 'error' | 'finish'

const props = withDefaults(defineProps<{
  space?: number | string    // 每个 step 的间距，不填写将自适应间距
  active?: number            // 设置当前激活步骤
  direction?: StepDirection  // 显示方向
  alignCenter?: boolean      // 进行居中对齐
  simple?: boolean           // 是否应用简洁风格
  processStatus?: StepProcessStatus  // 设置当前步骤的状态
  finishStatus?: StepFinishStatus   // 设置已完成步骤的状态
}>(), {
  space: '',
  active: 0,
  direction: 'horizontal',
  alignCenter: false,
  simple: false,
  processStatus: 'process',
  finishStatus: 'finish',
})

const emit = defineEmits<{
  'update:active': [active: number]  // v-model 更新事件
  change: [newIndex: number, oldIndex: number]  // 当前激活步骤改变时触发
}>()

const internalActive = ref(props.active)
const steps = ref<any[]>([])

watch(() => props.active, (newVal) => {
  internalActive.value = newVal
})

watch(internalActive, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('update:active', newVal)
    emit('change', newVal, oldVal)
  }
})

function setActive(index: number) {
  if (index < 0 || index >= steps.value.length) return
  internalActive.value = index
}

function handleStepClick(index: number) {
  if (index < 0 || index >= steps.value.length) return
  internalActive.value = index
}

function prev() {
  if (internalActive.value > 0) {
    internalActive.value--
  }
}

function next() {
  if (internalActive.value < steps.value.length - 1) {
    internalActive.value++
  }
}

defineExpose({ prev, next, setActive })

provide('mSteps', {
  active: () => internalActive.value,
  processStatus: () => props.processStatus,
  finishStatus: () => props.finishStatus,
  direction: () => props.direction,
  space: () => props.space,
  alignCenter: () => props.alignCenter,
  simple: () => props.simple,
  steps,
  handleStepClick,
  addStep: (step: any) => {
    steps.value.push(step)
  },
  removeStep: (step: any) => {
    const idx = steps.value.indexOf(step)
    if (idx !== -1) steps.value.splice(idx, 1)
  },
})

const classes = computed(() => [
  'm-steps',
  `m-steps--${props.direction}`,
  {
    'm-steps--simple': props.simple,
    'm-steps--align-center': props.alignCenter,
  },
])
</script>

<style lang="scss">
.m-steps {
  display: flex;
  width: 100%;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--simple {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: var(--mosaic-fill-color-light);
    border-radius: var(--mosaic-border-radius);
  }

  &--align-center .m-step {
    text-align: center;
  }
}
</style>