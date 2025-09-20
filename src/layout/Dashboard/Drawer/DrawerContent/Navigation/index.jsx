// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  //   const menuItems = menuGuestItems;

  //   console.log(menuItems);

  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return <></>;
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
