<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Statistic 统计数值</h1>
    <p class="doc-page__desc">突出展示某个或一组数字，常用于数据概览。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>title</code> 和 <code>value</code> 属性设置标题和数值。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MStatistic title="活跃用户" :value="268500" />
            <MStatistic title="总营收" :value="92000" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="prefix-suffix">
        <h2>前缀与后缀</h2>
        <p class="doc-page__hint">通过 <code>prefix</code> 和 <code>suffix</code> 属性或插槽添加前缀和后缀。</p>
        <DemoBlock :code="prefixSuffixCode">
          <div class="doc-demo-group">
            <MStatistic title="总资产" prefix="¥" :value="88888" />
            <MStatistic title="增长率" :value="12.5" suffix="%" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="precision">
        <h2>数值精度</h2>
        <p class="doc-page__hint"><code>precision</code> 属性设置小数位数。</p>
        <DemoBlock :code="precisionCode">
          <div class="doc-demo-group">
            <MStatistic title="转化率" :value="88.5678" :precision="2" suffix="%" />
            <MStatistic title="金额" prefix="¥" :value="1234.5" :precision="2" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="separator-info">
        <h2>千分位与提示信息</h2>
        <p class="doc-page__hint"><code>separator</code> 属性开启千分位分隔，<code>info</code> 属性在标题旁显示提示图标，hover 显示提示内容。</p>
        <DemoBlock :code="separatorInfoCode">
          <div class="doc-demo-group">
            <MStatistic title="总营收" :value="1234567.89" :precision="2" separator prefix="¥" info="含税金额，单位：元" />
            <MStatistic title="活跃用户" :value="268500" separator info="截至昨日 24:00 的去重数据" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="trend">
        <h2>增长趋势</h2>
        <p class="doc-page__hint">通过 <code>trend</code> 属性显示增长/减少趋势（绿色上三角/红色下三角），<code>trendValue</code> 为趋势数值，<code>trendLabel</code> 为趋势标签；<code>#footer</code> 插槽可完全自定义底部内容。</p>
        <DemoBlock :code="trendCode">
          <div class="doc-demo-group">
            <MStatistic title="本周销售额" :value="92860" prefix="¥" trend-label="较昨日" trend-value="+12.5%" :trend="true" info="含税金额，单位：元"/>
            <MStatistic title="本周退单数" :value="132" trend-label="较昨日" trend-value="-8.3%" :trend="false" info="含税金额，单位：元" />
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
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MStatistic title="活跃用户" :value="268500" />
<MStatistic title="总营收" :value="92000" />`

const prefixSuffixCode = `<MStatistic title="总资产" prefix="¥" :value="88888" />
<MStatistic title="增长率" :value="12.5" suffix="%" />`

const precisionCode = `<MStatistic title="转化率" :value="88.5678" :precision="2" suffix="%" />
<MStatistic title="金额" prefix="¥" :value="1234.5" :precision="2" />`

const separatorInfoCode = `<MStatistic title="总营收" :value="1234567.89" :precision="2" separator prefix="¥" info="含税金额，单位：元" />
<MStatistic title="活跃用户" :value="268500" separator info="截至昨日 24:00 的去重数据" />`

const trendCode = `<MStatistic title="本周销售额" :value="92860" prefix="¥" trend-label="同比" trend-value="+12.5%" :trend="true" />
<MStatistic title="本周退单数" :value="132" trend-label="同比" trend-value="-8.3%" :trend="false" />
<MStatistic title="活跃用户" :value="268500">
  <template #footer>
    <span style="font-size: 12px; color: var(--mosaic-text-secondary);">数据更新于 2026-06-24</span>
  </template>
</MStatistic>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'prefix-suffix', label: '前缀与后缀' },
  { id: 'precision', label: '数值精度' },
  { id: 'separator-info', label: '千分位与提示信息' },
  { id: 'trend', label: '增长趋势' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', "''", '统计项标题'],
    ['value', 'number | string', "''", '统计数值'],
    ['precision', 'number', '—', '数值精度（小数位数）'],
    ['prefix', 'string', "''", '数值前缀，如货币符号'],
    ['suffix', 'string', "''", '数值后缀，如单位'],
    ['info', 'string', "''", '标题旁提示信息，hover 图标显示'],
    ['separator', 'boolean', 'false', '是否启用千分位分隔'],
    ['trend', 'boolean', '—', '增长情况，true 为增长（绿色上三角），false 为减少（红色下三角）'],
    ['trendLabel', 'string', "''", '趋势标签，展示在趋势数值左侧，如"同比"'],
    ['trendValue', 'string', "''", '趋势数值字符串，展示在三角图标左侧，颜色随趋势变化'],
  ],
  slots: [
    ['title', '自定义标题内容'],
    ['prefix', '自定义前缀内容'],
    ['suffix', '自定义后缀内容'],
    ['footer', '底部内容，自定义数字下方内容'],
  ],
}
</script>