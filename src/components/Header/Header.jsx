import React, { useContext } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { LogInContext } from '../Context/Context.jsx'; 

function Header() {
  const { 
    setEmail,  
    setPassword, 
    setLoginButton,
    loginButton, 
  } = useContext(LogInContext);

  const handleLogOut = () => {
    setLoginButton("open");
    setPassword("");
    setEmail("");
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.setItem('loginStatus', "open");
  }

  const handleLogIn = () => {
    setLoginButton("open");
  }

  return (
    <header className="header">
      
    {loginButton === "open"
      && <>
          <Button 
              className="header__button" 
              variant="outlined"
              style={{ padding: "0" }}
              onClick={handleLogIn}

            >
              <Link className="header__link" to="/login">Log in</Link>
            </Button>
          
          {/* <Button 
              className="header__button" 
              variant="contained" 
              disabled>
                Sing in
            </Button> */}
            </>
        
    }
      {loginButton === "closed" &&
      <>
          <nav className="header__navigation-container">
            <Link className="header__navigation-link" to={"/posts"}>Your Posts</Link>
            <Link className="header__navigation-link" to={"/feeds"}>Feeds</Link>
          </nav>

          <Button 
            className="header__button" 
            variant="outlined"
            style={{ padding: "0" }}
            onClick={handleLogOut}
          >
          <Link className="header__link" to="/" >Log out</Link>
          </Button>
        </>
}

    </header>
  );
}

export default Header;