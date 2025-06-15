import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ServiceUnavailable } from './common/components';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ServiceUnavailable>
    <App />
  </ServiceUnavailable>
);
