
# Blog Website

A Photo tagging web application/game where we have to find specific characters from the image in order to win the game.



## Tech Stack

**Client:** React, Context API, CSS

**Server:** Node, Express, MongoDB


## Features

- A timer which keeps track of time until we win
- A scoreboard which records our win time


## Screenshots

![App Screenshot](https://i.ibb.co/bLTZqNp/character-select.png)

![App Screenshot](https://i.ibb.co/Tg2dv1v/layout.png)

![App Screenshot](https://i.ibb.co/nCqJGPK/leader-board.png)

![App Screenshot](https://i.ibb.co/tzR4QyQ/message-after-finding.png)



## Installation

Prerequisites:Node.js, npm or Yarn, MongoDB (if using a local database)

Setting up a directory for the project 

```bash
  mkdir waldo
```

Setting up the server using Express-generator 

```bash
  npm install -g express-generator
  cd waldo
  express server
```
now we have the server side setup, lets create the client side

```bash
  cd waldo
  mkdir client
  cd client
  npm create vite@latest
```
Select React from the given options and you have both the server side folder and client side folder setup.
## Dependencies

### Client-Side Dependencies
The client side of the application, built using React, uses several important libraries:

- React Ecosystem: `react`, `react-dom`, `react-router-dom`
- Utilities: `axios`
- Development Tools:  `eslint`, `@vitejs/plugin-react`, `vite`
- Scripts: `dev`, `build`, `lint`, `preview`

### Server-Side Dependencies
The server side, powered by Express.js, incorporates:

- Core Framework: `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `bcryptjs`
- Middleware and Utilities: `cors`, `morgan`, `dotenv` `cookie-parser`, `debug`, `http-errors`
- Scripts: `start`



## Usage/Examples

Below is an example code snippet, where this React component is for a game where players click on an image to find and select characters. It keeps track of the game's progress with a timer, displays a list of characters to find, and shows a win screen when all characters are found. The game verifies each selection by making an API call to a backend server.

```javascript
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
        setShowList(false);   
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
            const photoId = "65c32d23bf10acbc381abca1";   
            const payload = {
                characterName,   
                x: position.x,
                y: position.y
            };

            const response = await axios.post(
                `https://waldo-backend-saoq.onrender.com/photo/${photoId}/verify`,
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


```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET` = hello

`MONGO_URI` = mongodb+srv://user-name:user-name@cluster0.xq01nz7.mongodb.net/database-name?retryWrites=true&w=majority


## Run Locally

Clone the project

```bash
  git clone git@github.com:arunsankarcm/waldo.git
```

Go to the project directory

```bash
  cd blog2
```

Install dependencies

```bash
  npm install
```

Start the server for server-side

```bash
  npm  start
```

Start the server for client-side

```bash
  npm run dev  
```

