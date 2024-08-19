import React from 'react';
import { useSelector } from 'react-redux';

function NotFoundPizza() {
  const searchValue = useSelector((state) => state.filter.searchValue);

  return (
    <div className="content__notFoundPizza">
      <h2>Йой 😕</h2>
      <p>
        Піци <b>"{searchValue}"</b> за вашим запитом в цій категорії не знайдено.
      </p>
    </div>
  );
}

export default NotFoundPizza;
