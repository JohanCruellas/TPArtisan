<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar class='flex justify-center'>
        <q-btn flat dense label="Meubles" @click="navigate('Main')" class="q-ma-sm"/>
        <q-btn v-if="isAdmin" flat dense label="Graphiques" @click="navigate('Charts')" class="q-ma-sm"/>
        <q-btn v-if="isAdmin" flat dense label="Admin" @click="navigate('Admin')" class="q-ma-sm"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      isAdmin: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isAdministrator : false
    }
  },
  components: {
  },
  methods: {
    navigate(route) {
      this.$router.push({ name: route })
    }
  },
  mounted() {
  }
})
</script>

<style scoped lang="scss">
</style>
