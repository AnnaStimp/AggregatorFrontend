<template>
  <div class="headerWrap">
    <div class="header">
      <div
        class="header__catalog"
        @mouseover="hoverCatalog = true; openWishList = false"
        @mouseleave="hoverCatalog = false"
      >
        <CatalogSvg />
        <p>Каталог</p>
      </div>
      <NuxtLink to="/" class="header__icon"><IconOfPage /></NuxtLink>
      <div
        class="header__likes"
        @click="openWishList = !openWishList"
      >
        <Like v-if="!openWishList"/>
        <BrokenHeart v-if="openWishList"/>
      </div>
    </div>
    <Catalog
      :class="{hover: hoverCatalog}"
    />
    <WishList
      :class="{open: openWishList}"
      :openWishList='openWishList'
    />
  </div>
</template>

<script>
import './header.scss'

import CatalogSvg from '@/components/SVG/catalog.vue'
import Like from '@/components/SVG/like.vue'
import BrokenHeart from '@/components/SVG/brokenHeart.vue'
import IconOfPage from '@/components/SVG/iconOfPage.vue'

export default {
  name: 'Header',
  components: {
    CatalogSvg,
    Like,
    IconOfPage,
    BrokenHeart
  },
  data () {
    return {
      hoverCatalog: false,
      openWishList: false
    }
  }
}
</script>
