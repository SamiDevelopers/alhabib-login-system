// رابط السكربت الخاص بك من Google Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbwhA8CkRlLbGWDZKMaR1r70BPVdkPDVRY4CpLGMrP4guaoGtaU5zy4sHcaApNhrK-iR/exec";

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
  .then(async res => {
    // نحاول نقرأ الرد كـ JSON، ولو فشل نرجعه كنص
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { success: true, message: text };
    }
  })
  .then(result => {
    if (result.success) {
      document.getElementById('result').textContent = result.message || '✅ تم التسجيل بنجاح';
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
