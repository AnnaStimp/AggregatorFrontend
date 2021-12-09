<template>
  <div class="product">
    dnvdbs
  </div>
</template>

<script>
import './product.scss'

export default {
  name: 'Product',
  validate ({ params }) {
    console.log(params.idProduct)
    if (params.idProduct === undefined) {
      return false
    }
    return true
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
