<template>
  <div class="wishList">
    <div class="wishList__header">
      <h2>ЛИСТ ПОЖЕЛАНИЙ</h2>
    </div>
    <div class="wishList__list">
      <NuxtLink
        :to="`/product/${i}`"
        v-for="i in 8"
        :key="i"
        class="wishList__list__product"
      >
        <img class="wishList__list__product__img" @click="close()" src="@/assets/images/Products/product4.png" alt="">
        <div class="wishList__list__product__inf">
          <div class="wishList__list__product__inf__name" @click="close()">
            <p>парфюмерная вода</p>
            <h3>PAGLIERI 1876 florentia</h3>
          </div>
          <div class="wishList__list__product__inf__price">
            <p>12 456 ₽</p>
            <div class="wishList__list__product__inf__price__btn">
              <BrokenHeart />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import './wishList.scss'

import BrokenHeart from '@/components/SVG/brokenHeart.vue'

export default {
  name: 'WishList',
  components: {
    BrokenHeart
  },
  props: ['openWishList'],
  methods: {
    close () {
      this.$emit('update:openWishList', false)
    }
  }
}
</script>
