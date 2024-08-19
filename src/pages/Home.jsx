import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setFiltres } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import ErrorData from '../components/ErrorData';
import NotFoundPizza from '../components/NotFoundPizza';

function Home() {
  const navigate = useNavigate();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.pageCount);
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const searchValue = useSelector((state) => state.filter.searchValue);

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
  }, [categoryId, sortType, currentPage, navigate]);

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
    (async function fetchData() {
      const category = categoryId !== 0 ? `category=${categoryId}` : '';
      const sortBy = sortType.sortProperty.replace('-', '');
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      dispatch(fetchPizzas({ category, sortBy, order, currentPage }));
    })();
  }, [categoryId, sortType, currentPage, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {status === 'error' ? (
        <ErrorData />
      ) : (
        <>
          <h2 className="content__title">Усі піци</h2>
          <div className="content__items">
            {status === 'loading'
              ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
              : (() => {
                  const filteredItems = items.filter((item) =>
                    item.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
                  );
                  return filteredItems.length > 0 ? (
                    filteredItems.map((item) => <PizzaBlock key={item.id} {...item} />)
                  ) : (
                    <NotFoundPizza />
                  );
                })()}
          </div>
          {searchValue ? '' : <Pagination />}
        </>
      )}
    </div>
  );
}

export default Home;
