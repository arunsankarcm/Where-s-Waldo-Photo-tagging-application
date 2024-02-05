import React from "react";
import "./css/header.css";


const Header = () => {
    return (
        <header className="header">
            <div className="image-container">
                <img src="/waldo.png" alt="Image 1" className="header-image" />
                <img src="/santa.png" alt="Image 2" className="header-image" />
                <img src="/conny.png" alt="Image 3" className="header-image" />
            </div>
        </header>
    );
};

export default Header;