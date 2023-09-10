import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', () => {
  const todoListName = 'todos-vue';
  const todoListStorage = localStorage.getItem(todoListName) || '[]';
  const todoList = ref(JSON.parse(todoListStorage));
  const isAllCompleted = ref(false);
  const editingTitle = ref('');
  const isCancelEditing = ref(false);

  function addTodo(value) {
    if (value.trim() === '') return;
    const newTodo = {
      id: todoList.value.length + 1,
      title: value,
      isCompleted: false,
      isEditing: false
    };
    todoList.value.push(newTodo);
    saveToLocalStorage();
  };

  function toggleAll() {
    todoList.value.forEach(todo => {
      todo.isCompleted = !isAllCompleted.value;
    });
    updateIsAllCompleted();
    saveToLocalStorage();
  };

  function updateIsAllCompleted() {
    isAllCompleted.value = !todoList.value.some(todo => !todo.isCompleted);
  };

  function toggleTodoCompleted(id) {
    const todo = todoList.value.find(todo => todo.id === id);
    todo.isCompleted = !todo.isCompleted;
    updateIsAllCompleted();
    saveToLocalStorage();
  };

  function initEdit(id, value) {
    todoList.value.find(todo => todo.id === id).isEditing = true;
    editingTitle.value = value;
  };

  function editing(value) {
    editingTitle.value = value.trim();
    isCancelEditing.value = false;
  };

  function completeEdit(id) {
    if (editingTitle.value.trim()) {
      const todo = todoList.value.find(todo => todo.id === id);
      todo.title = editingTitle.value;
      todo.isEditing = false;
    } else {
      removeTodo(id);
      isCancelEditing.value = true;
    }
    saveToLocalStorage();
  };

  function escapeEdit(id, event) {
    const todo = todoList.value.find(todo => todo.id === id);
    if (!todo) return;

    if (editingTitle.value.trim()) {
      if (event.type === 'blur' && !isCancelEditing.value) {
        todo.title = editingTitle.value;
      } else {
        isCancelEditing.value = true;
      }
      todo.isEditing = false;
    } else {
      if (event.type === 'blur' && !isCancelEditing.value) {
        removeTodo(id);
      } else {
        isCancelEditing.value = true;
        todo.isEditing = false;
      }
    }

    saveToLocalStorage();
  };

  function removeTodo(id) {
    const index = todoList.value.findIndex(todo => todo.id === id);
    if (index === -1) return;
    todoList.value.splice(index, 1);
    saveToLocalStorage();
  };

  function clearCompletedTodo() {
    todoList.value.forEach(todo => {
      todo.isCompleted = false;
    });
    updateIsAllCompleted();
    saveToLocalStorage();
  };

  function saveToLocalStorage() {
    localStorage.setItem(todoListName, JSON.stringify(todoList.value.map(todo => ({
      id: todo.id,
      title: todo.title,
      isCompleted: todo.isCompleted,
    }))));
  };

  return { todoList, addTodo, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit, escapeEdit, clearCompletedTodo, removeTodo };
})
