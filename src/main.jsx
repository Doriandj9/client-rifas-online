import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import rootRoutes from './app/routes/rootRoutes';
import App from "@modules/home/views/home/App";
import { ToastContainer } from 'react-toastify';
import './styles/main.css';
import 'flowbite/dist/flowbite'

const router = createBrowserRouter(rootRoutes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <React.StrictMode>
     <App />
    </React.StrictMode>,
  </RouterProvider>
)
