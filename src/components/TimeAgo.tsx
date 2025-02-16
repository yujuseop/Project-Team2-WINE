import React from "react";
import styles from "./TimeAgo.module.css"; // CSS 모듈 import

// 시간 차이를 계산하는 함수
const timeAgo = (date: string) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "달", seconds: 2592000 },
    { label: "주", seconds: 604800 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];

  for (const interval of intervals) {
    const delta = Math.floor(seconds / interval.seconds);
    if (delta >= 1) {
      return `${delta}${interval.label} 전`;
    }
  }

  return "방금 전";
};

interface TimeAgoProps {
  date: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  return <span className={styles.time_ago}>{timeAgo(date)}</span>;
};

export default TimeAgo;
