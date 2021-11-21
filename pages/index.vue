<template>
  <div class="homePage">
    <div class="homePage__sliderWrap">
      <div class="homePage__sliderWrap__slider">
        <div
          class="homePage__sliderWrap__slider__slide"
          v-for="i in slides"
          :key="i"
        >
          <img src="@/assets/images/HomePage/banner.webp" alt="">
          <div class="homePage__sliderWrap__slider__slide__inf">
            <h3>Yves Saint Laurent до −35%</h3>
            <p>только 11 и 12 сентября</p>
            <div class="homePage__sliderWrap__slider__slide__inf__btn">
              <p>Узнать подробнее</p>
              <RightArrow />
            </div>
          </div>
        </div>
      </div>
      <div class="homePage__sliderWrap__buttons">
        <div
          v-for="(i, index) in slides"
          :key="index"
          class="homePage__sliderWrap__buttons__btn"
          :class="{active: index}"
          @click="slide('0')"
        ></div>
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
  },
  data () {
    return {
      slides: [1, 2, 3, 4]
    }
  },
  methods: {
    slide (position) {
      document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(calc(${position}))`
      console.log(document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(calc(${position}))`)
    }
  }
}
</script>
