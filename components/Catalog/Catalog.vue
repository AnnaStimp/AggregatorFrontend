<template>
  <div class="catalog">
    <div class="catalog__category">
      <p>макияж</p>
      <p>уход</p>
      <p>аптечная косметика</p>
    </div>
    <div class="catalog__commercial">
      <div class="catalog__commercial__item">
        <img src="@/assets/images/commercial/product1.png" alt="">
        <div class="catalog__commercial__item__inf">
          <h3 class="catalog__commercial__item__inf__name">Make Up For Ever</h3>
          <p class="catalog__commercial__item__inf__about">новая оттеночная пудра для лица</p>
        </div>
      </div>
      <div class="catalog__commercial__item">
        <img src="@/assets/images/commercial/product2.png" alt="">
        <div class="catalog__commercial__item__inf">
          <h3 class="catalog__commercial__item__inf__name">Shik</h3>
          <p class="catalog__commercial__item__inf__about">маска для увлажнения лица</p>
        </div>
      </div>
    </div>
    <div class="catalog__mySocials">
      <a href="https://www.instagram.com/annastimp/?hl=ru" target="_blank"><Inst /></a>
      <a href="https://github.com/AnnaStimp"><Git /></a>
    </div>
  </div>
</template>

<script>
import './catalog.scss'

import Inst from '@/components/SVG/inst.vue'
import Git from '@/components/SVG/git.vue'

export default {
  name: 'Catalog',
  components: {
    Inst,
    Git
  }
}
</script>
