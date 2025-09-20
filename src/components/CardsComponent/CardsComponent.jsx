// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

import { Grid } from '@mui/material';
import { Link } from 'react-router';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Item({ children }) {
  return (
    <MainCard>
      <div style={{}}>
        <h3>{children.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>{children.address}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>{children.phoneNumber}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#0000009e' }}>{children.date}</span>
        </div>
      </div>
    </MainCard>
  );
}

export default function CardsComponent({ data }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1rem'
      }}
    >
      {data.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </div>
  );
}
