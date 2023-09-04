import { ref, reactive, computed } from "vue";

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

const isAllCompleted = ref(false);

const editingDescription = ref('');

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
    description: value,
    isCompleted: false,
    isEditing: false
  };
  todoList.push(newTodo);
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

const initEdit = (id, value) => {
  todoList.find(todo => todo.id === id).isEditing = true;
  editingDescription.value = value;
};

const editing = (value) => {
  editingDescription.value = value.trim();
  isCancelEditing.value = false;
};

const completeEdit = (id) => {
  if (editingDescription.value.trim()) {
    const todo = todoList.find(todo => todo.id === id);
    todo.description = editingDescription.value;
    todo.isEditing = false;
  } else {
    removeTodo(id);
    isCancelEditing.value = true;
  }
};

const escapeEdit = (id, event) => {
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) return;

  if (editingDescription.value.trim()) {
    if (event.type === 'blur' && !isCancelEditing.value) {
      todo.description = editingDescription.value;
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
};

const removeTodo = (id) => {
  const index = todoList.findIndex(todo => todo.id === id);
  if (index === -1) return;
  todoList.splice(index, 1);
};

const clearCompletedTodo = () => {
  todoList.forEach(todo => {
    todo.isCompleted = false;
  })
};

export { todoList, addTodo, toggleAll, isAllCompleted, toggleTodoCompleted, initEdit, editing, completeEdit, escapeEdit, activeTodoCounterMsg, clearCompletedTodo, isShowClearCompletedBtn };
