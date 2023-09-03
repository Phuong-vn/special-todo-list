// import { reactive } from 'vue';

const todoList = localStorage.getItem('todoList') || [];

let length = todoList.length

const addTodo = (value) => {
  todoList.push({
    id: length + 1,
    description:value
  });
}

export default { todoList, addTodo };
