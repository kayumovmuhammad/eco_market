import { useParams } from 'react-router';
import CardsComponent from '../../components/CardsComponent/CardsComponent';
import { useEffect, useState } from 'react';

import Loader from 'components/Loader';

export default function Categories() {
  const params = useParams();
  const category = params.category;
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);

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
    }, 500);
  }, [category]);

  if (isLoading) return <Loader></Loader>;

  return <CardsComponent data={data}></CardsComponent>;
}
