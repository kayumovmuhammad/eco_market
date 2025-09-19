import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from 'components/Loader';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

export default function ItemPage() {
  const params = useParams();
  const id = params.id;
  console.log(params);
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setItem({
        name: 'Рубашка новая даже не надетая',
        imageLinks: [
          'https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_BgTANZFIIIVFGv1FjjDYvDzygFMkufN1A&s'
        ],
        why: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque reprehenderit incidunt vitae dolorum? Dolor rerum commodi tenetur quasi sit consectetur, sint id illo alias error accusantium voluptatem. Distinctio, deserunt dolorem?',
        date: '10 сентября 2025',
        id: 0,
        number: '+992 985 01 98 62'
      });
      setLoading(false);
    }, 0);
  }, [id]);
  if (isLoading) return <Loader></Loader>;

  const images = [
    {
      original: item.imageLinks[0],
      thumbnail: item.imageLinks[0]
    },
    {
      original: item.imageLinks[1],
      thumbnail: item.imageLinks[1]
    }
  ];

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '40px', width: '70%' }}>{item.name}</h2>
        <a href={`tel:${item.number.split(' ').join('')}`}>
          <Button sx={{ fontSize: '20px' }} variant="contained">
            {item.number}
          </Button>
        </a>
      </div>
      <ImageGallery
        showBullets={true}
        items={images}
        showThumbnails={false}
        thumbnailPosition="bottom"
        showFullscreenButton={false}
        showPlayButton={false}
      />
      <p style={{ marginTop: '60px' }}>{item.why}</p>
    </div>
  );
}
