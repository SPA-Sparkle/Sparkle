import React, { useState, useEffect } from 'react';
import './Profile.css';
import { supabase } from '../supabaseClient';
import { useAuth } from '../pages/sign/provider/AuthProvider';

function Profile({ onClose }) {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState('https://qjmfskscygtvzqqtdujj.supabase.co/storage/v1/object/sign/profile-images/default-profile.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9kZWZhdWx0LXByb2ZpbGUucG5nIiwiaWF0IjoxNzE5NTcwMDcxLCJleHAiOjE3MjIxNjIwNzF9.RIEuf9hxJ1SeheraylnAq2lITfXfYxa0JPIwjTgjWj4'); // 기본 프로필 이미지 URL
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        console.error('사용자가 로그인되지 않았습니다.');
        return;
      }

      console.log('로그인된 사용자 ID:', user.id);  // 사용자 ID 로그 출력

      const { data, error } = await supabase
        .from('profiles')  // 'profiles' 테이블에서
        .select('id, email, profile_image_url')  // id, email, profile_image_url 컬럼을 선택
        .eq('id', user.id)  // 로그인된 사용자의 id와 일치하는 행을 선택
        .maybeSingle();  // 결과가 없으면 null 반환

      if (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } else if (data) {
        console.log('가져온 데이터:', data);  // 가져온 데이터 로그 출력
        setUserId(data.id);
        setEmail(data.email);
        if (data.profile_image_url) {
          setProfileImage(data.profile_image_url);
        }
      } else {
        console.error('해당 사용자가 존재하지 않습니다.');
      }
    };

    fetchUserData();
  }, [user]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('이미지 파일:', file);  // 업로드할 파일 로그 출력

      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(`public/${userId}/${file.name}`, file);

      if (error) {
        console.error('이미지 업로드 오류:', error);
      } else {
        console.log('업로드 성공:', data);  // 업로드 성공 로그 출력

        const { data: publicUrlData, error: publicURLError } = supabase.storage
          .from('profile-images')
          .getPublicUrl(`public/${userId}/${file.name}`);

        if (publicURLError) {
          console.error('Public URL 가져오기 오류:', publicURLError);
          return;
        }

        const publicURL = publicUrlData.publicUrl;
        console.log('생성된 이미지 URL:', publicURL);  // 생성된 이미지 URL 로그 출력

        const { error: updateError } = await supabase
          .from('profiles')  // 'profiles' 테이블에서
          .update({ profile_image_url: publicURL })  // profile_image_url 컬럼 업데이트
          .eq('id', userId);

        if (updateError) {
          console.error('프로필 이미지 URL 업데이트 오류:', updateError);
        } else {
          setProfileImage(publicURL);
        }
      }
    }
  };

  return (
    <div className="profile">
      <div className="profile-image-section">
        <img src={profileImage} alt="프로필 이미지" className="profile-image" />
        <label className="image-change-button" htmlFor="profile-image-upload">
          프로필 이미지 변경
          <input 
            type="file" 
            id="profile-image-upload" 
            name="profile-image-upload" 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
          />
        </label>
      </div>
      <div className="user-info">
        <p>사용자 ID: {userId}</p>
        <p>이메일: {email}</p>
      </div>
      <button className="close-button" onClick={onClose}>닫기</button>
    </div>
  );
}

export default Profile;
