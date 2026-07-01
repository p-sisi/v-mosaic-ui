<template>
  <div :class="classes" :style="stepStyle" @click="handleClick">
    <div class="m-step__head">
      <div
        :class="['m-step__icon', `m-step__icon--${internalStatus}`]"
      >
        <span v-if="internalStatus === 'finish'" class="m-step__icon-inner m-step__icon-check">&#10003;</span>
        <span v-else-if="internalStatus === 'error'" class="m-step__icon-inner m-step__icon-cross">&#10007;</span>
        <span v-else class="m-step__icon-inner">{{ index + 1 }}</span>
      </div>
    </div>
    <div class="m-step__main">
      <div :class="['m-step__title', `m-step__title--${internalStatus}`]">
        {{ title }}
      </div>
      <div v-if="description" :class="['m-step__description', `m-step__description--${internalStatus}`]">
        {{ description }}
      </div>
    </div>
    <div :class="['m-step__line', `m-step__line--${internalStatus}`]">
      <div :class="['m-step__line-inner', `m-step__line-inner--${internalStatus}`]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MStep' })

type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

const props = withDefaults(defineProps<{
  title?: string              // 步骤标题
  description?: string        // 步骤描述性文字
  status?: StepStatus         // 步骤的状态
  disabled?: boolean          // 是否禁用点击
}>(), {
  title: '',
  description: '',
  status: undefined,
  disabled: false,
})

const steps = inject<{
  active: () => number;
  processStatus: () => string;
  finishStatus: () => string;
  direction: () => string;
  space: () => number | string;
  alignCenter: () => boolean;
  simple: () => boolean;
  steps: Ref<any[]>;
  handleStepClick: (index: number) => void;
  addStep: (step: any) => void;
  removeStep: (step: any) => void;
}>('mSteps', {
  active: () => 0,
  processStatus: () => 'process',
  finishStatus: () => 'finish',
  direction: () => 'horizontal',
  space: () => '',
  alignCenter: () => false,
  simple: () => false,
  steps: ref([]),
  handleStepClick: () => {},
  addStep: () => {},
  removeStep: () => {},
})

import type { Ref } from 'vue'

const index = computed(() => steps.steps.value.indexOf(stepInstance))
const isLast = computed(() => index.value === steps.steps.value.length - 1)

const internalStatus = computed(() => {
  if (props.status) return props.status
  const active = steps.active()
  if (index.value < active) return steps.finishStatus()
  if (index.value === active) return steps.processStatus()
  return 'wait'
})

const classes = computed(() => [
  'm-step',
  `m-step--${internalStatus.value}`,
  {
    'm-step--last': isLast.value,
    'm-step--simple': steps.simple(),
    'm-step--clickable': !props.disabled,
  },
])

const stepStyle = computed(() => {
  const style: Record<string, string> = {}
  const space = steps.space()
  if (space) {
    if (typeof space === 'number') {
      style.width = `${space}px`
    } else {
      style.width = space
    }
  } else if (!isLast.value && steps.direction() === 'horizontal') {
    style.flex = '1'
  }
  return style
})

const stepInstance = { status: computed(() => props.status) }

function handleClick() {
  if (props.disabled) return
  if (typeof steps.handleStepClick === 'function') {
    steps.handleStepClick(index.value)
  }
}

onMounted(() => {
  steps.addStep(stepInstance)
})

onUnmounted(() => {
  steps.removeStep(stepInstance)
})
</script>

<style lang="scss">
.m-step {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;

  &--clickable {
    cursor: pointer;

    &:hover .m-step__icon--wait {
      border-color: var(--mosaic-primary);
      color: var(--mosaic-primary);
    }

    &:hover .m-step__title--wait {
      color: var(--mosaic-primary);
    }
  }

  &--horizontal {
    flex-direction: column;
    align-items: center;

    .m-step__line {
      top: 15px;
      left: 50%;
      right: -50%;
      height: 2px;
    }
  }

  &--vertical {
    flex-direction: row;
    padding-bottom: 24px;

    .m-step__main {
      text-align: left;
      padding-top: 0;
      padding-left: 12px;
      flex: 1;
    }

    .m-step__line {
      left: 15px;
      top: 32px;
      bottom: 0;
      width: 2px;
    }
  }

  &--last {
    &.m-step--horizontal .m-step__line {
      display: none;
    }

    &.m-step--vertical .m-step__line {
      display: none;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    position: relative;
    z-index: 1;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid;
    font-size: var(--mosaic-font-size);
    transition: all var(--mosaic-transition-duration);
    box-sizing: border-box;

    &--wait {
      border-color: var(--mosaic-text-placeholder);
      color: var(--mosaic-text-placeholder);
      background-color: #fff;
    }

    &--process {
      border-color: var(--mosaic-primary);
      color: var(--mosaic-primary);
      background-color: var(--mosaic-primary);

      .m-step__icon-inner {
        color: #fff;
      }
    }

    &--finish {
      border-color: var(--mosaic-success);
      color: var(--mosaic-success);
      background-color: var(--mosaic-success);

      .m-step__icon-inner {
        color: #fff;
      }
    }

    &--error {
      border-color: var(--mosaic-danger);
      color: var(--mosaic-danger);
      background-color: var(--mosaic-danger);

      .m-step__icon-inner {
        color: #fff;
      }
    }

    &--success {
      border-color: var(--mosaic-success);
      color: var(--mosaic-success);
      background-color: var(--mosaic-success);

      .m-step__icon-inner {
        color: #fff;
      }
    }
  }

  &__icon-inner {
    font-size: var(--mosaic-font-size);
    line-height: 1;
  }

  &__icon-check,
  &__icon-cross {
    font-weight: 700;
  }

  &__main {
    text-align: center;
    padding-top: 4px;
  }

  &__title {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    line-height: 1.5;
    font-weight: 500;

    &--wait {
      color: var(--mosaic-text-placeholder);
      font-weight: 400;
    }

    &--process {
      color: var(--mosaic-primary);
    }

    &--finish {
      color: var(--mosaic-success);
    }

    &--error {
      color: var(--mosaic-danger);
    }

    &--success {
      color: var(--mosaic-success);
    }
  }

  &__description {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    line-height: 1.5;
    margin-top: 2px;

    &--wait {
      color: var(--mosaic-text-placeholder);
    }

    &--process {
      color: var(--mosaic-text-secondary);
    }

    &--finish {
      color: var(--mosaic-success);
    }

    &--error {
      color: var(--mosaic-danger);
    }
  }

  /* Connecting line between steps */
  &__line {
    position: absolute;
    background-color: var(--mosaic-border-color-light);
    overflow: hidden;
    transition: background-color var(--mosaic-transition-duration);

    &--finish {
      background-color: transparent;
    }

    &--process {
      background-color: transparent;
    }

    &--error {
      background-color: transparent;
    }
  }

  &__line-inner {
    width: 100%;
    height: 100%;
    background-color: var(--mosaic-border-color-light);
    transition: background-color var(--mosaic-transition-duration);
    transform-origin: left;

    &--finish,
    .m-step__line--finish & {
      background-color: var(--mosaic-success);
    }

    &--process,
    .m-step__line--process & {
      background-color: var(--mosaic-primary);
    }

    &--error,
    .m-step__line--error & {
      background-color: var(--mosaic-danger);
    }
  }

  /* Simple style */
  &--simple {
    .m-step__icon {
      width: 24px;
      height: 24px;
      border-width: 1px;
      font-size: var(--mosaic-font-size-sm);
    }

    .m-step__head {
      width: 24px;
      height: 24px;
    }

    .m-step__title {
      font-size: var(--mosaic-font-size-sm);
    }

    .m-step__description {
      font-size: 12px;
    }
  }
}
</style>