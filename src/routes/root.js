import { Outlet, Link } from 'react-router-dom';
import './root.css';
import AboutImage from './Sparkle.jpeg';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <div className="sidebar-content">
            <img src={AboutImage} alt="About" />
            <ul>
              <li>
                <Link to="Game">Game</Link>
              </li>
              <li>
                <Link to="GameResult">GameResult</Link>
              </li>
              <li>
                <Link to="Chat">Chat</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
