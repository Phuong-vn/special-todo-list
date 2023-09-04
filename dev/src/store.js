import { ref, reactive, computed } from "vue";

const todoListStorage = localStorage.getItem('todos-vue') || '[]';
const todoList = reactive(JSON.parse(todoListStorage));

const isAllCompleted = ref(false);

const editingTitle = ref('');

const isCancelEditing = ref(false);

const activeTodoCounter = computed(() => todoList.filter(todo => !todo.isCompleted).length);

const activeTodoCounterMsg = computed(() => {
  if (activeTodoCounter.value < 2) {
    return `<strong>${activeTodoCounter.value}</strong> item left`;
  } else {
    return `<strong>${activeTodoCounter.value}</strong> items left`;
  }
});

const isShowClearCompletedBtn = computed(() => {
  return activeTodoCounter.value !== todoList.length;
});

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
  localStorage.setItem('todos-vue', JSON.stringify(todoList.map(todo => ({
    id: todo.id,
    title: todo.title,
    isCompleted: todo.isCompleted,
  }))));
};

export { todoList, addTodo, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit, escapeEdit, activeTodoCounterMsg, clearCompletedTodo, isShowClearCompletedBtn };
