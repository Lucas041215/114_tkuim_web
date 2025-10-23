// example5_script.js
// 使用者輸入範圍，產生乘法表

// 讀取使用者輸入範圍
var startInput = prompt('請輸入乘法表起始數字（例如 2）：');
var endInput = prompt('請輸入乘法表結束數字（例如 5）：');

var start = parseInt(startInput, 10);
var end = parseInt(endInput, 10);

var output = '';

// 檢查輸入是否合法
if (isNaN(start) || isNaN(end) || start < 1 || end < 1 || start > end) {
  output = '輸入不合法，請確定輸入的是正整數，且起始數字 ≤ 結束數字';
} else {
  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + ' x ' + j + ' = ' + (i * j) + '\t';
    }
    output += '\n';
  }
}

document.getElementById('result').textContent = output;
