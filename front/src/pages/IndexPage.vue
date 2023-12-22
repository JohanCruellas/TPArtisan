<template>
  <q-page class="flex column">
    <div v-for="(category, categoryIndex) in categories" :key="categoryIndex">
      <q-item class="text-h6">{{ category.label }}s</q-item>
      <FurnitureSlider :furnitures="category.furnitures" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import categoryService from 'src/services/category.service'
import FurnitureSlider from '../components/FurnitureSlider.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    FurnitureSlider
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {

  },
  async created() {
    let response = await categoryService.getAll()
    this.categories = response.data.categories
  }
})
</script>
