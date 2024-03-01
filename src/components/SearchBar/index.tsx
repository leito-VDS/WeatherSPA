import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import Search from "../../assets/icons/search.tsx";

interface SearchBarProps {
    onSelectCity: (selectedCity: string) => void;
}

function SearchBar({ onSelectCity }: SearchBarProps) {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSelect();
        }
    };

    const handleSelect = () => {
        onSelectCity(searchInput);
        setSearchInput("");
    };

    useEffect(() => {});

    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="Search for a city..."
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <button onClick={handleSelect}>
                <Search width="16px" height="16px" />
            </button>
        </div>
    );
}

export default SearchBar;
