import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';

import GameListActions from '../Actions/GameListActions';
import GameGenreIds from '../Actions/GameGenreIds';
import GameDetail from './GameDetail';
import FormSchema from '../Consts/SearchGameFormSchema';
import uiSchema from '../Consts/SearchGameUISchema';

//所持ゲームを一覧化するためのコンテナ
const formData = {};

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        const searchConditions = {
            id: '',
            name: '',
            minPlayNum: '',
            maxPlayNum: ''
        }
        const result = await GameListActions.getGameList(searchConditions);
        this.setState({
            games: result
        });
    }

    async search(formData) {
        const result = await GameListActions.getGameList(formData.formData);
        this.setState({
            games: result
        });
    }

    render() {
        let gameDetailComponent;
        gameDetailComponent = this.state.games.map((value, index) => {
            return (
                <GameDetail game={value} key={"game_" + index} />
            )
        })

        return (
            <div>
                <header>
                    <div>
                        <Form
                            schema={FormSchema}
                            uiSchema={uiSchema}
                            formData={formData}
                            onSubmit={this.search}
                        />
                    </div>
                </header>
                <table className='u-full-width'>
                    <tbody>
                        {gameDetailComponent}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameList;