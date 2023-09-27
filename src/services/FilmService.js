// src/services/FilmService.js
import axios from 'axios';

const FILM_BASE_REST_API_URL = 'http://sakila-env.eba-q2q2anr3.eu-west-2.elasticbeanstalk.com/films';

class FilmService {
    getAllFilms() {
        return axios.get(FILM_BASE_REST_API_URL);
    }

    createFilm(film) {
        return axios.post(FILM_BASE_REST_API_URL, film);
    }

    getFilmById(filmId) {
        return axios.get(`${FILM_BASE_REST_API_URL}/${filmId}`);
    }

    updateFilm(filmId, film) {
        return axios.put(`${FILM_BASE_REST_API_URL}/${filmId}`, film);
    }
    
    deleteFilm(filmId) {
        return axios.delete(`${FILM_BASE_REST_API_URL}/${filmId}`);
    }

    getAllLanguages() {
        return axios.get(`${FILM_BASE_REST_API_URL}/languages`);
    }

    getAllCategories() {
        return axios.get(`${FILM_BASE_REST_API_URL}/categories`);
    }
    
    getFilmsByCategory(categoryId) {
        return axios.get(`${FILM_BASE_REST_API_URL}/category/${categoryId}`);
    }
    
    getDashboardStats() {
        return axios.get('http://sakila-env.eba-q2q2anr3.eu-west-2.elasticbeanstalk.com/dashboard/stats');
    }
    
    getFilmDetailsById(id) {
        return axios.get(`${FILM_BASE_REST_API_URL}/${id}`);
    }
    
    getActorsByFilmId(id) {
        return axios.get(`${FILM_BASE_REST_API_URL}/${id}/actors`);
    }

    searchFilms(title) {
        return axios.get(`${FILM_BASE_REST_API_URL}/search?title=${title}`);
    }

    getMostPopularFilms() {
        return axios.get('http://sakila-env.eba-q2q2anr3.eu-west-2.elasticbeanstalk.com/dashboard/popularFilms');
    }
    
    
    
    
}

export default new FilmService();
