import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom' //provider y funcion
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import ErrorPage from './components/ErrorPage'  //importa la funcion de error de ErrorPage.jsx
import {action as eliminarClienteAction} from './components/Cliente'


const router = createBrowserRouter([  // declaracion del router con la funcion creat...
  {
    path: '/',                        // primer elemento
    element: <Layout/>,           // componente a desplegar principal
    children: [                   // coloca los elementos hijo
      {
        index: true,              //renderizar en / lo que tenga el Componente <Outlet>
        element: <Index/>,        //componente Index renderizado donde esté Outlet
        loader: clientesLoader,   //loader del componente <Index/>
        errorElement: <ErrorPage/>
      },
      {                         //hijo que no son /
        path: '/clientes/nuevo',  //Layout + NuevoCliente en /clientes/nuevo
        element: <NuevoCliente/>,  //Se inserta donde esté <Outlet>
        action: nuevoClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar', //url con el id para params.clienteId
        element: <EditarCliente/>,            //elemento a desplegar
        loader: editarClienteLoader,          //loader que trae el cliente del SERVER
        action: editarClienteAction,           //action manda la información para actualizar
        errorElement: <ErrorPage />           //componente de error
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>
)
