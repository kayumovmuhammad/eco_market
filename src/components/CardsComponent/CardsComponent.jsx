// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

import { Grid } from '@mui/material';
import { Link } from 'react-router';

function Item({ children }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/item/${children.id}`}>
      <MainCard
        sx={{
          height: '200px',
          background: `url(${children.image})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></MainCard>
      <Typography sx={{ color: 'black', padding: '3px' }}>{children.name}</Typography>
      <Typography sx={{ marginTop: '-8px', padding: '3px', fontSize: '13px', color: 'rgba(0, 0, 0, .6)' }}>{children.date}</Typography>
    </Link>
  );
}

export default function CardsComponent({ data }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '1rem'
      }}
    >
      {data.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </div>
  );
}
