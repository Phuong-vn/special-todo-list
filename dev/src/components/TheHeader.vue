<script setup>
import { ref } from 'vue';
import { addTodo } from '../store';

let todoValue = ref('');

const clearValue = () => {
  todoValue.value = '';
};

</script>
<template>
  <header class="header">
    <h1>todo</h1>
    <input
      @keyup.enter="addTodo(todoValue), clearValue()"
      v-model="todoValue"
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
    >
  </header>
</template>