<template>
  <div class="listProducts">
    <div class="listProducts__head">
      <img src="@/assets/images/BannerOfCategory/makeup.webp" alt="">
      <h1>{{ titleOfProducts }}</h1>
    </div>
    <div class="listProducts__body">
      <div class="listProducts__body__sorted">
        <div class="listProducts__body__sorted__sort">
          <p>Сортировать</p>
          <div class="listProducts__body__sorted__sort__dropMenu">
            <p>по возрастанию цены</p>
            <p>по убыванию цены</p>
          </div>
        </div>
        <div class="listProducts__body__sorted__search">
          <input class="listProducts__body__sorted__search__input" type="text">
          <Magnifier class="listProducts__body__sorted__search__btn"/>
        </div>
      </div>
      <div class="listProducts__body__products">
        <NuxtLink
          :to="`/product/${product.id_product}`"
          v-for="product in products"
          :key="product.id_product"
          class="listProducts__body__products__product"
        >
          <img :src="product.img" alt="">
          <div
            class="listProducts__body__products__product__inf"
          >
            <p class="listProducts__body__products__product__inf__about">{{ product.about }}</p>
            <h3 class="listProducts__body__products__product__inf__name">{{ product.name }}</h3>
            <p class="listProducts__body__products__product__inf__price">{{ product.price }} ₽</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import './listProducts.scss'

import Magnifier from '@/components/SVG/magnifier.vue'

export default {
  name: 'ListProducts',
  validate ({ params, store }) {
    for (let i = 0; i < store.state.category.categorys.length; i++) {
      if (params.category === store.state.category.categorys[i].name) {
        return true
      }
    }
    return false
  },
  components: {
    Magnifier
  },
  data () {
    return {
      products: [1, 2, 3, 4],
      id_category: this.$store.state.category.choiceCategory.id,
      titleOfProducts: this.$store.state.category.choiceCategory.title
    }
  },
  mounted () {
    this.getProductOfCategory()
  },
  methods: {
    parseToFloat (str) {
      return parseFloat(str.split('?')[0].replace(',', '.'))
    },
    async getProductOfCategory () {
      const response = await fetch(`http://127.0.0.1:5000/category/${this.id_category}`)

      const data = await response.json()
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({ id_category: data[i][0], id_product: data[i][1], name: data[i][2], about: data[i][3], price: this.parseToFloat(data[i][4]), img: require(`@/assets/images/Products/${data[i][5]}.png`) })
      }
      this.products = res
    }
  }
}
</script>
