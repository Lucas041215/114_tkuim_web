// temperature_converter.js
// 攝氏 ↔ 華氏轉換

var input = prompt('請輸入溫度與單位（例如 25C 或 77F）：');

if (!input) {
  alert('未輸入任何值');
  document.getElementById('result').textContent = '未輸入任何值';
} else {
  input = input.trim().toUpperCase(); // 去空格，統一大寫
  var value = parseFloat(input);
  var unit = input.slice(-1); // 取最後一個字母

  var output = '';

  if (isNaN(value) || (unit !== 'C' && unit !== 'F')) {
    output = '輸入格式錯誤，請輸入數字加單位（C 或 F）';
  } else if (unit === 'C') {
    var f = value * 9 / 5 + 32;
    output = value + '°C = ' + f.toFixed(2) + '°F';
  } else { // F
    var c = (value - 32) * 5 / 9;
    output = value + '°F = ' + c.toFixed(2) + '°C';
  }

  alert(output);
  document.getElementById('result').textContent = output;
}
