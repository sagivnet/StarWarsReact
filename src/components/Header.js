import {  Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className='header'>
                <h1>Star Wars Inormation</h1>
                <Link className='btn' to="/">Home</Link>
        </header>
    )
}
