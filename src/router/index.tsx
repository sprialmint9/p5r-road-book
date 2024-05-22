import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Notes from '@/pages/Notes';
import TrashNotes from '@/pages/TrashNotes';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/notes',
    element: <Notes />,
  },
  {
    path: '/trash',
    element: <TrashNotes />,
  },
]);

export default route;
