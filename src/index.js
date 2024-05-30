import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from "./routes/root";
import GameResult from './pages/GameResult';
import Game from './pages/Game';

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
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
