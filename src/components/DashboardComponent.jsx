import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardComponent.css';


import FilmService from '../services/FilmService';

function DashboardComponent() {


    const [stats, setStats] = useState({
        totalActors: 0,
        totalFilms: 0,
        totalCategories: 0,
        totalLanguages: 0
    });

    const [popularFilms, setPopularFilms] = useState([]);


    useEffect(() => {
        FilmService.getDashboardStats().then((res) => {
            setStats(res.data);
        });
        FilmService.getMostPopularFilms().then((res) => {
            setPopularFilms(res.data.slice(0, 10));
        });
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <div className="stat-item">
                    <strong>Total Actors:</strong> <span>{stats.totalActors}</span>
                </div>
                <div className="stat-item">
                    <strong>Total Films:</strong> <span>{stats.totalFilms}</span>
                </div>
                <div className="stat-item">
                    <strong>Total Categories:</strong> <span>{stats.totalCategories}</span>
                </div>
                <div className="stat-item">
                    <strong>Total Languages:</strong> <span>{stats.totalLanguages}</span>
                </div>
            </div>
            <h3>Most Popular Films</h3>
            <ul className="popular-films-list">
                {popularFilms.map(film => (
                    <li key={film.filmId} className="popular-films-item">
                        <Link to={`/film-details/${film.filmId}`}>{film.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardComponent;
