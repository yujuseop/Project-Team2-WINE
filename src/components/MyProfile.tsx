/* 이거 왜 만든건지 궁금 */

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const MyProfile: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string); // 이미지 URL 설정
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // 이미지 파일만 허용
  });

  return (
    <div className="profile-container">
      <h2>프로필 설정</h2>
      <div className="upload-area" {...getRootProps()}>
        <input {...getInputProps()} />
        {image ? (
          <img src={image} alt="프로필 이미지" className="profile-image" />
        ) : (
          <p>이미지를 업로드하려면 클릭하거나 파일을 드래그하세요.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
