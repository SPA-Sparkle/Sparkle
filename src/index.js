import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from "./routes/root";
import GameResult from './pages/GameResult';
import Game from './pages/Game'; 
import Chat from './pages/Chat';  // 새로운 Chat 페이지 import

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Game",  
        element: <Game />,
      },
      {
        path: "GameResult",  
        element: <GameResult />,
      },
      {
        path: "Chat",  
        element: <Chat />,  // Chat 페이지 라우트 추가
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();