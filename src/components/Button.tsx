import React from 'react';

interface ButtonProps {
  onClick: () => void; // onClick 속성은 함수로 정의
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div
      style={{
        width: '353px',
        height: '172px',
        top: '20px',
        left: '413px',
        padding: '32px 16px 24px 16px',
        gap: '16px',
        borderRadius: '16px 0px 0px 0px',
        border: '1px solid #ccc',
        opacity: 1,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF', // 배경색을 흰색으로 변경
      }}
    >
      {/* "정말로 삭제하시겠습니까?" 텍스트 박스 */}
      <div
        style={{
          width: '321px',
          height: '26px',
          opacity: 1,
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#333',
        }}
      >
        정말로 삭제하시겠습니까?
      </div>

      {/* 버튼들 배치 */}
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* 취소하기 버튼 */}
        <button
          onClick={onClick}
          style={{
            width: '156px',
            height: '50px',
            padding: '16px 36px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: 'black',
            opacity: 1,
          }}
        >
          취소하기
        </button>

        {/* 삭제하기 버튼 */}
        <button
          onClick={onClick}
          style={{
            width: '156px',
            height: '50px',
            padding: '16px 36px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            cursor: 'pointer',
            backgroundColor: '#6a42db',
            color: 'white',
            opacity: 1,
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default Button;
