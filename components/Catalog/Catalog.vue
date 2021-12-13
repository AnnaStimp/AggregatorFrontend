<template>
  <div class="catalog">
    <div class="catalog__category">
      <NuxtLink
        v-for="category in categorys"
        :key="category.id"
        :to="`/${category.name}`"
      >
        <p @click="close()">{{ category.name }}</p>
      </NuxtLink>
    </div>
    <div class="catalog__commercial">
      <div class="catalog__commercial__item">
        <img src="@/assets/images/commercial/product1.png" alt="">
        <div class="catalog__commercial__item__inf">
          <h3 class="catalog__commercial__item__inf__name">Make Up For Ever</h3>
          <p class="catalog__commercial__item__inf__about">новая оттеночная пудра для лица</p>
        </div>
      </div>
      <div class="catalog__commercial__item">
        <img src="@/assets/images/commercial/product2.png" alt="">
        <div class="catalog__commercial__item__inf">
          <h3 class="catalog__commercial__item__inf__name">Shik</h3>
          <p class="catalog__commercial__item__inf__about">маска для увлажнения лица</p>
        </div>
      </div>
    </div>
    <div class="catalog__mySocials">
      <a href="https://www.instagram.com/annastimp/?hl=ru" target="_blank"><Inst /></a>
      <a href="https://github.com/AnnaStimp"><Git /></a>
    </div>
  </div>
</template>

<script>
import './catalog.scss'

import Inst from '@/components/SVG/inst.vue'
import Git from '@/components/SVG/git.vue'

export default {
  name: 'Catalog',
  components: {
    Inst,
    Git
  },
  data () {
    return {
      categorys: []
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    close () {
      document.querySelector('.catalog').classList.add('nohover')
      setTimeout(() => {
        document.querySelector('.catalog').classList.remove('nohover')
      }, 30)
    },
    async getCategory () {
      const response = await fetch('http://127.0.0.1:5000/category')

      const data = await response.json()
      const res = []

      for (let i = 0; i < data.length; i++) {
        res.push({ id: data[i][0], name: data[i][1] })
      }

      this.categorys = res
    }
  }
}
</script>
