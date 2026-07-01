<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Result 结果</h1>
    <p class="doc-page__desc">用于反馈一系列操作任务的处理结果。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性设置结果类型，支持 success、warning、danger、info。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MResult type="success" title="成功" subTitle="操作已成功完成" />
            <MResult type="warning" title="警告" subTitle="请注意相关风险" />
          </div>
          <div class="doc-demo-group">
            <MResult type="danger" title="错误" subTitle="操作失败，请重试" />
            <MResult type="info" title="信息" subTitle="请查看相关说明" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-content">
        <h2>自定义标题与副标题</h2>
        <p class="doc-page__hint">通过 <code>title</code> 和 <code>subTitle</code> 属性自定义标题内容。</p>
        <DemoBlock :code="customContentCode">
          <MResult type="success" title="提交成功" subTitle="您的申请已提交，预计 3 个工作日内审核完成" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="extra-slot">
        <h2>额外操作区</h2>
        <p class="doc-page__hint">通过 <code>extra</code> 插槽添加操作按钮等额外内容。</p>
        <DemoBlock :code="extraSlotCode">
          <MResult type="success" title="操作成功">
            <template #extra>
              <MButton type="primary" size="small">返回列表</MButton>
              <MButton size="small">继续操作</MButton>
            </template>
          </MResult>
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

const basicCode = `<MResult type="success" title="成功" subTitle="操作已成功完成" />
<MResult type="warning" title="警告" subTitle="请注意相关风险" />
<MResult type="danger" title="错误" subTitle="操作失败，请重试" />
<MResult type="info" title="信息" subTitle="请查看相关说明" />`

const customContentCode = `<MResult
  type="success"
  title="提交成功"
  subTitle="您的申请已提交，预计 3 个工作日内审核完成"
/>`

const extraSlotCode = `<MResult type="success" title="操作成功">
  <template #extra>
    <MButton type="primary" size="small">返回列表</MButton>
    <MButton size="small">继续操作</MButton>
  </template>
</MResult>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'custom-content', label: '自定义标题与副标题' },
  { id: 'extra-slot', label: '额外操作区' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['type', 'success | warning | danger | info', 'info', '结果类型'],
    ['title', 'string', "''", '标题'],
    ['subTitle', 'string', "''", '副标题'],
  ],
  slots: [
    ['icon', '自定义图标内容'],
    ['extra', '额外操作区域'],
  ],
}
</script>