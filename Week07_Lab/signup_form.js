const form = document.getElementById('signup-form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const interestsDiv = document.getElementById('interests');
const termsInput = document.getElementById('terms');

const strengthBar = document.getElementById('password-strength');

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setCustomValidity(message);
  error.textContent = message;
  if (message) input.classList.add('is-invalid');
  else input.classList.remove('is-invalid');
}

function validateInput(input) {
  const value = input.value.trim();
  if (!value) {
    setError(input, '此欄位必填');
    return false;
  }
  if (input === emailInput) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
      setError(input, 'Email 格式不正確');
      return false;
    }
  }
  if (input === phoneInput) {
    if (!/^\d{10}$/.test(value)) {
      setError(input, '手機須為 10 碼數字');
      return false;
    }
  }
  if (input === passwordInput) {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      setError(input, '密碼至少 8 碼，需含英文與數字');
      return false;
    }
  }
  if (input === confirmInput) {
    if (value !== passwordInput.value) {
      setError(input, '兩次密碼不一致');
      return false;
    }
  }
  setError(input, '');
  return true;
}

function updateStrength() {
  const val = passwordInput.value;
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
  if (/\d/.test(val)) score++;
  if (/[\W]/.test(val)) score++;

  let width = (score / 4) * 100;
  strengthBar.style.width = width + '%';
  if (score <= 1) { strengthBar.className = 'progress-bar bg-danger'; strengthBar.textContent = '弱'; }
  else if (score === 2 || score === 3) { strengthBar.className = 'progress-bar bg-warning'; strengthBar.textContent = '中'; }
  else { strengthBar.className = 'progress-bar bg-success'; strengthBar.textContent = '強'; }
}

[nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(input => {
  input.addEventListener('blur', () => validateInput(input));
  input.addEventListener('input', () => {
    validateInput(input);
    if (input === passwordInput) updateStrength();
    saveToLocalStorage();
  });
});

interestsDiv.addEventListener('change', () => {
  const checked = interestsDiv.querySelectorAll('input:checked').length;
  const error = document.getElementById('interests-error');
  if (checked === 0) { error.textContent = '請至少選擇一個興趣'; } 
  else { error.textContent = ''; }
  saveToLocalStorage();
});

termsInput.addEventListener('change', () => saveToLocalStorage());

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let firstInvalid = null;
  [nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(input => {
    if (!validateInput(input) && !firstInvalid) firstInvalid = input;
  });

  const interestsChecked = interestsDiv.querySelectorAll('input:checked').length;
  if (interestsChecked === 0 && !firstInvalid) { firstInvalid = interestsDiv; document.getElementById('interests-error').textContent = '請至少選擇一個興趣'; }

  if (!termsInput.checked && !firstInvalid) { firstInvalid = termsInput; document.getElementById('terms-error').textContent = '需同意服務條款'; }

  if (firstInvalid) {
    if (firstInvalid.focus) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';
  await new Promise(r => setTimeout(r, 1000));
  alert('註冊成功！');
  form.reset();
  strengthBar.style.width = '0%';
  strengthBar.textContent = '';
  submitBtn.disabled = false;
  submitBtn.textContent = '註冊';
  localStorage.removeItem('signupForm');
});

resetBtn.addEventListener('click', () => {
  form.reset();
  [nameInput, emailInput, phoneInput, passwordInput, confirmInput, termsInput].forEach(i => i.classList.remove('is-invalid'));
  document.querySelectorAll('p.text-danger').forEach(p => p.textContent = '');
  strengthBar.style.width = '0%';
  strengthBar.textContent = '';
  localStorage.removeItem('signupForm');
});

function saveToLocalStorage() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
    confirm: confirmInput.value,
    interests: Array.from(interestsDiv.querySelectorAll('input:checked')).map(i => i.value),
    terms: termsInput.checked
  };
  localStorage.setItem('signupForm', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('signupForm') || '{}');
  if (!data) return;
  if (data.name) nameInput.value = data.name;
  if (data.email) emailInput.value = data.email;
  if (data.phone) phoneInput.value = data.phone;
  if (data.password) passwordInput.value = data.password;
  if (data.confirm) confirmInput.value = data.confirm;
  updateStrength();
  if (data.interests) {
    interestsDiv.querySelectorAll('input').forEach(i => i.checked = data.interests.includes(i.value));
  }
  if (data.terms) termsInput.checked = true;
}

window.addEventListener('load', loadFromLocalStorage);

const style = document.createElement('style');
style.textContent = `
  .is-invalid {
    border-color: #dc3545 !important;
  }
`;
document.head.appendChild(style);
