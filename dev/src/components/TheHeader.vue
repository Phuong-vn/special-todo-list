<script setup>
import { addTodo } from '../store';
</script>
<template>
  <header class="header">
    <h1>todo</h1>
    <input @enter="addTodo" class="new-todo" placeholder="What needs to be done?" autofocus>
  </header>
</template>