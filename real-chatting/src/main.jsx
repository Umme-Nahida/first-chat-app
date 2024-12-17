import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Pages/LoginPage.jsx';
import MessageList from './Pages/MessageLIst/MessageList.jsx';
import Chat from './Pages/Chat.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/chat",
    element: <Chat></Chat>
  },
  {
    path: "/LoginPage",
    element: <LoginPage></LoginPage>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
