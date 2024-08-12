import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
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
            <PizzaBlock title={'Пепероні Фреш з перцем'} price={300} />
            <PizzaBlock title={'Сирна'} price={250} />
            <PizzaBlock title={'Курча барбекю'} price={150} />
            <PizzaBlock title={'Кисло-солодке курча'} price={450} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
