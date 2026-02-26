const taskList = document.getElementById('taskList');
const input = document.getElementById('newTaskInput');
const form = document.getElementById('taskForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;
  taskText.title = 'Клик — редактировать';

  // Редактирование по клику на текст
  taskText.addEventListener('click', () => {
    startEdit(taskText);
  });

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  // Кнопка редактирования (дополнительно, удобно на мобилке)
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-icon';
  editBtn.type = 'button';
  editBtn.textContent = '✎';
  editBtn.title = 'Редактировать';
  editBtn.addEventListener('click', () => startEdit(taskText));

  // Кнопка удаления ✕
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-icon btn-danger';
  deleteBtn.type = 'button';
  deleteBtn.textContent = '✕';
  deleteBtn.title = 'Удалить';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(actions);

  taskList.appendChild(li);
  input.value = '';
  input.focus();
}

function startEdit(taskTextEl) {
  const current = taskTextEl.textContent;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = current;
  editInput.className = 'task-text';
  editInput.style.cursor = 'text';

  // заменить span на input
  taskTextEl.replaceWith(editInput);
  editInput.focus();
  editInput.setSelectionRange(editInput.value.length, editInput.value.length);

  const finish = () => {
    const newText = editInput.value.trim();

    const newSpan = document.createElement('span');
    newSpan.className = 'task-text';
    newSpan.title = 'Клик — редактировать';
    newSpan.textContent = newText ? newText : current; // если пусто — откат
    newSpan.addEventListener('click', () => startEdit(newSpan));

    editInput.replaceWith(newSpan);
  };

  editInput.addEventListener('blur', finish);

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish();
    if (e.key === 'Escape') {
      editInput.value = current;
      finish();
    }
  });
}