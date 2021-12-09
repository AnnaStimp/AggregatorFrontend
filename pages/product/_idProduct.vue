<template>
  <div class="product">
    <div class="product__img">
      <img src="@/assets/images/Products/product1.png" alt="">
    </div>
    <div class="product__inf">
      <div class="product__inf__name">
        <p>НОЧНАЯ МАСКА ДЛЯ ЛИЦА</p>
        <h2>OMOROVICZA midnight radiance mask</h2>
      </div>
      <div class="product__inf__aboutPrice">
        <div class="product__inf__aboutPrice__price">
          <p>5 916 ₽</p>
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
              <td class="product__inf__aboutPrice__table__body__item__link"><a :href="`${el.src}`"><Link /></a></td>
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
  validate ({ params }) {
    if (params.idProduct === undefined) {
      return false
    }
    return true
  },
  components: {
    Like,
    Link
  },
  data () {
    return {
      prices: [{ name: 'Золотое яблоко', price: 1297, src: '/' }, { name: 'Подружка', price: 1297, src: '/' }, { name: 'Название магазина', price: 1297, src: '/' }, { name: 'Золушка', price: 1297, src: '/' }]
    }
  },
  methods: {
  }
}
</script>
