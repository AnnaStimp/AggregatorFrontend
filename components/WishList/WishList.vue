<template>
  <div class="wishList">
    <div class="wishList__header">
      <h2>ЛИСТ ПОЖЕЛАНИЙ</h2>
    </div>
    <div class="wishList__list">
      <NuxtLink
        :to="`/product/${product.id}`"
        v-for="product in wishList"
        :key="product.id"
        class="wishList__list__product"
      >
        <img class="wishList__list__product__img" @click="close()" :src="product.img" alt="">
        <div class="wishList__list__product__inf">
          <div class="wishList__list__product__inf__name" @click="close()">
            <p>{{ product.about }}</p>
            <h3>{{ product.name }}</h3>
          </div>
          <div class="wishList__list__product__inf__price">
            <p>{{ product.price }} ₽</p>
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
  data () {
    return {
      wishList: []
    }
  },
  mounted () {
    this.getWishList()
  },
  methods: {
    close () {
      this.$emit('update:openWishList', false)
    },
    getWishList () {
      this.wishList = JSON.parse(localStorage.getItem('likeProducts'))
    }
  }
}
</script>
