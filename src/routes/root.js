import { Outlet, Link } from 'react-router-dom';
import './root.css';
import AboutImage from './Sparkle.jpeg';
import { useState } from 'react';
import Profile from '../Components/Profile';
import { useAuth } from '../pages/sign/provider/AuthProvider';  // useAuth import
import { supabase } from '../supabaseClient';

export default function Root() {
  const { user, setUser } = useAuth();  // user 상태 가져오기
  const [showProfile, setShowProfile] = useState(false);

  const handleOpenProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <div id="sidebar">
        <nav>
          <div className="sidebar-content">
            <img src={AboutImage} alt="About" />
            <ul>
              <li>
                <Link to="Chat">Chat</Link>
              </li>
              <li>
                <button onClick={handleOpenProfile} className="profile-button">
                  Profile
                </button>
                {showProfile && (
                  <div className="modal">
                    <div className="modal-content">
                      <Profile onClose={handleCloseProfile} />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div id="header">
        {!user ? (
          <>
            <button className="auth-button">
              <Link to="SignUp">Sign Up</Link>
            </button>
            <button className="auth-button">
              <Link to="SignIn">Sign In</Link>
            </button>
          </>
        ) : (
          <button onClick={handleSignOut} className="auth-button">Sign Out</button>
        )}
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
