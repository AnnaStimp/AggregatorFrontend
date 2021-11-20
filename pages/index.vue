<template>
  <div class="homePage">
    <div class="homePage__sliderWrap">
      <div class="homePage__sliderWrap__slide">
        <img src="@/assets/images/HomePage/banner.webp" alt="">
        <div class="homePage__sliderWrap__slide__inf">
          <h3>Yves Saint Laurent до −35%</h3>
          <p>только 11 и 12 сентября</p>
          <div class="homePage__sliderWrap__slide__inf__btn">
            <p>Узнать подробнее</p>
            <RightArrow />
          </div>
        </div>
      </div>
      <div class="homePage__sliderWrap__buttons">
        <div class="homePage__sliderWrap__buttons__btn"></div>
        <div class="homePage__sliderWrap__buttons__btn"></div>
        <div class="homePage__sliderWrap__buttons__btn"></div>
      </div>
    </div>
  </div>
</template>

<script>

import './homePage.scss'
import RightArrow from '@/components/SVG/rightArrow.vue'

export default {
  name: 'HomePage',
  components: {
    RightArrow
  }
}
</script>
