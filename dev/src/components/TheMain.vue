<script setup>
import { nextTick } from 'vue';
import { useTodoStore } from '../stores/todo';

const store = useTodoStore();

const props = defineProps({
  route: String
})

const focusInput = async event => {
  await nextTick();
  event.target.closest('li.editing').querySelector('.edit').focus();
};

const getCurrentTodoList = () => {
  if (props.route === '/active') {
    return store.todoList.filter(todo => !todo.isCompleted);
  } else if (props.route === '/completed') {
    return store.todoList.filter(todo => todo.isCompleted);
  }
  return store.todoList;
};

</script>

<template>
  <section class="main" v-if="store.todoList.length">
    <label
    for="toggle-all"
    class="toggle-all-label"
    @click="store.toggleAll"
    >
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="store.isAllCompleted"
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
            @change="store.toggleTodoCompleted(item.id)"
          >
          <label
            @dblclick="event => {store.initEdit(item.id, item.title), focusInput(event)}"
          >
            {{ item.title }}
          </label>
          <button class="destroy" @click="store.removeTodo(item.id)"></button>
        </div>
        <input
          class="edit"
          :value="item.title"
          @input="event => { store.editing(event.target.value) }"
          @keyup.enter="store.completeEdit(item.id)"
          @blur="store.escapeEdit(item.id, $event)"
          @keyup.esc="store.escapeEdit(item.id, $event)"
        >
      </li>
    </ul>
  </section>
</template>