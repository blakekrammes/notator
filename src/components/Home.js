import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Instructions} from './Instructions';
import AudioButton from './AudioButton';
import SheetMusic from './SheetMusic';
import {clearAuth, authError} from '../actions/auth';
import {clearAuthToken} from '../localStorage';
import './Home.css';

export class Home extends Component {
	logout(e) {
		e.preventDefault();
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	componentDidMount() {
		//clear any auth/signup error messages
		this.props.dispatch(authError(null));
	}

	render() {
		if (this.props.authToken && this.props.currentUser !== null) {
			return (
		    	<div className="home">
					<header>
				    	<h1 className="description-title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
				    	<h3 className="range">The range is F1 – C7</h3>
				  	</header>
				  	<div className="logged-in-div">
				  		<p className="status">You are logged in as {this.props.currentUser.username}</p>
				  		<Link to="/mycompositions" className="compositions-link">My Compositions</Link>
				  		<a className="logout-link" href="" onClick={(e) => this.logout(e)}>Logout</a>
				  	</div>
				  	<AudioButton />
				  	<Instructions />
				  	<SheetMusic />
			  	</div>
			);
		}
		else {
			return (
		    	<div className="home">
					<header>
				    	<h1 className="description-title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
				    	<h3 className="range">The range is F1 – C7</h3>
				  	</header>
				  	<div className="logged-out-div">
				  		<Link to="/signup" className="signup-link">Signup</Link>
				  		<Link to="/login" className="login-link">Login</Link>
				  	</div>	
				  	<AudioButton />
				  	<Instructions />
				  	<SheetMusic />
			  	</div>
			);
		}
	}
};


const mapStateToProps = state => ({
	authToken: state.auth.authToken,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Home);