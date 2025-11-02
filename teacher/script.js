const scriptURL = "https://script.google.com/macros/s/AKfycbzlqrJ2eOvKrttdVhKJnxbzFuoyC6olzwjvPFa0OVF9Km2N7f4o5UVfsRlPV1M8Pxz3/exec";
const teacherCode = sessionStorage.getItem('teacherCode');

if (!teacherCode) {
  window.location.href = '../login/index.html';
}

fetch(scriptURL + '?action=getData&code=' + teacherCode)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      const t = data.data;
      document.getElementById('info').innerHTML = `
        <p><strong>الاسم:</strong> ${t['اسم الخادم']}</p>
        <p><strong>رقم الهاتف:</strong> ${t['رقم الهاتف']}</p>
        <p><strong>التخصص:</strong> ${t['التخصص']}</p>
        <p><strong>الفصل:</strong> ${t['الفصل']}</p>
        <p><strong>إداري:</strong> ${t['اداري']}</p>
      `;
    } else {
      document.getElementById('info').textContent = "تعذر تحميل البيانات.";
    }
  })
  .catch(err => console.error(err));

function logout() {
  sessionStorage.clear();
  window.location.href = '../login/index.html';
}