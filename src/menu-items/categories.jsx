// assets
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LaptopIcon from '@mui/icons-material/Laptop';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// icons
const icons = {
  CheckroomIcon,
  LaptopIcon,
  MoreHorizIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const categories = {
  id: 'group-categories',
  title: 'Категории',
  type: 'group',
  children: [
    {
      id: 'technical',
      title: 'Техника',
      type: 'item',
      url: '/categories/technical',
      icon: icons.LaptopIcon,
      breadcrumbs: false
    },
    {
      id: 'clothes',
      title: 'Одежда',
      type: 'item',
      url: '/categories/clothes',
      icon: icons.CheckroomIcon,
      breadcrumbs: false
    },
    {
      id: 'others',
      title: 'Другие',
      type: 'item',
      url: '/categories/others',
      icon: icons.MoreHorizIcon,
      breadcrumbs: false
    }
  ]
};

export default categories;
