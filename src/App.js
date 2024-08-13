import axios from 'axios';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';

import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await axios.get('https://66b9e544fa763ff550fa03e6.mockapi.io/pizza');
        setPizzas(data);
      } catch (error) {
        alert('Не вдалось отримати дані!');
      }
    })();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Усі піци</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
