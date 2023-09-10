<script setup>
import { nextTick, onUpdated } from 'vue';
import { todoList, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit, escapeEdit, removeTodo } from '../store.js';

const props = defineProps({
  route: String
})

const focusInput = async event => {
  await nextTick();
  event.target.closest('li.editing').querySelector('.edit').focus();
};

const getCurrentTodoList = () => {
  if (props.route === '/active') {
    return todoList.filter(todo => !todo.isCompleted);
  } else if (props.route === '/completed') {
    return todoList.filter(todo => todo.isCompleted);
  }
  return todoList;
};

onUpdated(() => {
  console.log(isAllCompleted.value);
});

</script>

<template>
  <section class="main" v-if="todoList.length">
    <label
    for="toggle-all"
    class="toggle-all-label"
    @click="toggleAll"
    >
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="isAllCompleted"
      >
      <span>❯</span>
    </label>
    <ul class="todo-list">
      <li
        v-for="item in getCurrentTodoList()"
        :key="item.id"
        :class="{ 'completed': item.isCompleted, 'editing': item.isEditing }"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="item.isCompleted"
            @change="toggleTodoCompleted(item.id)"
          >
          <label
            @dblclick="event => {initEdit(item.id, item.title), focusInput(event)}"
          >
            {{ item.title }}
          </label>
          <button class="destroy" @click="removeTodo(item.id)"></button>
        </div>
        <input
          class="edit"
          :value="item.title"
          @input="event => { editing(event.target.value) }"
          @keyup.enter="completeEdit(item.id)"
          @blur="escapeEdit(item.id, $event)"
          @keyup.esc="escapeEdit(item.id, $event)"
        >
      </li>
    </ul>
  </section>
</template>