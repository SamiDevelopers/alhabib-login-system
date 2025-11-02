const scriptURL = "https://script.google.com/macros/s/AKfycbzlqrJ2eOvKrttdVhKJnxbzFuoyC6olzwjvPFa0OVF9Km2N7f4o5UVfsRlPV1M8Pxz3/exec";

document.getElementById('attendanceForm').addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    action: 'saveAttendance',
    code: sessionStorage.getItem('teacherCode'),
    name: document.getElementById('studentName').value,
    className: document.getElementById('className').value,
    week: document.getElementById('week').value,
    present: document.getElementById('present').value
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      document.getElementById('result').textContent = '✅ تم تسجيل الغياب بنجاح';
      document.getElementById('attendanceForm').reset();
    } else {
      document.getElementById('result').textContent = '❌ حدث خطأ أثناء التسجيل';
    }
  })
  .catch(err => {
    document.getElementById('result').textContent = '⚠️ فشل الاتصال بالخادم';
    console.error(err);
  });
});
