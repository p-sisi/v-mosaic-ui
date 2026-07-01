<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Container 布局容器</h1>
    <p class="doc-page__desc">用于布局的容器组件，方便快速搭建页面的整体结构。包含 MContainer、MHeader、MAside、MMain、MFooter 五个子组件。MHeader 设置 <code>height</code> 后固定在顶部，MAside 设置 <code>width</code> 后固定在侧边，MFooter 设置 <code>height</code> 后固定在底部，MMain 始终自适应剩余区域并滚动。</p>

    <div class="doc-grid">
      <div class="doc-section" id="header-main">
        <h2>1. Header + Main</h2>
        <p class="doc-page__hint">MHeader 设置 <code>height</code> 后始终固定在顶部，MMain 自适应剩余区域，内容超出时滚动。</p>
        <DemoBlock :code="headerMainCode">
          <MContainer class="demo-container">
            <MHeader class="demo-header" height="50px">Header</MHeader>
            <MMain class="demo-main">
              <p v-for="i in 12" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
            </MMain>
          </MContainer>
        </DemoBlock>
      </div>

      <div class="doc-section" id="aside-main-aside">
        <h2>4. Aside + Main + Aside</h2>
        <p class="doc-page__hint">左右两个 MAside 设置 <code>width</code> 后固定在两侧，中间 MMain 自适应剩余宽度。</p>
        <DemoBlock :code="asideMainAsideCode">
          <MContainer class="demo-container">
            <MAside class="demo-aside" width="100px">Aside Left</MAside>
            <MMain class="demo-main">
              <p v-for="i in 10" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
            </MMain>
            <MAside class="demo-aside" width="100px">Aside Right</MAside>
          </MContainer>
        </DemoBlock>
      </div>

      <div class="doc-section" id="header-main-footer">
        <h2>2. Header + Main + Footer</h2>
        <p class="doc-page__hint">MFooter 设置 <code>height</code> 则固定在底部不滚动；不设置 height 则跟随 Main 内容一起滚动。</p>
        <DemoBlock :code="headerMainFooterCode">
          <div class="demo-stack">
            <p class="demo-stack__label">Footer 固定底部（设置 height）</p>
            <MContainer class="demo-container">
              <MHeader class="demo-header" height="44px">Header</MHeader>
              <MMain class="demo-main">
                <p v-for="i in 10" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
              </MMain>
              <MFooter class="demo-footer" height="40px">Footer</MFooter>
            </MContainer>
            <p class="demo-stack__label">Footer 跟随滚动（不设置 height）</p>
            <MContainer class="demo-container">
              <MHeader class="demo-header" height="44px">Header</MHeader>
              <MMain class="demo-main">
                <p v-for="i in 8" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
                <MFooter class="demo-footer demo-footer--inline">Footer（跟随内容滚动）</MFooter>
              </MMain>
            </MContainer>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="header-aside-main">
        <h2>3. Header + Aside + Main</h2>
        <p class="doc-page__hint">两种排列方式：Aside 占满整高（与 Header 并排），或 Header 在顶部、Aside 在 Header 下方。Aside 设置 <code>width</code> 后固定在左侧不滚动。</p>
        <DemoBlock :code="headerAsideMainCode">
          <div class="demo-stack">
            <p class="demo-stack__label">Aside 占满整高</p>
            <MContainer class="demo-container">
              <MAside class="demo-aside" width="120px">Aside</MAside>
              <MContainer>
                <MHeader class="demo-header" height="44px">Header</MHeader>
                <MMain class="demo-main">
                  <p v-for="i in 10" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
                </MMain>
              </MContainer>
            </MContainer>
            <p class="demo-stack__label">Aside 位于 Header 下方</p>
            <MContainer class="demo-container">
              <MHeader class="demo-header" height="44px">Header</MHeader>
              <MContainer>
                <MAside class="demo-aside" width="120px">Aside</MAside>
                <MMain class="demo-main">
                  <p v-for="i in 10" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
                </MMain>
              </MContainer>
            </MContainer>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="with-footer">
        <h2>5. 带 Footer 的组合</h2>
        <p class="doc-page__hint">前面的布局都可以追加 MFooter，Footer 的宽度跟随 Main 内容区域（不覆盖 Aside）。</p>
        <DemoBlock :code="withFooterCode">
          <MContainer class="demo-container">
            <MHeader class="demo-header" height="44px">Header</MHeader>
            <MContainer>
              <MAside class="demo-aside" width="120px">Aside</MAside>
              <MContainer>
                <MMain class="demo-main">
                  <p v-for="i in 8" :key="i" class="demo-line">Main 内容行 {{ i }}</p>
                </MMain>
                <MFooter class="demo-footer" height="40px">Footer</MFooter>
              </MContainer>
            </MContainer>
          </MContainer>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MContainer Props</h3>
    <ApiTable type="prop" :data="DATA.containerProps" />

    <h3>MHeader Props</h3>
    <ApiTable type="prop" :data="DATA.headerProps" />

    <h3>MAside Props</h3>
    <ApiTable type="prop" :data="DATA.asideProps" />

    <h3>MFooter Props</h3>
    <ApiTable type="prop" :data="DATA.footerProps" />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const headerMainCode = `<MContainer style="height: 240px">
  <MHeader height="50px">Header</MHeader>
  <MMain>
    <p v-for="i in 12" :key="i">Main 内容行 {{ i }}</p>
  </MMain>
</MContainer>`

const headerMainFooterCode = `<!-- Footer 固定底部 -->
<MContainer style="height: 220px">
  <MHeader height="44px">Header</MHeader>
  <MMain>
    <p v-for="i in 10" :key="i">Main 内容行 {{ i }}</p>
  </MMain>
  <MFooter height="40px">Footer</MFooter>
</MContainer>

<!-- Footer 跟随滚动（不设置 height，放在 MMain 内部） -->
<MContainer style="height: 220px">
  <MHeader height="44px">Header</MHeader>
  <MMain>
    <p v-for="i in 8" :key="i">Main 内容行 {{ i }}</p>
    <MFooter>Footer（跟随内容滚动）</MFooter>
  </MMain>
</MContainer>`

const headerAsideMainCode = `<!-- Aside 占满整高 -->
<MContainer style="height: 240px">
  <MAside width="120px">Aside</MAside>
  <MContainer>
    <MHeader height="44px">Header</MHeader>
    <MMain>
      <p v-for="i in 10" :key="i">Main 内容行 {{ i }}</p>
    </MMain>
  </MContainer>
</MContainer>

<!-- Aside 位于 Header 下方 -->
<MContainer style="height: 240px">
  <MHeader height="44px">Header</MHeader>
  <MContainer>
    <MAside width="120px">Aside</MAside>
    <MMain>
      <p v-for="i in 10" :key="i">Main 内容行 {{ i }}</p>
    </MMain>
  </MContainer>
</MContainer>`

const asideMainAsideCode = `<MContainer style="height: 240px">
  <MAside width="100px">Aside Left</MAside>
  <MMain>
    <p v-for="i in 10" :key="i">Main 内容行 {{ i }}</p>
  </MMain>
  <MAside width="100px">Aside Right</MAside>
</MContainer>`

const withFooterCode = `<MContainer style="height: 260px">
  <MHeader height="44px">Header</MHeader>
  <MContainer>
    <MAside width="120px">Aside</MAside>
    <MContainer>
      <MMain>
        <p v-for="i in 8" :key="i">Main 内容行 {{ i }}</p>
      </MMain>
      <MFooter height="40px">Footer</MFooter>
    </MContainer>
  </MContainer>
</MContainer>`

const anchors = [
  { id: 'header-main', label: '1. Header + Main' },
  { id: 'header-main-footer', label: '2. Header + Main + Footer' },
  { id: 'header-aside-main', label: '3. Header + Aside + Main' },
  { id: 'aside-main-aside', label: '4. Aside + Main + Aside' },
  { id: 'with-footer', label: '5. 带 Footer 的组合' },
  { id: 'api', label: 'API' },
]

const DATA = {
  containerProps: [
    ['direction', 'horizontal | vertical', '—', '子元素布局方向，默认自动检测（包含 MAside 时为 horizontal）'],
  ],
  headerProps: [
    ['height', 'string', '60px', '顶栏高度，设置后固定在顶部'],
  ],
  asideProps: [
    ['width', 'string', '300px', '侧边栏宽度，设置后固定在侧边不滚动'],
  ],
  footerProps: [
    ['height', 'string', '—', '底栏高度，设置后固定在底部不滚动；不设置则跟随内容滚动'],
  ],
  slots: [
    ['default', '容器内容（MContainer / MHeader / MAside / MMain / MFooter 均支持）'],
  ],
}
</script>

<style scoped lang="scss">
.demo-container {
  flex: none;
  height: 240px;
  min-height: 0;
  border: 1px solid var(--mosaic-border-color);
  border-radius: 6px;
  overflow: hidden;
}

.demo-header {
  background-color: #b3c6d9;
  color: #1f2d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.demo-main {
  background-color: #e9eef3;
  color: #1f2d3d;
}

.demo-line {
  line-height: 28px;
  padding: 0 4px;
}

.demo-footer {
  background-color: #b3c6d9;
  color: #1f2d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  &--inline {
    margin: 12px -20px -20px;
  }
}

.demo-aside {
  background-color: #d3dce6;
  color: #1f2d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__label {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    margin: 0;
  }
}
</style>
