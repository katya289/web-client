import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ThemeProvider } from './components/context/ThemeProvider'; // Импортируем ваш контекст ThemeProvider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider> {/* Оборачиваем приложение в ThemeProvider */}

    <Provider store={store}>

      <App />


    </Provider>
  </ThemeProvider>

);


reportWebVitals();
