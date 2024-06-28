import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage('Sign up failed: ' + error.message);
    } else {
      const user = data.user;
      const defaultProfileImage = 'https://qjmfskscygtvzqqtdujj.supabase.co/storage/v1/object/sign/profile-images/default-profile.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9kZWZhdWx0LXByb2ZpbGUucG5nIiwiaWF0IjoxNzE5NTcwMDcxLCJleHAiOjE3MjIxNjIwNzF9.RIEuf9hxJ1SeheraylnAq2lITfXfYxa0JPIwjTgjWj4&t=2024-06-28T10%3A21%3A09.209Z'; // 기본 프로필 이미지 URL

      if (user) {
        // 회원 정보 데이터베이스에 저장
        const { data: profileData, error: insertError } = await supabase
          .from('profiles')
          .insert([
            { id: user.id, email: user.email, profile_image_url: defaultProfileImage }
          ]);

        if (insertError) {
          setMessage('Sign up successful, but profile insertion failed: ' + insertError.message);
        } else {
          setMessage('Sign up successful! Please check your email to confirm your account.');
        }
      } else {
        setMessage('Sign up successful! Please check your email to confirm your account.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
};

export default SignUp;
