import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import rootRoutes from './app/routes/rootRoutes';
import App from "@modules/home/views/home/App";
import { ToastContainer } from 'react-toastify';
import './styles/main.css';

const router = createBrowserRouter(rootRoutes);

  window.addEventListener('blur', function() {
    // Acciones a realizar cuando se deja la ventana
      this.setInterval(() => {
          if(!this.document.hasFocus()){
           this.window.addEventListener('focus',() => {
              this.location.reload();
           })
          }
      },( 10 * (60 * 1000)))
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <React.StrictMode>
     <App />
    </React.StrictMode>,
  </RouterProvider>
)
