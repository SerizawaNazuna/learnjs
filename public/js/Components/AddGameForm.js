import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';

import GameListActions from '../Actions/GameListActions';
import FormSchema from '../Consts/AddGameFormSchema';
import uiSchema from '../Consts/AddGameFormUISchema';

const formData = {};
class AddGameForm extends React.Component{
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(formData){
        const success = await GameListActions.addBoardGame(formData.formData);
        if(success){
            //window.alert("追加完了");
        }
        else{
            //window.alert("追加失敗……");
        }
    }

    render(){
        return(
            <Form
                schema={FormSchema}
                uiSchema={uiSchema}
                formData={formData}
                onSubmit={this.submit} 
            />
        );
    }
}

export default AddGameForm;