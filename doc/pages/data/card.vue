<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Card 卡片</h1>
    <p class="doc-page__desc">将信息聚合在卡片容器中展示，支持多种阴影模式和自定义内容。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MCard</code> 包裹内容，通过 <code>header</code> 属性或 <code>#header</code> 插槽设置标题。</p>
        <DemoBlock :code="basicCode">
          <MCard style="max-width: 360px;">
            <template #header>卡片标题</template>
            卡片正文内容
          </MCard>
        </DemoBlock>
      </div>

      <div class="doc-section" id="slots">
        <h2>header / content / footer 插槽</h2>
        <p class="doc-page__hint">通过 <code>#header</code>、<code>#content</code>、<code>#footer</code> 三个具名插槽分别控制三个区域的展示，不传入则不展示对应区域。</p>
        <DemoBlock :code="slotsCode">
          <MCard style="max-width: 400px;">
            <template #header>卡片标题</template>
            <template #content>
              <p>这是卡片正文内容区域，通过 <code>#content</code> 插槽传入。</p>
              <p>可以放置任意内容。</p>
            </template>
            <template #footer>
              <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <MButton size="small">取消</MButton>
                <MButton size="small" type="primary">确定</MButton>
              </div>
            </template>
          </MCard>
        </DemoBlock>
      </div>

      <div class="doc-section" id="shadow">
        <h2>阴影模式</h2>
        <p class="doc-page__hint">通过 <code>shadow</code> 属性设置卡片阴影显示时机。</p>
        <DemoBlock :code="shadowCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MCard shadow="always" style="max-width: 220px;">
              <template #header>always</template>
              <template #content>始终显示阴影</template>
            </MCard>
            <MCard shadow="hover" style="max-width: 220px;">
              <template #header>hover</template>
              <template #content>悬停时显示阴影</template>
            </MCard>
            <MCard shadow="never" style="max-width: 220px;">
              <template #header>never</template>
              <template #content>从不显示阴影</template>
            </MCard>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MCard style="max-width: 360px;">
  <template #header>卡片标题</template>
  <template #content>卡片正文内容</template>
</MCard>`

const slotsCode = `<MCard style="max-width: 400px;">
  <template #header>卡片标题</template>
  <template #content>
    <p>这是卡片正文内容区域，通过 #content 插槽传入。</p>
    <p>可以放置任意内容。</p>
  </template>
  <template #footer>
    <div style="display: flex; justify-content: flex-end; gap: 8px;">
      <MButton size="small">取消</MButton>
      <MButton size="small" type="primary">确定</MButton>
    </div>
  </template>
</MCard>`

const shadowCode = `<MCard shadow="always" style="max-width: 220px;">
  <template #header>always</template>
  <template #content>始终显示阴影</template>
</MCard>

<MCard shadow="hover" style="max-width: 220px;">
  <template #header>hover</template>
  <template #content>悬停时显示阴影</template>
</MCard>

<MCard shadow="never" style="max-width: 220px;">
  <template #header>never</template>
  <template #content>从不显示阴影</template>
</MCard>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'slots', label: '三区域插槽' },
  { id: 'shadow', label: '阴影模式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['header', 'string', '—', '卡片标题'],
    ['shadow', 'always | hover | never', 'always', '卡片阴影显示时机'],
    ['bodyStyle', 'object', '{ padding: 20px }', 'body 自定义样式'],
  ],
  slots: [
    ['header', '卡片标题区域，不传入则不展示'],
    ['content', '卡片正文区域，不传入则回退到默认插槽'],
    ['footer', '卡片底部区域，不传入则不展示'],
    ['default', '默认插槽，当未提供 content 插槽时作为正文内容'],
  ],
}
</script>
