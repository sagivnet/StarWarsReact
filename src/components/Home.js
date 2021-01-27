import {get} from '../api/swapi.dev.server';
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { Link} from 'react-router-dom'
import { MdFavorite , MdFavoriteBorder} from 'react-icons/md';
import Cookies from 'universal-cookie';

export const Home = () => {
    
    const [doneLoading, setDoneLoading] = useState(false); //TODO: Hook
    const override = css`//TODO: Hook
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    const [films, setFilms] = useState([]);
    
    const cookies = new Cookies();

    const likeEvent = film => {

        if(!film.like ){ // not liked yet
            film.like = 2; // set to like
          } else if (film.like == 2) { //  like
            film.like = 1 ;  // set to dislike
          } else { // dislike
            film.like = 2; //set to like
          }

        cookies.set(film.episode_id, film.like)
        setFilms(films => films.map(f => f.episode_id !== film.episode_id? f : film))
    };

    useEffect(() => {
        get().then(res => {
            setFilms(res.data.results.map(film => {
                let cookie = cookies.get(film.episode_id);
                if(cookie)
                    film.like = cookie;
                return film;
            }));
            setDoneLoading(true);
        }).catch(err => console.log(err));
    }, [])
    
    return (
        <div>
            <ClipLoader css={override} loading={!doneLoading}  size={150} />
            <ul>
                {films.map((film, index) =>{
                    let i = index +1;
                    return <li className="row_line" cl style={{}} key={film.episode_id}>
                            <Link to={"films/"+i}> {film.title} </Link>
                            {film.like == 2?
                             <MdFavorite className='like' onClick={()=>{likeEvent(film)}} size={30} color='red'/> 
                             :film.like == 1?
                             <MdFavoriteBorder className='like' onClick={()=>{likeEvent(film)}} size={30} color='red'/>
                             :<MdFavoriteBorder className='like' onClick={()=>{likeEvent(film)}} size={30} color='black'/>
                            
                            }
                          
                        </li>
                })}
            </ul>
        </div>
    )
}
