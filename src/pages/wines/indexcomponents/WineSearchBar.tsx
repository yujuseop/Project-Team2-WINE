import React, { useState } from "react";
import styles from "./WineSearchBar.module.css";

interface WineSearchBarProps {
  onSearch: (query: string) => void;
}

const WineSearchBar: React.FC<WineSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);  // 부모 컴포넌트로 검색어 전달
  };

  return (
    <form className={styles.search_container} onSubmit={handleSearch}>
      <div className={styles.search_icon}></div>
      <input
        type="text"
        className={styles.search_input}
        placeholder="와인을 검색해 보세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.search_button}>검색</button>
    </form>
  );
};

export default WineSearchBar;
