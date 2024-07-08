// import React from 'react'
import ReactDOM from 'react-dom/client'
import Tool from './components/Tool'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import { createBrowserRouter, RouterProvider} from 'react-router-dom'
// import './index.css'


// const router = createBrowserRouter([
//    {
//    path: '/', 
//    element: <Tool />,
//    },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <>
      <Tool />
      {/* <RouterProvider router={router} /> */}
   </>
)
