import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import FilmService from '../services/FilmService';
import './FilmDetailsComponent.css'; 


const FilmDetailsComponent = () => {
    const { id: filmId } = useParams(); // Destructure the id parameter
    const [film, setFilm] = useState({});
    const [actors, setActors] = useState([]);

    useEffect(() => {
        FilmService.getFilmById(filmId).then(response => {
            setFilm(response.data);
        });
        FilmService.getActorsByFilmId(filmId).then(response => {
            setActors(response.data);
        });
    }, [filmId]); // use filmId as the dependency

    return (
        <div className="container">
            <h2>{film.title}</h2>
            <p>{film.description}</p>
            {/* Other film details here... */}
            <h3>Actors:</h3>
            <ul>
                {actors.map(actor => <li key={actor.actorId}>{actor.firstName} {actor.lastName}</li>)}
            </ul>
        </div>
    );
}

export default FilmDetailsComponent;
