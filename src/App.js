import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from './components/UserContext.jsx';
import router from './Router/routes.jsx';
import { RouterProvider } from 'react-router-dom';
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContext>
          <RouterProvider router={router}></RouterProvider>
        </UserContext>
      </QueryClientProvider>
    </div>
  );
}

export default App;
