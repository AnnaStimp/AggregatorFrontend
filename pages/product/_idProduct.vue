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
  async validate ({ params, store }) {
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
  data () {
    return {
      prices: [],
      product: [],
      likelyProduct: false
    }
  },
  watch: {
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
  mounted () {
    this.getInfAboutProduct()
  },
  methods: {
    parseToFloat (str) {
      return parseFloat(str.split('?')[0].replace(',', '.').replace(/\s/g, ''))
    },
    dislikeProduct () {
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
    likeProduct () {
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
    async getInfAboutProduct () {
      const response = await fetch(`http://127.0.0.1:5000/product/${this.$route.params.idProduct}`)

      const data = await response.json()
      const prices = []
      let min = this.parseToFloat(data[0][4])

      for (let i = 0; i < data.length; i++) {
        prices.push({ name: data[i][2], price: this.parseToFloat(data[i][4]), src: data[i][5] })
        if (this.parseToFloat(data[i][4]) < min) {
          min = this.parseToFloat(data[i][4])
        }
      }

      const product = { id: data[0][0], name: data[0][1], about: data[0][3], price: min, img: require(`@/assets/images/Products/${data[0][6]}.webp`) }

      this.product = product
      this.prices = prices

      for (let i = 0; i < this.$store.state.wishList.length; i++) {
        if (this.$store.state.wishList[i].id === product.id) {
          this.likelyProduct = true
          break
        }
      }
    }
  }
}
</script>
