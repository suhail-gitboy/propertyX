import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.jsx'
import ContextWrapped from './Common/ContextWrapped.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackRender } from './Common/Errorboundar.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <GoogleOAuthProvider clientId='938584642704-8s4nkt5dat2nrccaa7f7rq6qn2s72g9a.apps.googleusercontent.com'>



      <QueryClientProvider client={queryClient}>

        <ContextWrapped>
          <Provider store={store}>
            <App />
          </Provider>
        </ContextWrapped>
      </QueryClientProvider>

    </GoogleOAuthProvider>
  </ErrorBoundary>

)
