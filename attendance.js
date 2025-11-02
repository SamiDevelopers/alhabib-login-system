const scriptURL = "https://script.google.com/macros/s/AKfycbwCNxtvpQVkA4tZ6cjexUamTXbm7mJRUQ3ZFMaPleN0fpG4Sj-pVSy_mmMbYqENLNyq/exec";

document.getElementById('attendanceForm').addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    name: document.getElementById('studentName').value,
    className: document.getElementById('className').value,
    week: document.getElementById('week').value,
    present: document.getElementById('present').value
  };

  document.getElementById('result').textContent = "⏳ جاري تسجيل الغياب...";

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      document.getElementById('result').textContent = result.message;
      document.getElementById('attendanceForm').reset();
    } else {
      document.getElementById('result').textContent = result.message || '❌ حدث خطأ أثناء التسجيل';
    }
  })
  .catch(err => {
    document.getElementById('result').textContent = '⚠️ فشل الاتصال بالخادم';
    console.error(err);
  });
});
