import GameActionTypes from './GameActionTypes';
import APIPath from '../Consts/APIPath';
import axios from 'axios';

const GameListActions = {
    async getGameList(searchConditions) {
        const pathToAPI = APIPath.SEARCH;
        try {
            const result = await axios.get(pathToAPI + '?id=' + searchConditions.id + '&name=' + searchConditions.name + '&minPlayNum=' + searchConditions.minPlayNum + '&maxPlayNum=' + searchConditions.maxPlayNum);
            return result.data;
        }
        catch (e) {
            console.log(e);
            console.log('failed');
            return;
        }
    },

    async addBoardGame(postData) {
        try{
            const pathToAPI = APIPath.ADD;
            const response = await axios.post(pathToAPI, postData);
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
}

export default GameListActions;