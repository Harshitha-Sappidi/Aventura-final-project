
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google"
import { Provider } from 'react-redux';
import store from './store';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
 
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
      <GoogleOAuthProvider clientId='859435051233-pfk8v358vpbbtsi8k1ce70sov0qmk8ks.apps.googleusercontent.com'>
        <React.StrictMode>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Provider>
          </React.StrictMode>
      </GoogleOAuthProvider>
  );
}
 