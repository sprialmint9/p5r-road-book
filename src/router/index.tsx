import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Bookmarks from '@/pages/Bookmarks';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/bookmarks',
    element: <Bookmarks />,
  },
]);

export default route;
