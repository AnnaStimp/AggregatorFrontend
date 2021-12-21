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
            <NuxtLink
              :to="`/product/${product.id}`"
              v-for="(product, index) in frontNovely"
              :key="product.id"
              class="homePage__novelty__sliderWrap__slider__slide__product"
            >
              <img :src="product.img" alt="">
              <div
                class="homePage__novelty__sliderWrap__slider__slide__product__inf"
                :class="{left: index >= 2}"
              >
                <p class="homePage__novelty__sliderWrap__slider__slide__product__inf__about">{{ product.about }}</p>
                <h3 class="homePage__novelty__sliderWrap__slider__slide__product__inf__name">{{ product.name }}</h3>
                <p class="homePage__novelty__sliderWrap__slider__slide__product__inf__price">{{ product.price }} ₽</p>
              </div>
            </NuxtLink>
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
  data () { // в данном блоке происходит объявление и хранение переменных
    return {
      slides: [1, 2, 3, 4],
      frontSlide: 0,
      timer: 0,
      frontNovely: [],
      pictures: []
    }
  },
  mounted () { // в данном блоке происходит запуск функции для получениях новинок, категорий товаров и запуска слайдера
    this.getNovely()
    this.$store.dispatch('getProducts')
    this.timer = this.slideInterval()
  },
  destroyed () { // при переходе из этой страницы на другие в этом блоке происходит остановка работы слайдера
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    slide (position) { // функция, отвечающая за работу слайдера (изменяется позиционирование родительского блока слайдера)
      document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(${position * -(window.innerWidth)}px)`
      this.frontSlide = position

      if (this.timer) {
        clearInterval(this.timer)
      }

      this.timer = this.slideInterval()
    },
    slideInterval () { // функция, отвечающая за работу таймера для слайдера (устанавливается таймер для слайдера)
      const time = setInterval(() => {
        const lenOfSlide = this.slides.length
        this.frontSlide = this.frontSlide + 1
        if (this.frontSlide >= lenOfSlide) {
          this.frontSlide = 0
        }

        document.querySelector('.homePage__sliderWrap__slider').style.transform = `translateX(${this.frontSlide * -(window.innerWidth)}px)`
      }, 5000)

      return time
    },
    parseToFloat (str) { // функция, отвечающая за форматирование строки в число типа float
      return parseFloat(str.split('?')[0].replace(',', '.').replace(/\s/g, ''))
    },
    async getNovely () { // функция, отвечающая за осуществления запроса к серверу для получения новинок
      const response = await fetch('http://127.0.0.1:5000/new-product')

      const data = await response.json()
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({ id: data[i][0], name: data[i][1], about: data[i][2], price: this.parseToFloat(data[i][3]), img: require(`@/assets/images/Products/${data[i][4]}.webp`) })
      }

      this.frontNovely = res
    }
  }
}
</script>
