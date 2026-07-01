<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Dropdown 下拉菜单</h1>
    <p class="doc-page__desc">将动作或菜单折叠到下拉菜单中，支持多种触发方式和交互模式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MDropdown</code> 包裹触发元素和 <code>MDropdownMenu</code>，默认 hover 触发。</p>
        <DemoBlock :code="basicCode">
          <MDropdown>
            <MButton>下拉菜单</MButton>
            <template #dropdown>
              <MDropdownMenu>
                <MDropdownItem>黄金糕</MDropdownItem>
                <MDropdownItem>狮子头</MDropdownItem>
                <MDropdownItem>螺蛳粉</MDropdownItem>
                <MDropdownItem divided>双皮奶</MDropdownItem>
              </MDropdownMenu>
            </template>
          </MDropdown>
        </DemoBlock>
      </div>

      <div class="doc-section" id="trigger">
        <h2>触发方式</h2>
        <p class="doc-page__hint">通过 <code>trigger</code> 属性设置触发方式：<code>hover</code>（默认）或 <code>click</code>。</p>
        <DemoBlock :code="triggerCode">
          <div class="doc-demo-group">
            <MDropdown trigger="hover">
              <MButton>Hover 触发</MButton>
              <template #dropdown>
                <MDropdownMenu>
                  <MDropdownItem>黄金糕</MDropdownItem>
                  <MDropdownItem>狮子头</MDropdownItem>
                  <MDropdownItem>螺蛳粉</MDropdownItem>
                </MDropdownMenu>
              </template>
            </MDropdown>
            <MDropdown trigger="click">
              <MButton>Click 触发</MButton>
              <template #dropdown>
                <MDropdownMenu>
                  <MDropdownItem>黄金糕</MDropdownItem>
                  <MDropdownItem>狮子头</MDropdownItem>
                  <MDropdownItem>螺蛳粉</MDropdownItem>
                </MDropdownMenu>
              </template>
            </MDropdown>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="split">
        <h2>分裂按钮</h2>
        <p class="doc-page__hint"><code>split-button</code> 实现分裂按钮模式，左侧主按钮独立点击，右侧箭头展开菜单。</p>
        <DemoBlock :code="splitCode">
          <MDropdown split-button type="primary">
            更多菜单
            <template #dropdown>
              <MDropdownMenu>
                <MDropdownItem>黄金糕</MDropdownItem>
                <MDropdownItem>狮子头</MDropdownItem>
              </MDropdownMenu>
            </template>
          </MDropdown>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性自定义菜单项 hover 高亮颜色。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MDropdown color="#13ce66">
              <MButton>绿色高亮</MButton>
              <template #dropdown>
                <MDropdownMenu>
                  <MDropdownItem>黄金糕</MDropdownItem>
                  <MDropdownItem>狮子头</MDropdownItem>
                  <MDropdownItem>螺蛳粉</MDropdownItem>
                </MDropdownMenu>
              </template>
            </MDropdown>
            <MDropdown color="#ff4949">
              <MButton>红色高亮</MButton>
              <template #dropdown>
                <MDropdownMenu>
                  <MDropdownItem>黄金糕</MDropdownItem>
                  <MDropdownItem>狮子头</MDropdownItem>
                  <MDropdownItem>螺蛳粉</MDropdownItem>
                </MDropdownMenu>
              </template>
            </MDropdown>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="command">
        <h2>指令与禁用</h2>
        <p class="doc-page__hint">通过 <code>command</code> 属性为菜单项指定指令值，设置 <code>disabled</code> 禁用菜单项。</p>
        <DemoBlock :code="commandCode">
          <MDropdown @command="handleCommand">
            <MButton>下拉菜单</MButton>
            <template #dropdown>
              <MDropdownMenu>
                <MDropdownItem command="a">黄金糕</MDropdownItem>
                <MDropdownItem command="b" disabled>狮子头（禁用）</MDropdownItem>
                <MDropdownItem command="c">螺蛳粉</MDropdownItem>
              </MDropdownMenu>
            </template>
          </MDropdown>
          <span class="demo-event-result">{{ commandMsg }}</span>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MDropdown Props</h3>
    <ApiTable type="prop" :data="DATA.dropdownProps" />
    <h3>MDropdownItem Props</h3>
    <ApiTable type="prop" :data="DATA.dropdownItemProps" />
    <h3>MDropdown Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const commandMsg = ref('')
function handleCommand(cmd: string) {
  commandMsg.value = `command: ${cmd}`
  setTimeout(() => { commandMsg.value = '' }, 2000)
}

const basicCode = `<MDropdown>
  <MButton>下拉菜单</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
      <MDropdownItem>螺蛳粉</MDropdownItem>
      <MDropdownItem divided>双皮奶</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>`

const triggerCode = `<!-- hover 触发（默认） -->
<MDropdown trigger="hover">
  <MButton>Hover 触发</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>

<!-- click 触发 -->
<MDropdown trigger="click">
  <MButton>Click 触发</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>`

const splitCode = `<MDropdown split-button type="primary">
  更多菜单
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>`

const colorCode = `<MDropdown color="#13ce66">
  <MButton>绿色高亮</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>

<MDropdown color="#ff4949">
  <MButton>红色高亮</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem>黄金糕</MDropdownItem>
      <MDropdownItem>狮子头</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>`

const commandCode = `<MDropdown @command="handleCommand">
  <MButton>下拉菜单</MButton>
  <template #dropdown>
    <MDropdownMenu>
      <MDropdownItem command="a">黄金糕</MDropdownItem>
      <MDropdownItem command="b" disabled>狮子头（禁用）</MDropdownItem>
      <MDropdownItem command="c">螺蛳粉</MDropdownItem>
    </MDropdownMenu>
  </template>
</MDropdown>

<script setup>
const commandMsg = ref('')
function handleCommand(cmd) {
  commandMsg.value = 'command: ' + cmd
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'trigger', label: '触发方式' },
  { id: 'split', label: '分裂按钮' },
  { id: 'color', label: '自定义颜色' },
  { id: 'command', label: '指令与禁用' },
  { id: 'api', label: 'API' },
]

const DATA = {
  dropdownProps: [
    ['trigger', 'hover | click', 'hover', '触发方式'],
    ['splitButton', 'boolean', 'false', '是否为分裂按钮模式'],
    ['hideOnClick', 'boolean', 'true', '点击菜单项后是否隐藏下拉'],
    ['placement', 'string', 'bottom-end', '菜单弹出位置'],
    ['color', 'string', '—', '菜单项高亮颜色'],
  ],
  dropdownItemProps: [
    ['command', 'string | number | object', '—', '指令值，点击时由 dropdown 的 command 事件抛出'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['divided', 'boolean', 'false', '是否显示分隔线'],
  ],
  events: [
    ['command', 'string | number | object', '点击菜单项时触发，参数为对应 item 的 command'],
    ['visible-change', 'boolean', '下拉菜单出现/隐藏时触发'],
  ],
}
</script>
