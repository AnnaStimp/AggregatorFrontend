<template>
  <div class="homePage">
    <div class="homePage__sliderWrap">
      <div class="homePage__sliderWrap__slider">
        <div
          class="homePage__sliderWrap__slider__slide"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img :src="require(`@/assets/images/HomePage/${slide.img}.webp`)" alt="">
          <div class="homePage__sliderWrap__slider__slide__inf">
            <h3>{{ slide.head }}</h3>
            <p>{{ slide.text }}</p>
            <a class="homePage__sliderWrap__slider__slide__inf__btn" :href="slide.url" target="_blank">
              <p>Узнать подробнее</p>
              <RightArrow />
            </a>
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
          <div class="homePage__novelty__sliderWrap__control__left" @click="slideNovely('l')">
            <RightArrow />
          </div>
          <div class="homePage__novelty__sliderWrap__control__right" @click="slideNovely('r')">
            <RightArrow />
          </div>
        </div>
        <div class="homePage__novelty__sliderWrap__slider">
          <div
            class="homePage__novelty__sliderWrap__slider__slide"
          >
            <NuxtLink
              :to="`/product/${product.id}`"
              v-for="(product, index) in frontNovely"
              :key="product.id"
              class="homePage__novelty__sliderWrap__slider__slide__product"
            >
              <img :src="product.img" alt="">
              <div
                class="homePage__novelty__sliderWrap__slider__slide__product__inf"
                :class="{left: [2,3,6,7,10,11,14,15].includes(index)}"
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
      slides: [
        { head: 'Angel Schlesser', text: 'только 10 и 11 мая', img: 'banner_Angel_Schlesser', url: 'https://goldapple.ru/brands/angel-schlesser' },
        { head: 'new! new! new!', text: 'познакомьтесь с новинками', img: 'banner_new', url: 'https://goldapple.ru/novinki' },
        { head: 'Darling*', text: 'скидки до −20%', img: 'banner_Darling', url: 'https://goldapple.ru/brands/darling' },
        { head: 'Lamel x Gold Apple', text: 'фиксирующее мыло для бровей', img: 'banner_Lamel', url: 'https://goldapple.ru/brands/lamel-professional?producttype=51429' }
      ],
      frontSlide: 0,
      timer: 0,
      frontNovely: [],
      pictures: [],
      noveltySlide: 0
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
      const response = await fetch('http://cosmeticsaggregator.ru/api/new-product')

      const data = await response.json()
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({ id: data[i][0], name: data[i][1], about: data[i][2], price: this.parseToFloat(data[i][3]), img: data[i][4] })
      }

      this.frontNovely = res
    },
    slideNovely (side) {
      let max = -300

      if (document.documentElement.clientWidth <= 1130) {
        max = -700
      }

      if (side === 'l' && this.noveltySlide < 0) {
        this.noveltySlide += 100
      }

      if (side === 'r' && this.noveltySlide > max) {
        this.noveltySlide -= 100
      }

      document.querySelector('.homePage__novelty__sliderWrap__slider__slide').style.transform = `translateX(${this.noveltySlide}%)`
    }
  }
}
</script>
