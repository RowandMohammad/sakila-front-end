import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListActorComponent from './components/ListActorComponent';
import AddActorComponent from './components/AddActorComponent';
import ListFilmComponent from './components/ListFilmComponent';
import AddFilmComponent from './components/AddFilmComponent';
import DashboardComponent from './components/DashboardComponent';
import FilmDetailsComponent from './components/FilmDetailsComponent';
import LoginComponent from './components/LoginComponent';
import { useAuth } from './AuthContext';




function App() {

  const { isAuthenticated } = useAuth();



  return (
    <div>
      <Router>
      {isAuthenticated && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/actors">Actors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/films">Films</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        )}
        <Routes>
        {isAuthenticated ? (
                        <>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/actors" element={<ListActorComponent />} />
          <Route path="/add-actor" element={<AddActorComponent />} />
          <Route path="/edit-actor/:id" element={<AddActorComponent />} />
          <Route path="/films" element={<ListFilmComponent />} />
          <Route path="/add-film" element={<AddFilmComponent />} />
          <Route path="/edit-film/:id" element={<AddFilmComponent />} />
          <Route path="/film-details/:id" element={<FilmDetailsComponent/>} />
          </>
                    ) : (
                        <Route path="*" element={<LoginComponent />} />
                    )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
