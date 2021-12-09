<template>
  <div class="listProducts">
    <div class="listProducts__head">
      <img src="@/assets/images/BannerOfCategory/makeup.webp" alt="">
      <h1>Декоративная косметика</h1>
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
          :to="`/product/${index}`"
          v-for="(product, index) in products"
          :key="index"
          class="listProducts__body__products__product"
        >
          <img :src="require(`@/assets/images/Products/product${product}.png`)" alt="">
          <div
            class="listProducts__body__products__product__inf"
          >
            <p class="listProducts__body__products__product__inf__about">НОЧНАЯ МАСКА ДЛЯ ЛИЦА</p>
            <h3 class="listProducts__body__products__product__inf__name">OMOROVICZA midnight radiance mask</h3>
            <p class="listProducts__body__products__product__inf__price">6 916 ₽</p>
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
  validate ({ params }) {
    return true
  },
  components: {
    Magnifier
  },
  data () {
    return {
      products: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
  }
}
</script>
