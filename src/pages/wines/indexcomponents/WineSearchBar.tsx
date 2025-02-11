import React, { useState } from "react";
import styles from "./WineSearchBar.module.css";

interface WineSearchBarProps {
  onSearch?: (query: string) => void;
}

const WineSearchBar: React.FC<WineSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof onSearch === "function") {
      onSearch(query);
    } else {
      console.error("onSearch prop is not a function");
    }
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
      <button type="submit" className={styles.search_button}>검색</button>
    </form>
  );
};

export default WineSearchBar;
