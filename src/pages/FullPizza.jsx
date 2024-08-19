import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState([]);
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
  console.log(pizza);

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza Foto" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius odio ratione rerum maxime
        sit, alias, magni, obcaecati magnam autem quibusdam rem eligendi vero consequuntur. Eum
        itaque quisquam impedit enim corporis!
      </p>
      <h4>{pizza.price} гривен</h4>
    </div>
  );
}

export default FullPizza;
