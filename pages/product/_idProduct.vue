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
          <div class="product__inf__aboutPrice__price__btn">
            <Like />
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
              <td class="product__inf__aboutPrice__table__body__item__price"><p>{{ el.price.toLocaleString('ru') }} ₽</p></td>
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
import Link from '@/components/SVG/link.vue'

export default {
  name: 'Product',
  validate ({ params, store }) {
    for (let i = 0; i < store.state.products.length; i++) {
      if (parseInt(params.idProduct) === store.state.products[i]) {
        return true
      }
    }
    return false
  },
  components: {
    Like,
    Link
  },
  data () {
    return {
      prices: [],
      product: []
    }
  },
  mounted () {
    this.getInfAboutProduct()
  },
  methods: {
    parseToFloat (str) {
      return parseFloat(str.split('?')[0].replace(',', '.'))
    },
    async getInfAboutProduct () {
      const response = await fetch(`http://127.0.0.1:5000/product/${this.$route.params.idProduct}`)

      const data = await response.json()
      const prices = []
      let min = parseFloat(data[0][4])

      for (let i = 0; i < data.length; i++) {
        prices.push({ name: data[i][2], price: parseFloat(data[i][4]), src: data[i][5] })
        if (parseFloat(data[i][4]) < min) {
          min = parseFloat(data[i][4])
        }
      }

      const product = { id: data[0][0], name: data[0][1], about: data[0][3], price: min, img: require(`@/assets/images/Products/${data[0][6]}.png`) }

      this.product = product
      this.prices = prices
      console.log(min)
    }
  }
}
</script>
