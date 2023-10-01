import axios from 'axios';

const ACTOR_BASE_REST_API_URL = 'https://sakilaapp.rowandsmohammad.com/actors';


class ActorService {
    getAllActors() {
        return axios.get(ACTOR_BASE_REST_API_URL);
    }

    createActor(actor) {
        return axios.post(ACTOR_BASE_REST_API_URL, actor);
    }

    getActorById(actorId) {
        return axios.get(`${ACTOR_BASE_REST_API_URL}/${actorId}`);
    }

    updateActor(actorId, actor) {
        return axios.put(`${ACTOR_BASE_REST_API_URL}/${actorId}`, actor);
    }
    
    deleteActor(actorId) {
        return axios.delete(`${ACTOR_BASE_REST_API_URL}/${actorId}`);
    }

    searchActors(query) {
        return axios.get(`${ACTOR_BASE_REST_API_URL}/search?query=${query}`);
    }
    
}

export default new ActorService();
