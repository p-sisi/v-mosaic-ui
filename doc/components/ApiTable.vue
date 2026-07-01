<template>
  <table class="doc-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in data" :key="i">
        <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const HEADER_MAP: Record<string, string[]> = {
  prop: ['属性', '类型', '默认值', '说明'],
  event: ['事件', '参数', '说明'],
  slot: ['插槽', '说明'],
  method: ['方法', '参数', '说明'],
}

const props = defineProps<{
  type: 'prop' | 'event' | 'slot' | 'method'
  data: string[][]
}>()

const headers = computed(() => HEADER_MAP[props.type])
</script>
