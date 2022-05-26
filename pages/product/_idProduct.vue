<template>
  <div class="product">
    <div class="product__img">
      <img :src="product.img" alt="">
    </div>
    <div class="product__inf">
      <div class="product__inf__name">
        <p>{{ product.about }}</p>
        <h2>{{ product.name }}</h2>
      </div>
      <div class="product__inf__aboutPrice">
        <div class="product__inf__aboutPrice__price">
          <p>{{ product.price }} ₽</p>
          <div class="product__inf__aboutPrice__price__btn" @click="likeProduct()">
            <Like v-if="!likelyProduct"/>
            <BrokenHeart v-if="likelyProduct"/>
          </div>
        </div>
        <table class="product__inf__aboutPrice__table">
          <tbody class="product__inf__aboutPrice__table__body">
            <tr
              v-for="(el, index) in prices"
              :key="index"
              class="product__inf__aboutPrice__table__body__item"
            >
              <td class="product__inf__aboutPrice__table__body__item__name"><p>{{ el.name }}</p></td>
              <td class="product__inf__aboutPrice__table__body__item__price"><p>{{ el.price }} ₽</p></td>
              <td class="product__inf__aboutPrice__table__body__item__link"><a :href="`${el.src}`" target="_blank"><Link /></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import './product.scss'

import Like from '@/components/SVG/like.vue'
import BrokenHeart from '@/components/SVG/brokenHeart.vue'
import Link from '@/components/SVG/link.vue'

export default {
  name: 'Product',
  async validate ({ params, store }) { // в данном блоке происходит валидация страницы перед ее отображением, если данные в базе данных существуют, то страница отображается
    if (isNaN(params.idProduct)) {
      return false
    }

    if (!store.state.products.length) {
      await store.dispatch('getProducts')
    }

    for (let i = 0; i < store.state.products.length; i++) {
      if (parseInt(params.idProduct) === store.state.products[i]) {
        return true
      }
    }
    return false
  },
  components: {
    Like,
    Link,
    BrokenHeart
  },
  data () { // хранение и объявление переменных
    return {
      prices: [],
      product: [],
      likelyProduct: false
    }
  },
  watch: { // в данном блоке происходит слежение за переменной, если она изменится, то данные будут обновлены
    '$store.state.wishList' () {
      for (let i = 0; i < this.$store.state.wishList.length; i++) {
        if (this.$store.state.wishList[i].id === this.product.id) {
          this.likelyProduct = true
          return
        }
      }
      this.likelyProduct = false
    }
  },
  async mounted () { // запуск функции для получения информации о товаре
    await this.getInfAboutProduct();
    await this.viewing();
  },
  methods: {
    dislikeProduct () { // функция, которая убирает товар из листа пожеланий
      this.likelyProduct = false

      const like = JSON.parse(localStorage.getItem('likeProducts'))

      const newLike = []

      for (let i = 0; i < like.length; i++) {
        if (like[i].id === this.product.id) {
          continue
        }

        newLike.push(like[i])
      }

      this.$store.commit('changeWishList', newLike)
      localStorage.setItem('likeProducts', JSON.stringify(newLike))
    },
    likeProduct () { // функция, которая добавляет товар в лист пожеланий
      if (this.likelyProduct) {
        this.dislikeProduct()
        return
      }

      if (!localStorage.getItem('likeProducts')) {
        localStorage.setItem('likeProducts', JSON.stringify([]))
      }

      const like = JSON.parse(localStorage.getItem('likeProducts'))

      for (let i = 0; i < like.length; i++) {
        if (like[i].id === this.product.id) {
          return
        }
      }

      this.likelyProduct = true
      like.push(this.product)
      this.$store.commit('changeWishList', like)
      localStorage.setItem('likeProducts', JSON.stringify(like))
    },
    async getInfAboutProduct () { // функция, отвечающая за выполнение запроса в серверу для получения данных о товаре
      const response = await fetch(`http://cosmeticsaggregator.ru/api/product/${this.$route.params.idProduct}`)

      const data = await response.json()
      const prices = []
      let min = data[0][4]

      for (let i = 0; i < data.length; i++) {
        prices.push({ name: data[i][2], price: data[i][4], src: data[i][5] })
        if (data[i][4] < min) {
          min = data[i][4]
        }
      }

      const product = { id: data[0][0], name: data[0][1], about: data[0][3], price: min, img: data[0][6] }

      this.product = product
      this.prices = prices

      for (let i = 0; i < this.$store.state.wishList.length; i++) {
        if (this.$store.state.wishList[i].id === product.id) {
          this.likelyProduct = true
          break
        }
      }
    },
    // функция, реагирующая на загрузку страницы
    async viewing () {
      // подготовка данных к отправке запроса
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_product: this.product.id })
      }
      // выполнение запроса
      const response = await fetch('http://cosmeticsaggregator.ru/api/product_viewing', requestOptions)
    }
  }
}
</script>
