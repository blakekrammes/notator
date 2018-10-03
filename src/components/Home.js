import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Instructions} from './Instructions';
import AudioButton from './AudioButton';
import SheetMusic from './SheetMusic';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../localStorage';
import './Home.css';

export class Home extends Component {
	logout(e) {
		e.preventDefault();
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render() {	
		if (this.props.authToken && this.props.currentUser !== null) {
			return (
		    	<div className="home">
					<header>
				    	<h1 className="title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
				    	<h3 className="range">The range is F1 – C7</h3>
				  	</header>
				  	<p>You are logged in as {this.props.currentUser.username} </p>
				  	<a href="" onClick={(e) => this.logout(e)}>Logout</a>
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
				    	<h1 className="title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
				    	<h3 className="range">The range is F1 – C7</h3>
				  	</header>
				  	<p><Link to="/signup">Signup</Link></p>
				  	<p><Link to="/login">Login</Link></p>
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