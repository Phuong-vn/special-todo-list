<script setup>
import { onUpdated, nextTick } from "vue";
import { todoList, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit } from '../store.js';

onUpdated(() => {
  // console.log(isAllCompleted.value);
});

const focusInput = async event => {
  await nextTick();
  event.target.closest('li.editing').querySelector('.edit').focus();
};

</script>

<template>
  <section class="main" v-if="todoList.length">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      :checked="isAllCompleted.value"
    >
    <label
      for="toggle-all"
      @click="toggleAll()"
    >
      Mark all as complete
    </label>
    <ul class="todo-list">
      <li
        v-for="item in todoList"
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
            @dblclick="event => {initEdit(item.id), focusInput(event)}"
          >
            {{ item.description }}
          </label>
          <button class="destroy"></button>
        </div>
        <input
          class="edit"
          :value="item.description"
          @input="event => { editing(event.target.value, item.id) }"
          @blur="completeEdit(item.id)"
        >
      </li>
    </ul>

      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <!-- <li class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label>Taste JavaScript</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
      <li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>Buy a unicorn</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
      </li> -->
  </section>
</template>