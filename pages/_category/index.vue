<template>
  <div class="listProducts">
    <div class="listProducts__head">
      <img src="@/assets/images/BannerOfCategory/makeup.webp" alt="">
      <h1>{{ titleOfProducts }}</h1>
    </div>
    <div class="listProducts__body">
      <div class="listProducts__body__sorted">
        <div class="listProducts__body__sorted__sort">
          <p @click="openSortMenu = !openSortMenu">Сортировать</p>
          <div class="listProducts__body__sorted__sort__delete" @click="resetSort()">
            <Close />
          </div>
          <div
            class="listProducts__body__sorted__sort__dropMenu"
            :class="{open: openSortMenu}"
          >
            <p @click="ascendingPrice()" :class="{choice: sortType === 'ascending'}">по возрастанию цены</p>
            <p @click="descendingPrice()" :class="{choice: sortType === 'descending'}">по убыванию цены</p>
          </div>
        </div>
        <div class="listProducts__body__sorted__search">
          <input class="listProducts__body__sorted__search__input" type="text" v-model="searchStr" @input="search()">
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
import Close from '@/components/SVG/close.vue'

export default {
  name: 'ListProducts',
  async validate ({ params, store }) {
    if (!store.state.category.categorys.length) {
      await store.dispatch('getCategory')
    }

    for (let i = 0; i < store.state.category.categorys.length; i++) {
      if (params.category === store.state.category.categorys[i].name) {
        store.commit('choiceCategory', store.state.category.categorys[i])
        return true
      }
    }
    return false
  },
  components: {
    Magnifier,
    Close
  },
  data () {
    return {
      products: [],
      id_category: this.$store.state.category.choiceCategory.id,
      titleOfProducts: this.$store.state.category.choiceCategory.title,
      openSortMenu: false,
      productsWithoutSort: [],
      sortType: '',
      searchStr: ''
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
      this.productsWithoutSort = Object.assign([], res)
    },
    ascendingPrice () {
      const items = this.products
      items.sort(function (a, b) {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        return -1
      })

      this.sortType = 'ascending'
      this.products = items
      this.openSortMenu = false
    },
    descendingPrice () {
      const items = this.products
      items.sort(function (a, b) {
        if (a.price < b.price) {
          return 1
        }
        if (a.price > b.price) {
          return -1
        }
        return 1
      })

      this.sortType = 'descending'
      this.products = items
      this.openSortMenu = false
    },
    resetSort () {
      this.sortType = ''
      this.products = Object.assign([], this.productsWithoutSort)
      this.openSortMenu = false
    },
    search () {
      const newProduct = []

      for (let i = 0; i < this.productsWithoutSort.length; i++) {
        if (this.productsWithoutSort[i].name.toLowerCase().includes(this.searchStr.toLowerCase())) {
          newProduct.push(this.productsWithoutSort[i])
        }
      }

      this.products = newProduct
    }
  }
}
</script>
