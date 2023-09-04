import { reactive } from "vue";

const todoListStorage = localStorage.getItem('todoList') || [];
const todoList = reactive(todoListStorage)

let length = todoList.length

const addTodo = (value) => {
  if (value.trim() === '') return;
  todoList.push({
    id: length + 1,
    description: value
  });
  console.log('🚀 ~ addTodo ~ todoList:', todoList)
}

export { todoList, addTodo };
