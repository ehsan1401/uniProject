import './input.css';
import HomePage from './components/pages/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from './components/pages/test';
import NotFoundPage from './components/pages/404';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/Dashboard';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },{
      path: "/home",
      element: <HomePage/>,
    },{
      path: "/test",
      element: <Test/>,
    },{
      path: "/Login",
      element: <Login/>,
    },{
      path: "/Register",
      element: <Register/>,
    },{
      path: "/Dashboard",
      element: <Dashboard/>,
    },{
      path: "*",
      element: <NotFoundPage/>,
    },
  ],
    {
      basename: "/"
    }
  );

  return (

      <div className="App p-5 h-screen">
        <div className="bg-neutral-300 rounded-md h-[100%] overflow-hidden">
          <RouterProvider router={router}>
          </RouterProvider>
        </div>
      </div>

  );
}

export default App;
