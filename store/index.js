export const state = () => ({
  category: {
    categorys: [],
    choiceCategory: []
  },
  products: [],
  wishList: []
})

export const mutations = {
  addCategorys (state, categorys) {
    state.category.categorys = categorys
  },
  choiceCategory (state, category) {
    state.category.choiceCategory = category
  },
  addProducts (state, productsId) {
    state.products = productsId
  },
  changeWishList (state, products) {
    state.wishList = products
  }
}

export const actions = {
}
