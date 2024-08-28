import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'

import Index from './routers'
import Root,{loader as rootLoader,action as rootAction} from "./routers/root"
import ErrorPage from './error-page'
import Contact,{loader as contactLoader,action as contactAction} from './routers/contact'
import EditContact,{action as editAction} from './routers/edit'
import {action as deleteAction} from "./routers/destroy"

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement:<ErrorPage/>,
    loader:rootLoader,
    action:rootAction,
    children:[{
      errorElement:<ErrorPage />,
      children:[
        {
          index:true,
          element:<Index />
        },
        {
          path:"contacts/:contactId",
          element:<Contact/>,
          loader:contactLoader,
          action:contactAction
        },
        {
          path:"contacts/:contactId/edit",
          element:<EditContact/>,
          loader:contactLoader,
          action:editAction
        },
        {
          path:"contacts/:contactId/destroy",
          action:deleteAction,
          errorElement: <div>Oops! There was an error.</div>
        }
      ]
    }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
