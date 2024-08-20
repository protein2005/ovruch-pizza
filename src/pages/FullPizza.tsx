import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://66b9e544fa763ff550fa03e6.mockapi.io/pizza/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні даних з сервера');
        navigate('/');
      }
    })();
  }, [id, navigate]);

  if (!pizza) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza Foto" />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4>{pizza.price} гривен</h4>
    </div>
  );
};

export default FullPizza;
