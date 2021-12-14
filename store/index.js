export const state = () => ({
  category: {
    categorys: [],
    choiceCategory: []
  },
  products: []
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
  }
}

export const actions = {
}
