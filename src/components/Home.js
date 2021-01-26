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
                {films.map(film =>{
                    // return <li onClick={()=>console.log(film)} className="task" key={film.episode_id}> {film.title} </li>
                    return <li className="task" key={film.episode_id}><Link to={"films/"+film.episode_id}> {film.title} </Link></li>
                })}
            </ul>
        </div>
    )
}
