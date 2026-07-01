<template>
  <div :class="classes" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'

defineOptions({ name: 'MCol' })

type ColResponsive = number | { span?: number; offset?: number; push?: number; pull?: number }

const props = withDefaults(defineProps<{
  span?: number             // 栅格占据的列数
  offset?: number           // 栅格左侧的间隔格数
  push?: number             // 栅格向右移动格数
  pull?: number             // 栅格向左移动格数
  xs?: ColResponsive        // <576px 响应式栅格数或栅格属性对象
  sm?: ColResponsive        // >=576px 响应式栅格数或栅格属性对象
  md?: ColResponsive        // >=768px 响应式栅格数或栅格属性对象
  lg?: ColResponsive        // >=992px 响应式栅格数或栅格属性对象
  xl?: ColResponsive        // >=1200px 响应式栅格数或栅格属性对象
}>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
})

const rowContext = inject<{ gutter: ComputedRef<number> }>('mRow', { gutter: computed(() => 0) })

const classes = computed(() => {
  const cls: (string | Record<string, boolean>)[] = [
    'm-col',
    `m-col--${props.span}`,
  ]

  if (props.offset) cls.push(`m-col--offset-${props.offset}`)
  if (props.push) cls.push(`m-col--push-${props.push}`)
  if (props.pull) cls.push(`m-col--pull-${props.pull}`)

  // responsive classes
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  for (const size of sizes) {
    const val = props[size]
    if (val !== undefined) {
      if (typeof val === 'number') {
        cls.push(`m-col--${size}-${val}`)
      } else {
        if (val.span) cls.push(`m-col--${size}-${val.span}`)
        if (val.offset) cls.push(`m-col--${size}-offset-${val.offset}`)
        if (val.push) cls.push(`m-col--${size}-push-${val.push}`)
        if (val.pull) cls.push(`m-col--${size}-pull-${val.pull}`)
      }
    }
  }

  return cls
})

const colStyle = computed(() => {
  const gutter = rowContext.gutter.value
  if (gutter) {
    return {
      paddingLeft: `${gutter / 2}px`,
      paddingRight: `${gutter / 2}px`,
    }
  }
  return {}
})
</script>

<style lang="scss">
.m-col {
  float: left;
  box-sizing: border-box;

  &--0 { display: none; }
  &--1 { width: calc(1 / 24 * 100%); }
  &--2 { width: calc(2 / 24 * 100%); }
  &--3 { width: calc(3 / 24 * 100%); }
  &--4 { width: calc(4 / 24 * 100%); }
  &--5 { width: calc(5 / 24 * 100%); }
  &--6 { width: calc(6 / 24 * 100%); }
  &--7 { width: calc(7 / 24 * 100%); }
  &--8 { width: calc(8 / 24 * 100%); }
  &--9 { width: calc(9 / 24 * 100%); }
  &--10 { width: calc(10 / 24 * 100%); }
  &--11 { width: calc(11 / 24 * 100%); }
  &--12 { width: calc(12 / 24 * 100%); }
  &--13 { width: calc(13 / 24 * 100%); }
  &--14 { width: calc(14 / 24 * 100%); }
  &--15 { width: calc(15 / 24 * 100%); }
  &--16 { width: calc(16 / 24 * 100%); }
  &--17 { width: calc(17 / 24 * 100%); }
  &--18 { width: calc(18 / 24 * 100%); }
  &--19 { width: calc(19 / 24 * 100%); }
  &--20 { width: calc(20 / 24 * 100%); }
  &--21 { width: calc(21 / 24 * 100%); }
  &--22 { width: calc(22 / 24 * 100%); }
  &--23 { width: calc(23 / 24 * 100%); }
  &--24 { width: 100%; }

  &--offset-0 { margin-left: 0; }
  &--offset-1 { margin-left: calc(1 / 24 * 100%); }
  &--offset-2 { margin-left: calc(2 / 24 * 100%); }
  &--offset-3 { margin-left: calc(3 / 24 * 100%); }
  &--offset-4 { margin-left: calc(4 / 24 * 100%); }
  &--offset-5 { margin-left: calc(5 / 24 * 100%); }
  &--offset-6 { margin-left: calc(6 / 24 * 100%); }
  &--offset-7 { margin-left: calc(7 / 24 * 100%); }
  &--offset-8 { margin-left: calc(8 / 24 * 100%); }
  &--offset-9 { margin-left: calc(9 / 24 * 100%); }
  &--offset-10 { margin-left: calc(10 / 24 * 100%); }
  &--offset-11 { margin-left: calc(11 / 24 * 100%); }
  &--offset-12 { margin-left: calc(12 / 24 * 100%); }

  &--push-0 { left: 0; }
  &--push-1 { left: calc(1 / 24 * 100%); }
  &--push-2 { left: calc(2 / 24 * 100%); }
  &--push-3 { left: calc(3 / 24 * 100%); }
  &--push-4 { left: calc(4 / 24 * 100%); }
  &--push-5 { left: calc(5 / 24 * 100%); }
  &--push-6 { left: calc(6 / 24 * 100%); }
  &--push-7 { left: calc(7 / 24 * 100%); }
  &--push-8 { left: calc(8 / 24 * 100%); }
  &--push-9 { left: calc(9 / 24 * 100%); }
  &--push-10 { left: calc(10 / 24 * 100%); }
  &--push-11 { left: calc(11 / 24 * 100%); }
  &--push-12 { left: calc(12 / 24 * 100%); }
  &--push-13 { left: calc(13 / 24 * 100%); }
  &--push-14 { left: calc(14 / 24 * 100%); }
  &--push-15 { left: calc(15 / 24 * 100%); }
  &--push-16 { left: calc(16 / 24 * 100%); }
  &--push-17 { left: calc(17 / 24 * 100%); }
  &--push-18 { left: calc(18 / 24 * 100%); }
  &--push-19 { left: calc(19 / 24 * 100%); }
  &--push-20 { left: calc(20 / 24 * 100%); }
  &--push-21 { left: calc(21 / 24 * 100%); }
  &--push-22 { left: calc(22 / 24 * 100%); }
  &--push-23 { left: calc(23 / 24 * 100%); }
  &--push-24 { left: 100%; }

  &--pull-0 { right: 0; }
  &--pull-1 { right: calc(1 / 24 * 100%); }
  &--pull-2 { right: calc(2 / 24 * 100%); }
  &--pull-3 { right: calc(3 / 24 * 100%); }
  &--pull-4 { right: calc(4 / 24 * 100%); }
  &--pull-5 { right: calc(5 / 24 * 100%); }
  &--pull-6 { right: calc(6 / 24 * 100%); }
  &--pull-7 { right: calc(7 / 24 * 100%); }
  &--pull-8 { right: calc(8 / 24 * 100%); }
  &--pull-9 { right: calc(9 / 24 * 100%); }
  &--pull-10 { right: calc(10 / 24 * 100%); }
  &--pull-11 { right: calc(11 / 24 * 100%); }
  &--pull-12 { right: calc(12 / 24 * 100%); }
  &--pull-13 { right: calc(13 / 24 * 100%); }
  &--pull-14 { right: calc(14 / 24 * 100%); }
  &--pull-15 { right: calc(15 / 24 * 100%); }
  &--pull-16 { right: calc(16 / 24 * 100%); }
  &--pull-17 { right: calc(17 / 24 * 100%); }
  &--pull-18 { right: calc(18 / 24 * 100%); }
  &--pull-19 { right: calc(19 / 24 * 100%); }
  &--pull-20 { right: calc(20 / 24 * 100%); }
  &--pull-21 { right: calc(21 / 24 * 100%); }
  &--pull-22 { right: calc(22 / 24 * 100%); }
  &--pull-23 { right: calc(23 / 24 * 100%); }
  &--pull-24 { right: 100%; }

  /* xs: always applies (0px+) */
  &--xs-0 { display: none; width: 0; }
  &--xs-1 { display: block; width: calc(1 / 24 * 100%); }
  &--xs-2 { display: block; width: calc(2 / 24 * 100%); }
  &--xs-3 { display: block; width: calc(3 / 24 * 100%); }
  &--xs-4 { display: block; width: calc(4 / 24 * 100%); }
  &--xs-5 { display: block; width: calc(5 / 24 * 100%); }
  &--xs-6 { display: block; width: calc(6 / 24 * 100%); }
  &--xs-7 { display: block; width: calc(7 / 24 * 100%); }
  &--xs-8 { display: block; width: calc(8 / 24 * 100%); }
  &--xs-9 { display: block; width: calc(9 / 24 * 100%); }
  &--xs-10 { display: block; width: calc(10 / 24 * 100%); }
  &--xs-11 { display: block; width: calc(11 / 24 * 100%); }
  &--xs-12 { display: block; width: calc(12 / 24 * 100%); }
  &--xs-13 { display: block; width: calc(13 / 24 * 100%); }
  &--xs-14 { display: block; width: calc(14 / 24 * 100%); }
  &--xs-15 { display: block; width: calc(15 / 24 * 100%); }
  &--xs-16 { display: block; width: calc(16 / 24 * 100%); }
  &--xs-17 { display: block; width: calc(17 / 24 * 100%); }
  &--xs-18 { display: block; width: calc(18 / 24 * 100%); }
  &--xs-19 { display: block; width: calc(19 / 24 * 100%); }
  &--xs-20 { display: block; width: calc(20 / 24 * 100%); }
  &--xs-21 { display: block; width: calc(21 / 24 * 100%); }
  &--xs-22 { display: block; width: calc(22 / 24 * 100%); }
  &--xs-23 { display: block; width: calc(23 / 24 * 100%); }
  &--xs-24 { display: block; width: 100%; }

  &--xs-offset-0 { margin-left: 0; }
  &--xs-offset-1 { margin-left: calc(1 / 24 * 100%); }
  &--xs-offset-2 { margin-left: calc(2 / 24 * 100%); }
  &--xs-offset-3 { margin-left: calc(3 / 24 * 100%); }
  &--xs-offset-4 { margin-left: calc(4 / 24 * 100%); }
  &--xs-offset-5 { margin-left: calc(5 / 24 * 100%); }
  &--xs-offset-6 { margin-left: calc(6 / 24 * 100%); }
  &--xs-offset-7 { margin-left: calc(7 / 24 * 100%); }
  &--xs-offset-8 { margin-left: calc(8 / 24 * 100%); }
  &--xs-offset-9 { margin-left: calc(9 / 24 * 100%); }
  &--xs-offset-10 { margin-left: calc(10 / 24 * 100%); }
  &--xs-offset-11 { margin-left: calc(11 / 24 * 100%); }
  &--xs-offset-12 { margin-left: calc(12 / 24 * 100%); }

  /* sm: >=576px */
  @media (min-width: 576px) {
    &--sm-0 { display: none; width: 0; }
    &--sm-1 { display: block; width: calc(1 / 24 * 100%); }
    &--sm-2 { display: block; width: calc(2 / 24 * 100%); }
    &--sm-3 { display: block; width: calc(3 / 24 * 100%); }
    &--sm-4 { display: block; width: calc(4 / 24 * 100%); }
    &--sm-5 { display: block; width: calc(5 / 24 * 100%); }
    &--sm-6 { display: block; width: calc(6 / 24 * 100%); }
    &--sm-7 { display: block; width: calc(7 / 24 * 100%); }
    &--sm-8 { display: block; width: calc(8 / 24 * 100%); }
    &--sm-9 { display: block; width: calc(9 / 24 * 100%); }
    &--sm-10 { display: block; width: calc(10 / 24 * 100%); }
    &--sm-11 { display: block; width: calc(11 / 24 * 100%); }
    &--sm-12 { display: block; width: calc(12 / 24 * 100%); }
    &--sm-13 { display: block; width: calc(13 / 24 * 100%); }
    &--sm-14 { display: block; width: calc(14 / 24 * 100%); }
    &--sm-15 { display: block; width: calc(15 / 24 * 100%); }
    &--sm-16 { display: block; width: calc(16 / 24 * 100%); }
    &--sm-17 { display: block; width: calc(17 / 24 * 100%); }
    &--sm-18 { display: block; width: calc(18 / 24 * 100%); }
    &--sm-19 { display: block; width: calc(19 / 24 * 100%); }
    &--sm-20 { display: block; width: calc(20 / 24 * 100%); }
    &--sm-21 { display: block; width: calc(21 / 24 * 100%); }
    &--sm-22 { display: block; width: calc(22 / 24 * 100%); }
    &--sm-23 { display: block; width: calc(23 / 24 * 100%); }
    &--sm-24 { display: block; width: 100%; }

    &--sm-offset-0 { margin-left: 0; }
    &--sm-offset-1 { margin-left: calc(1 / 24 * 100%); }
    &--sm-offset-2 { margin-left: calc(2 / 24 * 100%); }
    &--sm-offset-3 { margin-left: calc(3 / 24 * 100%); }
    &--sm-offset-4 { margin-left: calc(4 / 24 * 100%); }
    &--sm-offset-5 { margin-left: calc(5 / 24 * 100%); }
    &--sm-offset-6 { margin-left: calc(6 / 24 * 100%); }
    &--sm-offset-7 { margin-left: calc(7 / 24 * 100%); }
    &--sm-offset-8 { margin-left: calc(8 / 24 * 100%); }
    &--sm-offset-9 { margin-left: calc(9 / 24 * 100%); }
    &--sm-offset-10 { margin-left: calc(10 / 24 * 100%); }
    &--sm-offset-11 { margin-left: calc(11 / 24 * 100%); }
    &--sm-offset-12 { margin-left: calc(12 / 24 * 100%); }
  }

  /* md: >=768px */
  @media (min-width: 768px) {
    &--md-0 { display: none; width: 0; }
    &--md-1 { display: block; width: calc(1 / 24 * 100%); }
    &--md-2 { display: block; width: calc(2 / 24 * 100%); }
    &--md-3 { display: block; width: calc(3 / 24 * 100%); }
    &--md-4 { display: block; width: calc(4 / 24 * 100%); }
    &--md-5 { display: block; width: calc(5 / 24 * 100%); }
    &--md-6 { display: block; width: calc(6 / 24 * 100%); }
    &--md-7 { display: block; width: calc(7 / 24 * 100%); }
    &--md-8 { display: block; width: calc(8 / 24 * 100%); }
    &--md-9 { display: block; width: calc(9 / 24 * 100%); }
    &--md-10 { display: block; width: calc(10 / 24 * 100%); }
    &--md-11 { display: block; width: calc(11 / 24 * 100%); }
    &--md-12 { display: block; width: calc(12 / 24 * 100%); }
    &--md-13 { display: block; width: calc(13 / 24 * 100%); }
    &--md-14 { display: block; width: calc(14 / 24 * 100%); }
    &--md-15 { display: block; width: calc(15 / 24 * 100%); }
    &--md-16 { display: block; width: calc(16 / 24 * 100%); }
    &--md-17 { display: block; width: calc(17 / 24 * 100%); }
    &--md-18 { display: block; width: calc(18 / 24 * 100%); }
    &--md-19 { display: block; width: calc(19 / 24 * 100%); }
    &--md-20 { display: block; width: calc(20 / 24 * 100%); }
    &--md-21 { display: block; width: calc(21 / 24 * 100%); }
    &--md-22 { display: block; width: calc(22 / 24 * 100%); }
    &--md-23 { display: block; width: calc(23 / 24 * 100%); }
    &--md-24 { display: block; width: 100%; }

    &--md-offset-0 { margin-left: 0; }
    &--md-offset-1 { margin-left: calc(1 / 24 * 100%); }
    &--md-offset-2 { margin-left: calc(2 / 24 * 100%); }
    &--md-offset-3 { margin-left: calc(3 / 24 * 100%); }
    &--md-offset-4 { margin-left: calc(4 / 24 * 100%); }
    &--md-offset-5 { margin-left: calc(5 / 24 * 100%); }
    &--md-offset-6 { margin-left: calc(6 / 24 * 100%); }
    &--md-offset-7 { margin-left: calc(7 / 24 * 100%); }
    &--md-offset-8 { margin-left: calc(8 / 24 * 100%); }
    &--md-offset-9 { margin-left: calc(9 / 24 * 100%); }
    &--md-offset-10 { margin-left: calc(10 / 24 * 100%); }
    &--md-offset-11 { margin-left: calc(11 / 24 * 100%); }
    &--md-offset-12 { margin-left: calc(12 / 24 * 100%); }
  }

  /* lg: >=992px */
  @media (min-width: 992px) {
    &--lg-0 { display: none; width: 0; }
    &--lg-1 { display: block; width: calc(1 / 24 * 100%); }
    &--lg-2 { display: block; width: calc(2 / 24 * 100%); }
    &--lg-3 { display: block; width: calc(3 / 24 * 100%); }
    &--lg-4 { display: block; width: calc(4 / 24 * 100%); }
    &--lg-5 { display: block; width: calc(5 / 24 * 100%); }
    &--lg-6 { display: block; width: calc(6 / 24 * 100%); }
    &--lg-7 { display: block; width: calc(7 / 24 * 100%); }
    &--lg-8 { display: block; width: calc(8 / 24 * 100%); }
    &--lg-9 { display: block; width: calc(9 / 24 * 100%); }
    &--lg-10 { display: block; width: calc(10 / 24 * 100%); }
    &--lg-11 { display: block; width: calc(11 / 24 * 100%); }
    &--lg-12 { display: block; width: calc(12 / 24 * 100%); }
    &--lg-13 { display: block; width: calc(13 / 24 * 100%); }
    &--lg-14 { display: block; width: calc(14 / 24 * 100%); }
    &--lg-15 { display: block; width: calc(15 / 24 * 100%); }
    &--lg-16 { display: block; width: calc(16 / 24 * 100%); }
    &--lg-17 { display: block; width: calc(17 / 24 * 100%); }
    &--lg-18 { display: block; width: calc(18 / 24 * 100%); }
    &--lg-19 { display: block; width: calc(19 / 24 * 100%); }
    &--lg-20 { display: block; width: calc(20 / 24 * 100%); }
    &--lg-21 { display: block; width: calc(21 / 24 * 100%); }
    &--lg-22 { display: block; width: calc(22 / 24 * 100%); }
    &--lg-23 { display: block; width: calc(23 / 24 * 100%); }
    &--lg-24 { display: block; width: 100%; }

    &--lg-offset-0 { margin-left: 0; }
    &--lg-offset-1 { margin-left: calc(1 / 24 * 100%); }
    &--lg-offset-2 { margin-left: calc(2 / 24 * 100%); }
    &--lg-offset-3 { margin-left: calc(3 / 24 * 100%); }
    &--lg-offset-4 { margin-left: calc(4 / 24 * 100%); }
    &--lg-offset-5 { margin-left: calc(5 / 24 * 100%); }
    &--lg-offset-6 { margin-left: calc(6 / 24 * 100%); }
    &--lg-offset-7 { margin-left: calc(7 / 24 * 100%); }
    &--lg-offset-8 { margin-left: calc(8 / 24 * 100%); }
    &--lg-offset-9 { margin-left: calc(9 / 24 * 100%); }
    &--lg-offset-10 { margin-left: calc(10 / 24 * 100%); }
    &--lg-offset-11 { margin-left: calc(11 / 24 * 100%); }
    &--lg-offset-12 { margin-left: calc(12 / 24 * 100%); }
  }

  /* xl: >=1200px */
  @media (min-width: 1200px) {
    &--xl-0 { display: none; width: 0; }
    &--xl-1 { display: block; width: calc(1 / 24 * 100%); }
    &--xl-2 { display: block; width: calc(2 / 24 * 100%); }
    &--xl-3 { display: block; width: calc(3 / 24 * 100%); }
    &--xl-4 { display: block; width: calc(4 / 24 * 100%); }
    &--xl-5 { display: block; width: calc(5 / 24 * 100%); }
    &--xl-6 { display: block; width: calc(6 / 24 * 100%); }
    &--xl-7 { display: block; width: calc(7 / 24 * 100%); }
    &--xl-8 { display: block; width: calc(8 / 24 * 100%); }
    &--xl-9 { display: block; width: calc(9 / 24 * 100%); }
    &--xl-10 { display: block; width: calc(10 / 24 * 100%); }
    &--xl-11 { display: block; width: calc(11 / 24 * 100%); }
    &--xl-12 { display: block; width: calc(12 / 24 * 100%); }
    &--xl-13 { display: block; width: calc(13 / 24 * 100%); }
    &--xl-14 { display: block; width: calc(14 / 24 * 100%); }
    &--xl-15 { display: block; width: calc(15 / 24 * 100%); }
    &--xl-16 { display: block; width: calc(16 / 24 * 100%); }
    &--xl-17 { display: block; width: calc(17 / 24 * 100%); }
    &--xl-18 { display: block; width: calc(18 / 24 * 100%); }
    &--xl-19 { display: block; width: calc(19 / 24 * 100%); }
    &--xl-20 { display: block; width: calc(20 / 24 * 100%); }
    &--xl-21 { display: block; width: calc(21 / 24 * 100%); }
    &--xl-22 { display: block; width: calc(22 / 24 * 100%); }
    &--xl-23 { display: block; width: calc(23 / 24 * 100%); }
    &--xl-24 { display: block; width: 100%; }

    &--xl-offset-0 { margin-left: 0; }
    &--xl-offset-1 { margin-left: calc(1 / 24 * 100%); }
    &--xl-offset-2 { margin-left: calc(2 / 24 * 100%); }
    &--xl-offset-3 { margin-left: calc(3 / 24 * 100%); }
    &--xl-offset-4 { margin-left: calc(4 / 24 * 100%); }
    &--xl-offset-5 { margin-left: calc(5 / 24 * 100%); }
    &--xl-offset-6 { margin-left: calc(6 / 24 * 100%); }
    &--xl-offset-7 { margin-left: calc(7 / 24 * 100%); }
    &--xl-offset-8 { margin-left: calc(8 / 24 * 100%); }
    &--xl-offset-9 { margin-left: calc(9 / 24 * 100%); }
    &--xl-offset-10 { margin-left: calc(10 / 24 * 100%); }
    &--xl-offset-11 { margin-left: calc(11 / 24 * 100%); }
    &--xl-offset-12 { margin-left: calc(12 / 24 * 100%); }
  }
}
</style>