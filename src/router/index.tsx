import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Notes from '@/pages/Notes';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/notes',
    element: <Notes />,
  },
]);

export default route;
