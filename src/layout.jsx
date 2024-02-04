import React, { useState, useRef, useEffect } from 'react';
import Header from "./header";

const Layout = () => {
    const [showTagBox, setShowTagBox] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });   
    const photoRef = useRef(null);

    const handlePhotoClick = (e) => {
        const bounds = photoRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left + photoRef.current.scrollLeft;
        const y = e.clientY - bounds.top + photoRef.current.scrollTop;

        setPosition({ x, y });
        setShowTagBox(true);
    };

    useEffect(() => {
        const handleClickAway = (e) => {
            if (photoRef.current && !photoRef.current.contains(e.target)) {
                setShowTagBox(false);
            }
        };

        document.addEventListener('mousedown', handleClickAway);
        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, []);

    return (
        <div>
            <Header />
            <div
                ref={photoRef}
                style={{
                    overflow: 'auto',
                    maxHeight: '93vh',
                    maxWidth: '100%',
                    position: 'relative'
                }}
                onClick={handlePhotoClick}
            >
                <img
                    src="waldo.jpg"
                    alt="Taggable"
                    style={{
                        display: 'block',
                        maxWidth: 'none',
                        height: 'auto'
                    }}
                />

                {showTagBox && (
                    <div
                        style={{
                            position: 'absolute',
                            top: position.y,
                            left: position.x,
                            // Add more styling as needed for the tag box
                        }}
                    >
                        <div
                            style={{
                                width: '10px',  // Size of the pointer
                                height: '10px', // Size of the pointer
                                backgroundColor: 'red', // Pointer color
                                borderRadius: '50%', // Makes the div circular
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)' // Center the pointer on the click position
                            }}
                        ></div>
                        {/* You can still include dropdown menu or tagging options here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layout;
