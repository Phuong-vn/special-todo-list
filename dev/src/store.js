import { ref, reactive } from "vue";

const todoListName = 'todos-vue';
const todoListStorage = localStorage.getItem(todoListName) || '[]';
const todoList = reactive(JSON.parse(todoListStorage));
const isAllCompleted = ref(false);
const editingTitle = ref('');
const isCancelEditing = ref(false);

const addTodo = (value) => {
  if (value.trim() === '') return;
  const newTodo = {
    id: todoList.length + 1,
    title: value,
    isCompleted: false,
    isEditing: false
  };
  todoList.push(newTodo);
  saveToLocalStorage();
};

const toggleAll = () => {
  todoList.forEach(todo => {
    todo.isCompleted = !isAllCompleted.value;
  });
  updateIsAllCompleted();
  saveToLocalStorage();
};

const updateIsAllCompleted = () => {
  isAllCompleted.value = !todoList.some(todo => !todo.isCompleted)
};

const toggleTodoCompleted = (id) => {
  const todo = todoList.find(todo => todo.id === id);
  todo.isCompleted = !todo.isCompleted;
  updateIsAllCompleted();
  saveToLocalStorage();
};

const initEdit = (id, value) => {
  todoList.find(todo => todo.id === id).isEditing = true;
  editingTitle.value = value;
};

const editing = (value) => {
  editingTitle.value = value.trim();
  isCancelEditing.value = false;
};

const completeEdit = (id) => {
  if (editingTitle.value.trim()) {
    const todo = todoList.find(todo => todo.id === id);
    todo.title = editingTitle.value;
    todo.isEditing = false;
  } else {
    removeTodo(id);
    isCancelEditing.value = true;
  }
  saveToLocalStorage();
};

const escapeEdit = (id, event) => {
  const todo = todoList.find(todo => todo.id === id);
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

const removeTodo = (id) => {
  const index = todoList.findIndex(todo => todo.id === id);
  if (index === -1) return;
  todoList.splice(index, 1);
  saveToLocalStorage();
};

const clearCompletedTodo = () => {
  todoList.forEach(todo => {
    todo.isCompleted = false;
  })
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem(todoListName, JSON.stringify(todoList.map(todo => ({
    id: todo.id,
    title: todo.title,
    isCompleted: todo.isCompleted,
  }))));
};

export { todoList, addTodo, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit, escapeEdit, clearCompletedTodo, removeTodo };
