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
  async getProducts ({ commit }) {
    const response = await fetch('http://cosmeticsaggregator.ru/api/product')

    const data = await response.json()

    const res = []
    for (let i = 0; i < data.length; i++) {
      res.push(data[i][0])
    }

    commit('addProducts', res)
  },
  async getCategory ({ commit }) {
    const response = await fetch('http://cosmeticsaggregator.ru/api/category')

    const data = await response.json()
    const res = []

    for (let i = 0; i < data.length; i++) {
      res.push({ id: data[i][0], name: data[i][1], title: data[i][2], img: data[i][3] })
    }

    commit('addCategorys', res)
  }
}
