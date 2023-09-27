import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmService from '../services/FilmService';

const AddFilmComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [languages, setLanguages] = useState([]);
    const [languageId, setLanguageId] = useState(null);
    


    useEffect(() => {
        FilmService.getAllLanguages().then((response) => {
            setLanguages(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const navigate = useNavigate();
    const { id: filmId } = useParams();

    const saveOrUpdateFilm = (e) => {
        e.preventDefault();
    
        const film = { title, description, releaseYear, languageId: Number(languageId) };
    
        if (filmId) {
            film.filmId = Number(filmId);

            console.log(film);
            FilmService.updateFilm(filmId, film).then(() => {
                navigate('/films');
            }).catch(error => {
                console.log(error);
            });
        } else {
            FilmService.createFilm(film).then(() => {
                navigate('/films');
            }).catch(error => {
                console.log(error);
            });
        }
    };
    
    useEffect(() => {
        if (filmId) {
            FilmService.getFilmById(filmId).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setReleaseYear(response.data.releaseYear);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [filmId]);

    const titleText = () => {
        if (filmId) {
            return <h2 className="text-center">Update Film</h2>;
        } else {
            return <h2 className="text-center">Add Film</h2>;
        }
    };

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            titleText()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter title"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Description:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter description"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Release Year:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter release year"
                                        name="releaseYear"
                                        className="form-control"
                                        value={releaseYear}
                                        onChange={(e) => setReleaseYear(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Language:</label>
                                    <select
                                        name="languageId"
                                        className="form-control"
                                        value={languageId}
                                        onChange={(e) => setLanguageId(e.target.value)}
                                    >
                                        {languages.map((language) => (
                                            <option key={language.languageId} value={language.languageId}>
                                                {language.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateFilm(e)}>Submit</button>
                                <Link to="/films" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFilmComponent;
