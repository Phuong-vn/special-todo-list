import { ref, reactive } from "vue";

const todoListStorage = localStorage.getItem('todoList') || [
  {
    id: 1,
    description: 'learn javascript',
    isCompleted: true,
    isEditing: false
  },
  {
    id: 2,
    description: 'learn vue js',
    isCompleted: false,
    isEditing: false
  },
];
const todoList = reactive(todoListStorage);

let length = todoList.length;

const isAllCompleted = ref(false);

const addTodo = (value) => {
  if (value.trim() === '') return;
  todoList.push({
    id: length + 1,
    description: value,
    isCompleted: false,
    isEditing: false
  });
  console.log('🚀 ~ addTodo ~ todoList:', todoList);
};

const toggleAll = () => {
  if (isAllCompleted.value) {
    todoList.forEach(todo => {
      todo.isCompleted = false;
    });
  } else {
    todoList.forEach(todo => {
      todo.isCompleted = true;
    });
  }
  updateIsAllCompleted();
};

const updateIsAllCompleted = () => {
  isAllCompleted.value = !todoList.some(todo => !todo.isCompleted)
};

const toggleTodoCompleted = (id) => {
  const todo = todoList.find(todo => todo.id === id);
  todo.isCompleted = !todo.isCompleted;
  updateIsAllCompleted();
};

const initEdit = (id) => {
  todoList.find(todo => todo.id === id).isEditing = true;
};

const editing = (value, id) => {
  const todo = todoList.find(todo => todo.id === id);
  todo.description = value;
};

const completeEdit = (id) => {
  todoList.find(todo => todo.id === id).isEditing = false;

};

export { todoList, addTodo, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit };
