// example1_script.js
// 統一在父層監聽點擊與送出事件，處理清單項目新增/刪除

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `${value} <div>
    <button class="btn btn-sm btn-outline-success" data-action="complete">完成</button>
    <button class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>
  </div>`;
  list.appendChild(item);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action="remove"]');
  if (!target) {
    const completeTarget = event.target.closest('[data-action="complete"]');
    if (completeTarget) {
      const item = completeTarget.closest('li');
      if (item) {
        item.classList.toggle('list-group-item-success');
      }
    }
    return;
  }
  const item = target.closest('li');
  if (item) {
    item.remove();
  }
});

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
});
