import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import CardsComponent from '../../components/CardsComponent/CardsComponent';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import { isAuth } from '../../api/auth';
import { number } from 'framer-motion';

export default function orders() {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('email');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          name: 'Мусор заберите пжпжпжпжпжпж',
          date: '10 сентября 2025',
          description: 'Мусор заберите пжпжпжпжпжпж Мусор заберите пжпжпжпжпжпж Мусор заберите пжпжпжпжпжпж',
          phoneNumber: '+992 985 01 98 62',
          address: 'г. Душанбе, Зарафшон 22/6'
        },
        {
          name: 'Мусор воняет уже вторую неделю пожалуйста заберите дам 20к',
          date: '18 августа 2025',
          description:
            'Мусор воняет уже вторую неделю пожалуйста заберите дам 20к Мусор воняет уже вторую неделю пожалуйста заберите дам 20к Мусор воняет уже вторую неделю пожалуйста заберите дам 20к',
          phoneNumber: '+992 002 02 44 24',
          address: 'г. Душанбе, к. Мухаммад Каюмов 3/2'
        },
        {
          name: 'Кожура от бананов',
          date: '18 августа 2025',
          description: 'Кожура от бананов Кожура от бананов Кожура от бананов ',
          phoneNumber: '+992 002 02 44 24',
          address: 'г. Душанбе, к. Мухаммад Каюмов 3/2'
        }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  if (!isAuth()) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ваши заказы</h1>
        <Button
          onClick={() => {
            navigate('/add_order');
          }}
          variant="contained"
          sx={{ fontSize: '15px' }}
        >
          Добавить заказ
        </Button>
      </div>
      <CardsComponent data={data}></CardsComponent>
    </>
  );
}
