import React, { useState, useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setFiltres } from '../redux/slices/filterSlice';

import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.pageCount);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Якщо змінився categoryId, sortType, searchValue або currentPage, то змінюємо URL
  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${query}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  //Якщо був перший рендер компонента і в URL є параметри, то встановлюємо фільтри
  useEffect(() => {
    if (window.location.search) {
      const { sortProperty, categoryId, currentPage } = qs.parse(window.location.search.slice(1));
      dispatch(
        setFiltres({
          categoryId: Number(categoryId),
          sort: list.find((item) => item.sortProperty === sortProperty),
          pageCount: Number(currentPage),
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  //Якщо змінився categoryId, sortType, searchValue або currentPage, то отримуємо дані з сервера
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      console.log(isSearch.current);
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
    }
    isSearch.current = false;
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
          ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter((pizza) =>
                pizza.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
              )
              .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
