import {get} from '../api/swapi.dev.server';
import { useEffect, useState } from 'react';

import { Link} from 'react-router-dom'
import { MdFavorite , MdFavoriteBorder} from 'react-icons/md';
import Cookies from 'universal-cookie';
import useSpinnerLoader from '../hooks/useSpinnerLoader';

export const Home = () => {
    
    const [renderSpinner, setDoneLoading] = useSpinnerLoader();

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
            {renderSpinner()}
            <ul>
                {films.map((film, index) =>{
                    let i = index +1;
                    return <li className="row_line" cl style={{}} key={film.episode_id}>
                            <Link className='link' to={"films/"+i}> {film.title} </Link>
                            {film.like == 2?
                             <MdFavorite className='like' onClick={()=>{likeEvent(film)}} size={30} color='red'/> 
                             :film.like == 1?
                             <MdFavoriteBorder className='like' onClick={()=>{likeEvent(film)}} size={30} color='red'/>
                             :<MdFavoriteBorder className='like' onClick={()=>{likeEvent(film)}} size={30} color='grey'/>
                            
                            }
                          
                        </li>
                })}
            </ul>
        </div>
    )
}
