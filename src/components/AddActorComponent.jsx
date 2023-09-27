import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ActorService from '../services/ActorService';


const AddActorComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const { id: actorId } = useParams();

    const saveOrUpdateActor = (e) => {
        e.preventDefault();
    
        const actor = { firstName, lastName };
    
        if (actorId) {
            ActorService.updateActor(actorId, actor).then(() => {
                navigate('/actors');
            }).catch(error => {
                console.log(error);
            });
        } else {
            ActorService.createActor(actor).then(() => {
                navigate('/actors');
            }).catch(error => {
                console.log(error);
            });
        }
    };
    
    

    useEffect(() => {
        if (actorId) {
            ActorService.getActorById(actorId).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [actorId]);

    const title = () => {
        if (actorId) {
            return <h2 className="text-center">Update Actor</h2>;
        } else {
            return <h2 className="text-center">Add Actor</h2>;
        }
    };

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateActor(e)}>Submit</button>
                                <Link to="/actors" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddActorComponent;
