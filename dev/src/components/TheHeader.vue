<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo';

const store = useTodoStore();

const todoValue = ref('');
const clearValue = () => {
  todoValue.value = '';
};

</script>
<template>
  <header class="header">
    <h1>todo</h1>
    <input
      @keyup.enter="store.addTodo(todoValue), clearValue()"
      v-model="todoValue"
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
    >
  </header>
</template>