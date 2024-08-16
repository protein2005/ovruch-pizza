import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async function fetchData() {
      try {
        const category = categoryId !== 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        setIsLoading(true);
        const { data } = await axios.get(
          `https://66b9e544fa763ff550fa03e6.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
        );
        setPizzas(data);
        setIsLoading(false);
      } catch (error) {
        alert('Помилка при отриманні даних з сервера');
      }
    })();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(12)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter((pizza) =>
                pizza.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
              )
              .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
