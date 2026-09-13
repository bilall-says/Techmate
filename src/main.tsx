import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safeguard against third-party browser extension injection collisions (e.g., MetaMask, Coinbase, Phantom)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event?.message && event.message.toLowerCase().includes('ethereum')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason ? String(event.reason) : '';
    if (reason.toLowerCase().includes('ethereum')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

