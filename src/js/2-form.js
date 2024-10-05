let formData = {
    email: '',
    message: '',
  };
  
  const form = document.querySelector('.feedback-form');
  
  // Відстеження змін у формі через подію input.
  form.addEventListener('input', event => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  });
  
  // Збереження актуальних даних з полів email та message у formData та запис цього об’єкта у локальне сховище.
  const storageData = localStorage.getItem('feedback-form-state');
  
  // Перевірка, чи є дані у локальному сховищі. Якщо так, вони використовуються для заповнення форми та об'єкта
  if (storageData) {
    const parsedData = JSON.parse(storageData);
    formData.email = parsedData.email;
    formData.message = parsedData.message;
    form.elements.email.value = parsedData.email;
    form.elements.message.value = parsedData.message;
  }
  
  // Відправка форми
  form.addEventListener('submit', event => {
    event.preventDefault();
    // Валідація форми
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
    } else {
      console.log(formData);
      // Очищення форми після відправки
      localStorage.removeItem('feedback-form-state');
      form.reset();
      formData.email = '';
      formData.message = '';
    }
  });