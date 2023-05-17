import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyRoutes from './routes/MyRoutes';
import store from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MyRoutes />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
