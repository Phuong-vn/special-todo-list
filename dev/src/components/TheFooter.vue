<script setup>
import { todoList, activeTodoCounterMsg, clearCompletedTodo, isShowClearCompletedBtn } from '../store.js';

</script>

<template>
  <footer class="footer" v-if="todoList.length">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count" v-html="activeTodoCounterMsg"></span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected" href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
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
