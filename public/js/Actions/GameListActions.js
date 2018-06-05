import GameActionTypes from './GameActionTypes';
import APIPath from '../Consts/APIPath';
import axios from 'axios';

const GameListActions = {
    async getGameList(searchConditions) {
        const pathToAPI = APIPath.SEARCH;


        try{
            console.log("aaa" + axios);
            console.log("aa" + axios.get);
            const result = await axios.get(pathToAPI + '?id=' + searchConditions.id + '&name=' + searchConditions.name + '&minPlayNum=' + searchConditions.minPlayNum + '&maxPlayNum=' + searchConditions.maxPlayNum);
            return result;
        }
        catch(e){
            console.log(e);
            console.log('failed');
            return [];
        }
    }
}

export default GameListActions;