import React from 'react';
import Button from '../../components/Button'; // Button 컴포넌트 가져오기

const MyProfile = () => {
  const handleButtonClick = () => {
    // 버튼 클릭 시 처리 로직
  };

  return (
    <div>
      <Button onClick={handleButtonClick} />
    </div>
  );
};

export default MyProfile;
