<template>
  <div class="headerWrap">
    <div class="header">
      <div
        class="header__catalog"
        @mouseover="hoverCatalog = true"
        @mouseleave="hoverCatalog = false"
      >
        <CatalogSvg />
        <p>Каталог</p>
      </div>
      <div class="header__likes">
        <Like />
      </div>
    </div>
    <Catalog
      :class="{hover: hoverCatalog}"
    />
  </div>
</template>

<script>
import './header.scss'

import CatalogSvg from '@/components/SVG/catalog.vue'
import Like from '@/components/SVG/like.vue'

export default {
  name: 'Header',
  components: {
    CatalogSvg,
    Like
  },
  data () {
    return {
      hoverCatalog: false
    }
  }
}
</script>
