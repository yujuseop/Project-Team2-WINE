import React, { useState } from "react";
import styles from "./WineSearchBar.module.css";

interface WineSearchBarProps {
  onSearch: (query: string) => void;
}

const WineSearchBar: React.FC<WineSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 검색 실행:", query);
    onSearch(query); // 빈 문자열이라도 onSearch를 호출
  };

  return (
    <form className={styles.search_container} onSubmit={handleSearch}>
      <input
        type="text"
        className={styles.search_input}
        placeholder="와인을 검색해 보세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.search_button}>
        검색
      </button>
    </form>
  );
};

export default WineSearchBar;
