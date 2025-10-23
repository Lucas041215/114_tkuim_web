// guess_number.js
// 猜數字遊戲 1~100

var target = Math.floor(Math.random() * 100) + 1;
var count = 0;
var guess;
var resultText = '';

while (true) {
  guess = prompt('請猜一個 1–100 的整數：');
  if (guess === null) {
    resultText = '遊戲中斷';
    break;
  }

  guess = parseInt(guess, 10);
  count++;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('請輸入 1–100 的有效整數');
    continue;
  }

  if (guess < target) {
    alert('再大一點');
  } else if (guess > target) {
    alert('再小一點');
  } else {
    alert('恭喜！你猜中了！總共猜了 ' + count + ' 次');
    resultText = '恭喜！你猜中了 ' + target + '，共猜了 ' + count + ' 次';
    break;
  }
}

document.getElementById('result').textContent = resultText;
