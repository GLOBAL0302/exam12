import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { googleClientId } from './GlobalConstant.ts';
import { interceptor } from './axiosApi.ts';

interceptor(store);
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
);
