import React from 'react';
import ReactDOM from 'react-dom';
import { Link ,BrowserRouter , Route } from 'react-router-dom'


const App = ({children}) => {
    return (
        <div>
            <h2>{'Landing Page'}</h2>
            <Menu />
            {children}
        </div>
    );
};

const Home = () => {
    return(
        <div>
            <h3>{'Home Page'}</h3>
        </div>

    );
};

const About = () => {
    return(
        <h3>{'About Page'}</h3>
    );
};

const Contact = () => {
    return(
        <h3>{'Contact Page'}</h3>
    );
};

const Menu = () => {
    return(
        <section>

            <ul>
                <li>
                	 <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </section>
    )
};


ReactDOM.render(
      <BrowserRouter>
            <div>
                <Route component={App} path="/" />
                <Route component={Home} path="/home" />
                <Route component={About} path="/about" />
                <Route component={Contact} path="/contact" />
            </div>
      </BrowserRouter>

  , document.getElementById('root'));