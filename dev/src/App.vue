<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheHome from './layout/TheHome.vue'
import TheActive from './layout/TheActive.vue'
import TheCompleted from './layout/TheCompleted.vue'
import { ref, computed } from 'vue'

const routes = [
  { path: '/', component: TheHome },
  { path: '/active', component: TheActive },
  { path: '/completed', component: TheCompleted },
]

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
})

const currentView = computed(() => routes.find(route => route.path === currentPath.value.slice(1))?.component || TheHome);

</script>

<template>
  <TheHeader />
  <component :is="currentView" />
  <TheFooter />
</template>

<style scoped lang="sass">
</style>
