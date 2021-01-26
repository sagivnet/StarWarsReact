import {get} from '../api/swapi.dev.server';
import { useEffect, useState } from 'react';
// import {  Link } from 'react-router-dom';
const Link = require("react-router-dom").Link;

export const Home = () => {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        get().then(res => setFilms(res.data.results)).catch(err => console.log(err));
    }, [])
    
    return (
        <div>
            <ul>
                {films.map((film, index) =>{
                    let i = index +1;
                    // return <li onClick={()=>console.log(film)} className="line" key={film.episode_id}> {film.title} </li>
                    return <li className="line" key={film.episode_id}><Link to={"films/"+i}> {film.title} </Link></li>
                })}
            </ul>
        </div>
    )
}
