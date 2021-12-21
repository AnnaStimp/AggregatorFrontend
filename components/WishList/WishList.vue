<template>
  <div class="wishList">
    <div class="wishList__header">
      <h2>ЛИСТ ПОЖЕЛАНИЙ</h2>
    </div>
    <div class="wishList__list">
      <p class="wishList__list__none" v-if="$store.state.wishList.length == 0">В листе пожеланий нет товаров</p>
      <div
        v-for="product in $store.state.wishList"
        :key="product.id"
        class="wishList__list__product"
      >
        <img class="wishList__list__product__img" @click="close(); $router.push(`/product/${product.id}`)" :src="product.img" alt="">
        <div class="wishList__list__product__inf">
          <div class="wishList__list__product__inf__name" @click="close(); $router.push(`/product/${product.id}`)">
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
      </div>
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
  mounted () { // в данном блоке вызывается функция, которая осуществляет получение данных о товарах в листе пожеланий
    this.getWishList()
  },
  methods: {
    close () { // функция, отвещающая за закрытие окна с листом пожеланий
      this.$emit('update:openWishList', false)
    },
    getWishList () { // функция, получающая данные из localStorage и отправляющая эти данные в переменную
      this.$store.commit('changeWishList', JSON.parse(localStorage.getItem('likeProducts')))
    },
    dislikeProduct (product) { // функция, удаляющая товар из листа пожеланий
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
