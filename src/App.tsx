import "./App.css"
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AdministrateurLayout from './components/layouts/AdministrateurLayout';
import CaissierLayout from "./components/layouts/CaissierLayout";
import { ThemeProvider } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path:'/administrateur',
    element:<AdministrateurLayout/>
  },
  {
    path:'/caissier',
    element:<CaissierLayout/>
  },
])

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
