<template>
  <div class="error404">
    <div class="error404__inf">
      <h1>уууупс!</h1>
      <p>Мы потеряли эту страницу!!!</p>
      <div class="error404__inf__btn" @click="$router.back()">
        <p>Вернуться назад</p>
        <RightArrow />
      </div>
    </div>
    <div class="error404__img">
      <img src="@/assets/images/Error/error.png" alt="">
      <p>404</p>
    </div>
  </div>
</template>
<script>
import '@/scss/error.scss'

import RightArrow from '@/components/SVG/rightArrow.vue'

export default {
  props: ['error'],
  layout: 'error',
  components: {
    RightArrow
  }
}
</script>
