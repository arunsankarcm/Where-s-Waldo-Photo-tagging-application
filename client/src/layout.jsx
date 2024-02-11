import React, { useState, useRef, useEffect } from 'react';
import Header from "./header";
import WinScreen from './win';
import axios from 'axios';


const Layout = () => {
    const [showList, setShowList] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [listItems, setListItems] = useState([
        { src: 'waldo.png', alt: 'Waldo', text: 'Waldo' },
        { src: 'santa.png', alt: 'Santa', text: 'Santa' },
        { src: 'conny.png', alt: 'Conny', text: 'Conny' },
    ]);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const photoRef = useRef(null);
    const [hasWon, setHasWon] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const resetGame = () => {
        // Reset all the game state to initial values
        setShowList(false);
        setHasWon(false);
        setTimerActive(true);
        setTimer(0);
        setPosition({ x: 0, y: 0 });
        setListItems([
            { src: 'waldo.png', alt: 'Waldo', text: 'Waldo' },
            { src: 'santa.png', alt: 'Santa', text: 'Santa' },
            { src: 'conny.png', alt: 'Conny', text: 'Conny' },
        ]);
    };

   
    useEffect(() => {
        let interval;

        if (timerActive) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerActive]);

        
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

    const handleListItemClick = (characterName, event) => {
        event.stopPropagation(); 
        verifyClick(characterName);
        setShowList(false); // Hide the list after selection
    };

    useEffect(() => {
        if (listItems.length === 0) {
            setHasWon(true);
            setTimerActive(false);
            setElapsedTime(timer);
        }
    }, [listItems, timer]);


    const verifyClick = async (characterName) => {
        try {
            const photoId = "65c32d23bf10acbc381abca1"; // This should be dynamic based on your application's context
            const payload = {
                characterName, // This is the character name sent from the clicked list item
                x: position.x,
                y: position.y
            };

            // Log the payload to see what's being sent
            console.log("Payload sent to backend:", payload);

            const response = await axios.post(
                `http://localhost:3000/photo/${photoId}/verify`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            if (data.correct) {
                console.log("Correct!");
                alert("Correct!");
                // Remove the found character from the list
                setListItems(prevItems => prevItems.filter(item => item.text !== characterName));
            } else {
                console.log("Try again!");
                alert("Try again!");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error occurred while verifying.");
        }
    };


    return (
        <div>
            <Header timer={timer} />
            <div
                ref={photoRef}
                style={{
                    overflow: 'auto',
                    maxHeight: '93vh',
                    maxWidth: '100%',
                    position: 'relative'
                }}
                onClick={handlePhotoClick}
                role="presentation"
            >
                <img
                    src="waldo.jpg"
                    alt="A scene where characters need to be found"
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
                            <li
                                key={index}
                                style={{ display: 'flex', alignItems: 'center', margin: '10px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={(event) => handleListItemClick(item.text, event)}
                                role="button"
                                aria-label={`Find ${item.alt}`}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    style={{ width: '45px', height: '45px' }}
                                />
                                <span style={{ color: 'white', marginLeft: '10px' }}>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <WinScreen show={hasWon} time={elapsedTime} onNewGame={resetGame} />
        </div>
    );
};

export default Layout;
