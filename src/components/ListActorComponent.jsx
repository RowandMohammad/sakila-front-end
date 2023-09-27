import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ActorService from '../services/ActorService';

const ListActorComponent = () => {
  console.log("ListActorComponent rendered"); 

    const [actors, setActors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        searchActors();
    }, [searchQuery]);

    const searchActors = () => {
        if (searchQuery.length > 0) {
            ActorService.searchActors(searchQuery).then((response) => {
                setActors(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
        } else {
            getAllActors();
        }
    };

    useEffect(() => {
        getAllActors();
    }, []);

    const getAllActors = () => {
        ActorService.getAllActors().then((response) => {
            setActors(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const deleteActor = (actorId) => {
        ActorService.deleteActor(actorId).then(() => {
            getAllActors();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Actors List</h2>
            
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by name..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <Link to="/add-actor" className="btn btn-primary mb-3">Add Actor</Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        actors.map(actor =>
                            <tr key={actor.actorId}>
                                <td>{actor.firstName}</td>
                                <td>{actor.lastName}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-actor/${actor.actorId}`}>Update</Link>
                                    <button className="btn btn-danger ml-2" onClick={() => deleteActor(actor.actorId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListActorComponent;
