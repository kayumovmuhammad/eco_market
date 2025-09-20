// assets
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import AddIcon from '@mui/icons-material/Add';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-nav',
  title: 'Навигация',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Ваши заказы',
      type: 'item',
      url: '/orders',
      icon: ViewComfyIcon,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Добавить заказ',
      type: 'item',
      url: '/add_order',
      icon: AddIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
