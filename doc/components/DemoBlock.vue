<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot />
    </div>
    <div class="demo-block__bottom">
      <div class="demo-block__actions">
        <button class="demo-block__btn" @click="copy" title="复制代码">
          <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span class="demo-block__btn-text">{{ copied ? '已复制' : '复制' }}</span>
        </button>
        <button class="demo-block__btn" @click="toggle" :title="expanded ? '收起代码' : '展开代码'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline v-if="expanded" points="18 15 12 9 6 15" />
            <polyline v-else points="6 9 12 15 18 9" />
          </svg>
          <span class="demo-block__btn-text">{{ expanded ? '收起' : '展开' }}</span>
        </button>
      </div>
      <div :class="['demo-block__code', { 'demo-block__code--expanded': expanded }]">
        <div class="demo-block__editor">
          <div class="demo-block__gutter">
            <span v-for="(_, i) in lines" :key="i">{{ i + 1 }}</span>
          </div>
          <div class="demo-block__source">
            <code v-html="highlighted"></code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'

// 注册 XML 语言以支持 HTML/Vue 模板语法高亮
hljs.registerLanguage('xml', xml)

const props = defineProps<{
  code: string  // 示例源码文本，用于展示和复制
}>()

const expanded = ref(false)   // 代码区域是否展开
const copied = ref(false)     // 是否已复制成功（用于按钮状态切换）

const lines = computed(() => props.code.split('\n'))                  // 源码行数组，用于生成行号
const highlighted = computed(() => hljs.highlight(props.code, { language: 'xml' }).value)  // 高亮后的 HTML

function toggle() {
  expanded.value = !expanded.value
}

function copy() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<style lang="scss">
.demo-block {
  margin-bottom: 0;
  border: 1px solid var(--mosaic-border-color);
  border-radius: 6px;

  &__preview {
    padding: 16px;
    display: flex;
    gap: 12px;
    flex-flow: column nowrap;
    overflow: visible;
  }

  &__bottom {
    overflow: hidden;
    border-radius: 0 0 6px 6px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 12px;
    background: #f8f6fd; 
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 28px;
    padding: 0 8px;
    border: 1px solid var(--mosaic-border-color);
    background: #fff;
    cursor: pointer;
    color: var(--mosaic-text-secondary);
    border-radius: 4px;
    font-size: 12px;
    transition: all 0.2s;

    &:hover {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }
  }

  &__btn-text {
    font-size: 12px;
    line-height: 1;
  }

  &__code {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;

    &--expanded {
      max-height: 600px;
      overflow-y: auto;
    }
  }

  &__editor {
    display: flex;
    background: #1e1e2e;
    border-top: 1px solid #313244;
    font-family: 'Menlo', 'Consolas', 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #cdd6f4;
  }

  &__gutter {
    flex-shrink: 0;
    padding: 16px 0;
    width: 40px;
    text-align: right;
    color: #585b70;
    user-select: none;
    border-right: 1px solid #313244;

    span {
      display: block;
      padding-right: 12px;
    }
  }

  &__source {
    flex: 1;
    padding: 16px 16px 16px 20px;
    overflow-x: auto;

    code {
      font-family: inherit;
      font-size: inherit;
      background: none;
      white-space: pre;
    }

    /* Catppuccin Mocha highlight.js theme overrides */
    .hljs-tag { color: #89b4fa; }
    .hljs-name { color: #f38ba8; }
    .hljs-attr { color: #a6e3a1; }
    .hljs-string { color: #f9e2af; }
    .hljs-comment { color: #585b70; font-style: italic; }
    .hljs-keyword { color: #cba6f7; }
    .hljs-title { color: #89b4fa; }
    .hljs-params { color: #fab387; }
  }
}
</style>