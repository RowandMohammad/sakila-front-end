import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmService from '../services/FilmService';
import './ListFilmComponent.css'; 


const ListFilmComponent = () => {
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
        FilmService.searchFilms(value).then((response) => {
            setFilms(response.data);
        }).catch(error => {
            console.log(error);
        });
    } else {
        getAllFilms();
    }
};

  useEffect(() => {
    getAllFilms();
  }, []);
  
  useEffect(() => {
      getAllCategories();
  }, []);
  
  const getAllCategories = () => {
      FilmService.getAllCategories().then((response) => {
          setCategories(response.data);
      }).catch(error => {
          console.log(error);
      });
  };
  
  const filterByCategory = (categoryId) => {
        console.log(`Filtering by category: ${categoryId}`);

      if (categoryId) {
          FilmService.getFilmsByCategory(categoryId).then((response) => {
              setFilms(response.data);
              const categoryName = categories.find(cat => cat.category_id === categoryId).name;
              setSelectedCategory(categoryName);
          }).catch(error => {
              console.log(error);
          });
      } else {
          // Reset to show all films if no category is selected
          getAllFilms();
          setSelectedCategory(null);
      }
  };
  




  const getAllFilms = () => {
    FilmService.getAllFilms().then((response) => {
        setFilms(response.data);
    }).catch(error => {
        console.log(error);
    });
  };

  const deleteFilm = (filmId) => {
    FilmService.deleteFilm(filmId).then(() => {
        getAllFilms();
    }).catch(error => {
        console.log(error);
    });
  };

  return (
    <div className="film-container">
        <h2 className="title">Films List</h2>
        
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search films..." 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
        
        <div className="category-buttons">
            {categories.map(category => (
                <button 
                    key={category.category_id}
                    className="category-button"
                    onClick={() => filterByCategory(category.categoryId)}>
                    {category.name}
                </button>
            ))}
            <button className="category-button" onClick={() => filterByCategory(null)}>All</button>
        </div>
        
        {selectedCategory && <h3 className="sub-title">{selectedCategory} Films</h3>}
        <Link to="/add-film" className="btn btn-primary add-film-btn">Add Film</Link>
        
        <table className="film-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Release Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    films.map(
                        film => 
                            <tr key={film.filmId}>
                                <td><Link to={`/film-details/${film.filmId}`}>{film.title}</Link></td>
                                <td>{film.description}</td>
                                <td>{film.releaseYear}</td>
                                <td>
                                    <Link className="btn btn-info action-btn" to={`/edit-film/${film.filmId}`}>Update</Link>
                                    <button className="btn btn-danger action-btn" onClick={() => deleteFilm(film.filmId)}>Delete</button>
                                </td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    </div>

    );
};

export default ListFilmComponent;
