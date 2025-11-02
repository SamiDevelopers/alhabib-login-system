const scriptURL = "https://script.google.com/macros/s/AKfycbzlqrJ2eOvKrttdVhKJnxbzFuoyC6olzwjvPFa0OVF9Km2N7f4o5UVfsRlPV1M8Pxz3/exec";

function login() {
  const code = document.getElementById('code').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  if (!code || !password) {
    message.textContent = "الرجاء إدخال الكود وكلمة المرور.";
    return;
  }

  fetch(scriptURL + '?action=login&code=' + code + '&password=' + password)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem('teacherCode', code);
        window.location.href = '../teacher/dashboard.html';
      } else {
        message.textContent = "كود أو كلمة مرور غير صحيحة.";
      }
    })
    .catch(err => {
      message.textContent = "حدث خطأ أثناء الاتصال.";
      console.error(err);
    });
}