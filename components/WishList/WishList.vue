<template>
  <div class="wishList">
    <div class="wishList__header">
      <h2>ЛИСТ ПОЖЕЛАНИЙ</h2>
    </div>
    <div class="wishList__list">
      <NuxtLink
        :to="`/product/${product.id}`"
        v-for="product in $store.state.wishList"
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
            <div class="wishList__list__product__inf__price__btn" @click="dislikeProduct(product)">
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
      this.$store.commit('changeWishList', JSON.parse(localStorage.getItem('likeProducts')))
    },
    dislikeProduct (product) {
      const like = JSON.parse(localStorage.getItem('likeProducts'))

      const newLike = []

      for (let i = 0; i < like.length; i++) {
        if (like[i].id === product.id) {
          continue
        }
        newLike.push(like[i])
      }

      this.$store.commit('changeWishList', newLike)
      localStorage.setItem('likeProducts', JSON.stringify(newLike))
    }
  }
}
</script>
