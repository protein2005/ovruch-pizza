import React from 'react';

function ErrorData() {
  return (
    <div className="content__error-info">
      <h2>Виникла помилка 😕</h2>
      <p>На жаль, піци не знайдено, зачекайте деякий час.</p>
      <a href="/" className="button button--black">
        Спробуйте перезавантажити сторінку
      </a>
    </div>
  );
}

export default ErrorData;
