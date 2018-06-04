import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import GoogleIcon from './GooogleIcon';
import GameActions from '../Actions/GameListActions';
import SignIn from '../Actions/SignIn';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const responseGoogle = (response) => {
            const id_token = response.tokenId;
            AWS.config.update({
                region: 'us-east-1',
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: SignIn.poolId,
                    Logins: {
                        'accounts.google.com': id_token
                    }
                })
            })
        }
        return (
            <div>
                <div className='view-container container'>
                    <div className='landing-view'>
                        <div className="row">
                            <div className="one-half column">
                                <h3>Howdy!! Good Gamers
                                    <GoogleLogin
                                        clientId="792713998872-cbtigpo0avnc4airqk0lc6pm96t4m8r1.apps.googleusercontent.com"
                                        onSuccess={responseGoogle}
                                        render={GoogleIcon}
                                    >
                                    </GoogleLogin>
                                </h3>
                                <div>
                                    <Link to="games" className="button button-primary">Games</Link>
                                </div>
                                <div>
                                    <a href="#problem-1" className="button button-primary">What's Next</a>
                                </div>
                                <div>
                                    <a href="#problem-1" className="button button-primary">Log</a>
                                </div>
                            </div>
                            <div className="one-half column">
                                <img src="./images/HeroImage.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;