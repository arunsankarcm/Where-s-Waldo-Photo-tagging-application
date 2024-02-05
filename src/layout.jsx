import React, { useState, useRef, useEffect } from 'react';
import Header from "./header";

const Layout = () => {
    const [showList, setShowList] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [listItems, setListItems] = useState([
        { src: 'waldo.png', alt: 'Description 1', text: 'Waldo' },
        { src: 'santa.png', alt: 'Description 1', text: 'Santa' },
        { src: 'conny.png', alt: 'Description 2', text: 'Conny' },
    ]);
    const photoRef = useRef(null);

    const handlePhotoClick = (e) => {
        const bounds = photoRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left + photoRef.current.scrollLeft;
        const y = e.clientY - bounds.top + photoRef.current.scrollTop;

        setPosition({ x, y });
        setShowList(prevShowList => !prevShowList);
    };

    useEffect(() => {
        const handleClickAway = (e) => {
            if (photoRef.current && !photoRef.current.contains(e.target)) {
                setShowList(false);
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

                {showList && (
                    <ul
                        style={{
                            position: 'absolute',
                            top: position.y,
                            left: position.x,
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            zIndex: 2,
                        }}
                    >
                        {listItems.map((item, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px', textAlign: 'center' }}>
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    style={{ width: '45px', height: '45px' }} 
                                />
                                <span style={{ color: 'white' }}>{item.text}</span> 
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Layout;
