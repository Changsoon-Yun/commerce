import ReactDOM from 'react-dom/client';
import '../app/globals.css';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/lib/router/Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
