import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from "./routes/root";
import Chat from './pages/Chat';  // 새로운 Chat 페이지 import
import SignUp from './pages/sign/SignUp';  
import SignIn from './pages/sign/SignIn';
import { AuthProvider } from './pages/sign/provider/AuthProvider';  // AuthProvider import

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Chat",  
        element: <Chat />,  // Chat 페이지 라우트 추가
      },
      {
        path: "SignUp",  
        element: <SignUp />,  
      },
      {
        path: "SignIn",  
        element: <SignIn />,  
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>  {/* AuthProvider로 래핑 */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
