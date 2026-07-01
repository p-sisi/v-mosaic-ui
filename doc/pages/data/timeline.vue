<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Timeline 时间线</h1>
    <p class="doc-page__desc">可视化地展示时间流信息，支持自定义颜色、类型、时间戳、位置和反转。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MTimeline</code> 和 <code>MTimelineItem</code> 组合展示时间线。</p>
        <DemoBlock code='<MTimeline>
  <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
  <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
</MTimeline>'>
          <MTimeline>
            <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
            <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
            <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
          </MTimeline>
        </DemoBlock>
      </div>

      <div class="doc-section" id="type">
        <h2>自定义类型与颜色</h2>
        <p class="doc-page__hint">通过 <code>type</code> 设置节点类型，<code>color</code> 自定义颜色，<code>hollow</code> 设为空心。</p>
        <DemoBlock :code="typeCode">
          <MTimeline>
            <MTimelineItem type="primary" timestamp="2024-01-15">主要节点</MTimelineItem>
            <MTimelineItem type="success" timestamp="2024-01-20">成功节点</MTimelineItem>
            <MTimelineItem type="warning" timestamp="2024-01-25">警告节点</MTimelineItem>
            <MTimelineItem type="danger" timestamp="2024-01-30">危险节点</MTimelineItem>
            <MTimelineItem color="#8b5cf6" timestamp="2024-02-01">自定义颜色</MTimelineItem>
            <MTimelineItem hollow timestamp="2024-02-05">空心节点</MTimelineItem>
          </MTimeline>
        </DemoBlock>
      </div>

      <div class="doc-section" id="position">
        <h2>内容位置</h2>
        <p class="doc-page__hint">通过 <code>position</code> 属性设置内容展示位置：<code>left</code>（默认）、<code>right</code>、<code>alternating</code>（左右交替）。</p>
        <DemoBlock :code="positionCode">
          <div class="doc-demo-group">
            <MTimeline position="right">
              <MTimelineItem timestamp="2024-01-15">右侧展示 - 创建项目</MTimelineItem>
              <MTimelineItem timestamp="2024-01-20">右侧展示 - 通过审核</MTimelineItem>
              <MTimelineItem timestamp="2024-02-01">右侧展示 - 活动上线</MTimelineItem>
            </MTimeline>
            <MTimeline position="alternating">
              <MTimelineItem timestamp="2024-01-15">交替展示 - 创建项目</MTimelineItem>
              <MTimelineItem timestamp="2024-01-20">交替展示 - 通过审核</MTimelineItem>
              <MTimelineItem timestamp="2024-01-25">交替展示 - 功能开发</MTimelineItem>
              <MTimelineItem timestamp="2024-02-01">交替展示 - 活动上线</MTimelineItem>
            </MTimeline>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="reverse">
        <h2>反转排序</h2>
        <p class="doc-page__hint">设置 <code>reverse</code> 属性可反转节点排列顺序。左侧为正序，右侧为倒序。</p>
        <DemoBlock :code="reverseCode">
          <div class="doc-demo-group">
            <MTimeline>
              <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
              <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
              <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
            </MTimeline>
            <MTimeline reverse>
              <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
              <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
              <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
            </MTimeline>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="timestamp">
        <h2>自定义时间戳</h2>
        <p class="doc-page__hint">通过 <code>placement</code> 控制时间戳位置（上方或下方）。</p>
        <DemoBlock code='<MTimeline>
  <MTimelineItem timestamp="2024-01-15" placement="top">
    时间戳在上方
  </MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">
    时间戳在下方
  </MTimelineItem>
</MTimeline>'>
          <MTimeline>
            <MTimelineItem timestamp="2024-01-15" placement="top">
              时间戳在上方
            </MTimelineItem>
            <MTimelineItem timestamp="2024-01-20">
              时间戳在下方
            </MTimelineItem>
          </MTimeline>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MTimeline Props</h3>
    <ApiTable type="prop" :data="DATA.timelineProps" />
    <h3>MTimelineItem Props</h3>
    <ApiTable type="prop" :data="DATA.timelineItemProps" />
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const typeCode = `<MTimeline>
  <MTimelineItem type="primary" timestamp="2024-01-15">主要节点</MTimelineItem>
  <MTimelineItem type="success" timestamp="2024-01-20">成功节点</MTimelineItem>
  <MTimelineItem type="warning" timestamp="2024-01-25">警告节点</MTimelineItem>
  <MTimelineItem type="danger" timestamp="2024-01-30">危险节点</MTimelineItem>
  <MTimelineItem color="#8b5cf6" timestamp="2024-02-01">自定义颜色</MTimelineItem>
  <MTimelineItem hollow timestamp="2024-02-05">空心节点</MTimelineItem>
</MTimeline>`

const positionCode = `<MTimeline position="right">
  <MTimelineItem timestamp="2024-01-15">右侧展示</MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">右侧展示</MTimelineItem>
</MTimeline>

<MTimeline position="alternating">
  <MTimelineItem timestamp="2024-01-15">交替展示</MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">交替展示</MTimelineItem>
  <MTimelineItem timestamp="2024-01-25">交替展示</MTimelineItem>
  <MTimelineItem timestamp="2024-02-01">交替展示</MTimelineItem>
</MTimeline>`

const reverseCode = `<MTimeline>
  <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
  <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
</MTimeline>

<MTimeline reverse>
  <MTimelineItem timestamp="2024-01-15">创建项目</MTimelineItem>
  <MTimelineItem timestamp="2024-01-20">通过审核</MTimelineItem>
  <MTimelineItem timestamp="2024-02-01">活动上线</MTimelineItem>
</MTimeline>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'type', label: '自定义类型与颜色' },
  { id: 'position', label: '内容位置' },
  { id: 'reverse', label: '反转排序' },
  { id: 'timestamp', label: '自定义时间戳' },
  { id: 'api', label: 'API' },
]

const DATA = {
  timelineProps: [
    ['reverse', 'boolean', 'false', '是否倒序排列节点'],
    ['position', 'left | right | alternating', 'left', '内容展示位置'],
  ],
  timelineItemProps: [
    ['timestamp', 'string', '—', '时间戳'],
    ['placement', 'top | bottom', 'bottom', '时间戳位置'],
    ['type', 'primary | success | warning | danger | info', '—', '节点类型'],
    ['color', 'string', '—', '节点自定义颜色'],
    ['hollow', 'boolean', 'false', '是否为空心节点'],
    ['size', 'normal | large', 'normal', '节点尺寸'],
  ],
}
</script>
