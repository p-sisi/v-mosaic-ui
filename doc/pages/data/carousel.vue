<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Carousel 走马灯</h1>
    <p class="doc-page__desc">在有限空间内循环播放同一类型的图片或文字内容。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MCarousel</code> 和 <code>MCarouselItem</code> 组合，默认自动轮播并循环。</p>
        <DemoBlock :code="basicCode">
          <MCarousel height="200px" style="width: 100%;">
            <MCarouselItem v-for="img in images" :key="img.id">
              <img :src="img.url" class="demo-carousel-img" />
            </MCarouselItem>
          </MCarousel>
        </DemoBlock>
      </div>

      <div class="doc-section" id="loop">
        <h2>循环切换</h2>
        <p class="doc-page__hint">通过 <code>loop</code> 属性控制是否循环切换，默认为 <code>true</code>，可顺滑反复循环所有图片。</p>
        <DemoBlock :code="loopCode">
          <MCarousel height="200px" :interval="2000" loop style="width: 100%;">
            <MCarouselItem v-for="img in images" :key="img.id">
              <img :src="img.url" class="demo-carousel-img" />
            </MCarouselItem>
          </MCarousel>
        </DemoBlock>
      </div>

      <div class="doc-section" id="card">
        <h2>卡片模式</h2>
        <p class="doc-page__hint">设置 <code>type="card"</code> 为卡片模式，两侧展示前后幻灯片。</p>
        <DemoBlock :code="cardCode">
          <MCarousel height="200px" :interval="2000" type="card" style="width: 100%;">
            <MCarouselItem v-for="img in images" :key="img.id">
              <img :src="img.url" class="demo-carousel-img" />
            </MCarouselItem>
          </MCarousel>
        </DemoBlock>
      </div>

      
      <div class="doc-section" id="direction">
        <h2>垂直方向</h2>
        <p class="doc-page__hint">设置 <code>direction="vertical"</code> 改为垂直滚动，切换箭头自动变为上下方向。</p>
        <DemoBlock :code="verticalCode">
          <MCarousel height="240px" direction="vertical" style="width: 100%;">
            <MCarouselItem v-for="img in images" :key="img.id">
              <img :src="img.url" class="demo-carousel-img" />
            </MCarouselItem>
          </MCarousel>
        </DemoBlock>
      </div>

      <div class="doc-section" id="indicator">
        <h2>指示器位置</h2>
        <p class="doc-page__hint">通过 <code>indicator-position</code> 设置指示器位置：<code>outside</code>（默认）显示在图片下方，<code>inside</code> 叠加在图片上，<code>none</code> 不显示。</p>
        <DemoBlock :code="outsideCode">
          <div class="doc-demo-group">
            <MCarousel height="200px" indicator-position="outside" style="width: 100%;">
              <MCarouselItem v-for="img in images" :key="img.id">
                <img :src="img.url" class="demo-carousel-img" />
              </MCarouselItem>
            </MCarousel>
          </div>
          <div class="doc-demo-group">
            <MCarousel height="200px" indicator-position="inside" style="width: 100%;">
              <MCarouselItem v-for="img in images" :key="img.id">
                <img :src="img.url" class="demo-carousel-img" />
              </MCarouselItem>
            </MCarousel>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="arrow">
        <h2>切换箭头</h2>
        <p class="doc-page__hint">通过 <code>arrow</code> 控制左右切换箭头：<code>hover</code>（默认）悬停时显示，<code>always</code> 始终显示，<code>never</code> 始终隐藏。</p>
        <DemoBlock :code="arrowAlwaysCode">
          <div class="doc-demo-group">
            <MCarousel height="200px" arrow="always" style="width: 100%;">
              <MCarouselItem v-for="img in images" :key="img.id">
                <img :src="img.url" class="demo-carousel-img" />
              </MCarouselItem>
            </MCarousel>
          </div>
          <div class="doc-demo-group">
            <MCarousel height="200px" arrow="never" style="width: 100%;">
              <MCarouselItem v-for="img in images" :key="img.id">
                <img :src="img.url" class="demo-carousel-img" />
              </MCarouselItem>
            </MCarousel>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MCarousel Props</h3>
    <ApiTable type="prop" :data="DATA.carouselProps" />
    <h3>MCarousel Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const images = [
  { id: 1, url: 'https://picsum.photos/seed/mosaic1/600/200' },
  { id: 2, url: 'https://picsum.photos/seed/mosaic2/600/200' },
  { id: 3, url: 'https://picsum.photos/seed/mosaic3/600/200' },
  { id: 4, url: 'https://picsum.photos/seed/mosaic4/600/200' },
]

const basicCode = `<MCarousel height="200px">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const loopCode = `<MCarousel height="200px" :interval="2000" loop>
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const cardCode = `<MCarousel height="200px" :interval="2000" type="card">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const outsideCode = `<MCarousel height="200px" indicator-position="outside">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>

<MCarousel height="200px" indicator-position="inside" style="width: 100%;">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const insideCode = `<MCarousel height="200px" indicator-position="inside">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const arrowAlwaysCode = `<MCarousel height="200px" arrow="always">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const arrowNeverCode = `<MCarousel height="200px" arrow="never">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const verticalCode = `<MCarousel height="240px" direction="vertical">
  <MCarouselItem v-for="img in images" :key="img.id">
    <img :src="img.url" style="width: 100%; height: 100%; object-fit: cover;" />
  </MCarouselItem>
</MCarousel>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'loop', label: '循环切换' },
  { id: 'card', label: '卡片模式' },
  { id: 'indicator', label: '指示器位置' },
  { id: 'arrow', label: '切换箭头' },
  { id: 'direction', label: '垂直方向' },
  { id: 'api', label: 'API' },
]

const DATA = {
  carouselProps: [
    ['height', 'string', '—', '走马灯高度'],
    ['autoplay', 'boolean', 'true', '是否自动切换'],
    ['interval', 'number', '3000', '自动切换间隔（ms）'],
    ['type', 'default | card', 'default', '展示类型'],
    ['direction', 'horizontal | vertical', 'horizontal', '滚动方向'],
    ['loop', 'boolean', 'true', '是否循环显示，开启后可顺滑反复循环'],
    ['initialIndex', 'number', '0', '初始激活项索引'],
    ['indicatorPosition', 'outside | inside | none', 'outside', '指示器位置'],
    ['arrow', 'always | hover | never', 'hover', '切换箭头显示时机'],
  ],
  events: [
    ['change', 'number', '幻灯片切换时触发，参数为新索引'],
  ],
}
</script>

<style scoped lang="scss">
.demo-carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
