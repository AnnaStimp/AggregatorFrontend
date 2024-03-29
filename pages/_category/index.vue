<template>
  <div class="listProducts">
    <div class="listProducts__head">
      <img :src="imgOfProducts" alt="">
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
            <p @click="popularity()" :class="{choice: sortType === 'popularity'}">по популярности</p>
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
        <p v-if="products.length == 0" class="listProducts__body__products__none">Товаров по вашему запросу не найдено</p>
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
  async validate ({ params, store }) { // в данном блоке происходит валидация страницы перед ее отображением, если данные в базе данных существуют, то страница отображается
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
  data () { // хранение и объявление переменных
    return {
      products: [],
      id_category: this.$store.state.category.choiceCategory.id,
      titleOfProducts: this.$store.state.category.choiceCategory.title,
      imgOfProducts: require(`@/assets/images/BannerOfCategory/${this.$store.state.category.choiceCategory.img}.webp`),
      openSortMenu: false,
      productsWithoutSort: [],
      sortType: '',
      searchStr: ''
    }
  },
  mounted () { // запуск функции для получения товаров категории
    this.getProductOfCategory()
  },
  methods: {
    async getProductOfCategory () { // функция, отвечающая за выполнение запроса в серверу для получения данных о товарах из выбранной категории
      const response = await fetch(`https://cosmeticsaggregator.ru/api/category/${this.id_category}`)

      const data = await response.json()
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({ id_category: data[i][0], id_product: data[i][1], name: data[i][2], about: data[i][3], price: data[i][4], img: data[i][5], viewing: data[i][6] })
      }
      this.products = res
      this.productsWithoutSort = Object.assign([], res)
    },
    ascendingPrice () { // функция, выполняющая сортировку товаров по возрастанию цены
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
    descendingPrice () { // функция, выполняющая сортировку товаров по убыванию цены
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
    popularity () { // функция, выполняющая сортировку товаров по популярности
      const items = this.products
      items.sort(function (a, b) {
        if (a.viewing < b.viewing) {
          return 1
        }
        if (a.viewing > b.viewing) {
          return -1
        }
        return 1
      })

      this.sortType = 'popularity'
      this.products = items
      this.openSortMenu = false
    },
    resetSort () { // функция, отменяющая сортировку и возвращающая вид товаров в первоначальный вид
      this.sortType = ''
      this.products = Object.assign([], this.productsWithoutSort)
      this.openSortMenu = false

      if (this.searchStr) {
        this.search()
      }
    },
    search () { // функция, выполняющая поиск товаров по названию, введеному пользователем
      const newProduct = []

      for (let i = 0; i < this.productsWithoutSort.length; i++) {
        if (this.productsWithoutSort[i].name.toLowerCase().includes(this.searchStr.toLowerCase()) || this.productsWithoutSort[i].about.toLowerCase().includes(this.searchStr.toLowerCase())) {
          newProduct.push(this.productsWithoutSort[i])
        }
      }

      this.products = newProduct

      if (this.sortType === 'ascending') {
        this.ascendingPrice()
      }

      if (this.sortType === 'descending') {
        this.descendingPrice()
      }

      if (this.sortType === 'popularity') {
        this.popularity()
      }
    }
  }
}
</script>
