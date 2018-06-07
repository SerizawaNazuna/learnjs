import React from 'react';
import { mount, render, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { waitForState, waitForElement } from 'enzyme-async-helpers';
import axios from 'axios';
import Form from 'react-jsonschema-form';

import LandingPage from '../js/Components/landing';
import GameList from '../js/Components/GameList';
import GameDetail from '../js/Components/GameDetail';
import AddGameForm from '../js/Components/AddGameForm';
import GameListActions from '../js/Actions/GameListActions';
import APIPath from '../js/Consts/APIPath';

const testGameList = [{
    id: 1,
    name: "stub",
    description: "stututu",
    url: "aaa.jp"
},
{
    id: 2,
    name: "2stub",
    description: "stststs",
    url: ""
}];

const promiseForGetAll = Promise.resolve(testGameList);

describe('LandingPage', () => {
    //トップページ
    it('can show the root landing page', () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.find('h3').text()).toBe('Howdy!! Good Gamers');
    });
});

describe('game detail', () => {
    //GameDetailはゲーム内容をテーブル上に表示する
    it('can show the game\'s detail as table', () => {
        const game = {
            id: 1,
            name: 'テストゲーム',
            description: '表示テスト',
            url: 'test!',
            owner: '芹澤desu!',
            place: 'ロッカーの中'
        }
        const wrapper = shallow(<GameDetail game={game} />);
        expect(wrapper.find('td').length).toBe(5);
        expect(wrapper.find('td').at(0).text()).toBe('テストゲーム');
        expect(wrapper.find('td').at(1).text()).toBe('test!');
        expect(wrapper.find('td').at(2).text()).toBe('表示テスト');
        expect(wrapper.find('td').at(3).text()).toBe('芹澤desu!');
        expect(wrapper.find('td').at(4).text()).toBe('ロッカーの中');
    });
});

describe('Get All Games', () => {
    //ゲームリストを取得する
    const pathToApi = APIPath.SEARCH;
    it('can call get-games with its conditions given by argument', () => {
        spyOn(axios, 'get').and.returnValue(promiseForGetAll);
        const searchCondition = {
            id: '',
            name: 'test',
            minPlayNum: 1,
            maxPlayNum: 2
        }
        GameListActions.getGameList(searchCondition);
        expect(axios.get).toHaveBeenCalledWith(pathToApi + '?id=' + searchCondition.id + '&name=' + searchCondition.name + '&minPlayNum=' + searchCondition.minPlayNum + '&maxPlayNum=' + searchCondition.maxPlayNum);
    });
});

describe('GameList', () => {
    let wrapper;
    beforeEach(() => {
        spyOn(GameListActions, 'getGameList').and.returnValue(promiseForGetAll);
        wrapper = mount(<GameList />);
    });
    //コンポーネントマウント時に保有ゲーム一覧を取得するメソッドがコールされる
    it('can show the game-list page', async () => {
        await waitForElement(wrapper, GameDetail);
        //ゲームリスト取得メソッドをコールする
        expect(GameListActions.getGameList).toHaveBeenCalled();
        //setStateをして自分のstateを更新する
        expect(wrapper.state().games.length).toBe(2);
        expect(wrapper.find('GameDetail').length).toBe(2);
    });

    //submitを押すと検索する
    it('can call get-games when submit', () => {
        wrapper.find('form').simulate('submit');
        expect(GameListActions.getGameList).toHaveBeenCalled();
    })
});

//ゲームをリストに追加する
describe('Add Games', () => {
    const postData = {
        name: "ダンジョンオブマンダム　エイト",
        description: "ダンジョンは裸で潜れ。チキンレースをするゲーム",
        url: "",
        minPlayNum: 2,
        maxPlayNum: 4
    }
    const pathToApi = APIPath.ADD;

    //AddGameの中でaxios.POSTができる
    it('can invoke post request via axios', async () => {
        spyOn(axios, 'post');
        await GameListActions.addBoardGame(postData);
        expect(axios.post).toHaveBeenCalledWith(pathToApi, postData);
    });

    //新規追加ボタン押下したらGameActionsのAddGameを呼べる
    it('can call Add-BG method when  submit', async () => {
        spyOn(GameListActions, 'addBoardGame').and.returnValue(Promise.resolve(true));
        const wrapper = mount(<AddGameForm />);
        wrapper.find(Form).simulate('submit');
        await expect(GameListActions.addBoardGame).toHaveBeenCalled();
    })
});