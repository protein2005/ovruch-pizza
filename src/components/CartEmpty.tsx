import { Link } from 'react-router-dom';
import cartImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Кошик порожній 😕</h2>
      <p>
        Найімовірніше, ви не замовляли ще піцу.
        <br />
        Щоб замовити піцу, перейди на головну сторінку.
      </p>
      <img src={cartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
