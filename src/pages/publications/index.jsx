import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import CardsComponent from '../../components/CardsComponent/CardsComponent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

export default function publications() {
  const email = localStorage.getItem('email');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          name: 'Рубашка новая даже не надетая',
          image:
            'https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
          date: '10 сентября 2025',
          id: 0
        },
        {
          name: 'Сиёхпуст бесплатно',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_BgTANZFIIIVFGv1FjjDYvDzygFMkufN1A&s',
          date: '15 августа 2025',
          id: 10
        }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ваши публикации</h1>
        <Button
          onClick={() => {
            navigate('/add_publication');
          }}
          variant="contained"
          sx={{ fontSize: '15px' }}
        >
          Добавить публикацию
        </Button>
      </div>
      <CardsComponent data={data}></CardsComponent>
    </>
  );
}
