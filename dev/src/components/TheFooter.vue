<script setup>
import { todoList, activeTodoCounterMsg, clearCompletedTodo, isShowClearCompletedBtn } from '../store.js';
import { ref, computed } from 'vue';

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
})

const currentView = computed(() => {
  if (currentPath.value.slice(1) === '/active') {
    return 'active';
  } else if (currentPath.value.slice(1) === '/completed') {
    return 'completed';
  }
  return '/';
})

</script>

<template>
  <footer class="footer" v-if="todoList.length">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count" v-html="activeTodoCounterMsg"></span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a :class="{ 'selected': currentView === '/'}" href="#/">All</a>
      </li>
      <li>
        <a :class="{ 'selected': currentView === '/active'}" href="#/active">Active</a>
      </li>
      <li>
        <a :class="{ 'selected': currentView === '/completed'}" href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      class="clear-completed"
      @click="clearCompletedTodo()"
      v-show="isShowClearCompletedBtn"
    >
      Clear completed
    </button>
  </footer>
</template>
