<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todo';

const store = useTodoStore();

const currentPath = ref(window.location.hash);

const currentView = computed(() => {
  if (currentPath.value.slice(1) === '/active') {
    return 'active';
  } else if (currentPath.value.slice(1) === '/completed') {
    return 'completed';
  }
  return '/';
});

const activeTodoCounter = computed(() => store.todoList.filter(todo => !todo.isCompleted).length);
const activeTodoCounterMsg = computed(() => `<strong>${activeTodoCounter.value}</strong> ${activeTodoCounter.value < 2 ? 'item' : 'items'} left`);
const isShowClearCompletedBtn = computed(() => activeTodoCounter.value !== store.todoList.length);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

</script>

<template>
  <footer class="footer" v-if="store.todoList.length">
    <span class="todo-count" v-html="activeTodoCounterMsg"></span>
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
    <button
      class="clear-completed"
      @click="store.clearCompletedTodo"
      v-show="isShowClearCompletedBtn"
    >
      Clear completed
    </button>
  </footer>
</template>
