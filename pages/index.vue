<template>
  <div class="homePage">
    <div class="homePage__sliderWrap">
      <div class="homePage__sliderWrap__slider">
        <div
          class="homePage__sliderWrap__slider__slide"
          v-for="(i, index) in slides"
          :key="index"
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
          :class="{active: index == frontSlide}"
          @click="slide(index)"
        ></div>
      </div>
    </div>
    <div class="homePage__novelty">
      <h1 class="homePage__novelty__header">Новинки</h1>
      <div class="homePage__novelty__sliderWrap">
        <div class="homePage__novelty__sliderWrap__control">
          <RightArrow class="homePage__novelty__sliderWrap__control__left"/>
          <RightArrow class="homePage__novelty__sliderWrap__control__right"/>
        </div>
        <div class="homePage__novelty__sliderWrap__slider">
          <div class="homePage__novelty__sliderWrap__slider__slide">
            <div
              v-for="(product, index) in frontNovely"
              :key="index"
              class="homePage__novelty__sliderWrap__slider__slide__product"
            >
              <img :src="require(`@/assets/images/Novels/product${product}.png`)" alt="">
              <div
                class="homePage__novelty__sliderWrap__slider__slide__product__inf"
                :class="{left: index >= 2}"
              >
                <p class="homePage__novelty__sliderWrap__slider__slide__product__inf__about">НОЧНАЯ МАСКА ДЛЯ ЛИЦА</p>
                <h3 class="homePage__novelty__sliderWrap__slider__slide__product__inf__name">OMOROVICZA midnight radiance mask</h3>
                <p class="homePage__novelty__sliderWrap__slider__slide__product__inf__price">6 916 ₽</p>
              </div>
            </div>
          </div>
        </div>
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
      slides: [1, 2, 3, 4],
      frontSlide: 0,
      timer: 0,
      frontNovely: [1, 2, 3, 4]
    }
  },
  mounted () {
    this.timer = this.slideInterval()
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    slide (position) {
      document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(${position * -(window.innerWidth)}px)`
      this.frontSlide = position

      if (this.timer) {
        clearInterval(this.timer)
      }

      this.timer = this.slideInterval()
    },
    slideInterval () {
      const time = setInterval(() => {
        const lenOfSlide = this.slides.length
        this.frontSlide = this.frontSlide + 1
        if (this.frontSlide >= lenOfSlide) {
          this.frontSlide = 0
        }

        document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(${this.frontSlide * -(window.innerWidth)}px)`
      }, 5000)

      return time
    }
  }
}
</script>
