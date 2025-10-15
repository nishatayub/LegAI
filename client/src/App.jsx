import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing';
import EchoAI from './pages/EchoAI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>
  },
  {
    path: '/chat',
    element: <EchoAI/>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
