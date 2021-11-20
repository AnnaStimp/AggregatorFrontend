<template>
  <div class="header">
    <div class="header__catalog">
      <Catalog />
      <p>Каталог</p>
    </div>
    <div class="header__likes">
      <Like />
    </div>
  </div>
</template>

<script>
import './header.scss'

import Catalog from '@/components/SVG/catalog.vue'
import Like from '@/components/SVG/like.vue'

export default {
  name: 'Header',
  components: {
    Catalog,
    Like
  }
}
</script>
