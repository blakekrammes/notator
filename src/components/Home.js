import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Instructions} from './Instructions';
import AudioButton from './AudioButton';
import SheetMusic from './SheetMusic';
import {clearAuth, authError, setDemo} from '../actions/auth';
import {clearAuthToken} from '../localStorage';
import './Home.css';

export class Home extends Component {
	startDemo(e) {
		e.preventDefault();
		this.props.dispatch(setDemo());
	}
	logout(e) {
		e.preventDefault();
		if (this.props.demo === true) {
			this.props.dispatch(setDemo());
		}
		else {
			this.props.dispatch(clearAuth());
			clearAuthToken();
		}
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
				    	<h3 className="range">The range is F1 – C7  ~   <Link to="/instructions">Instructions</Link></h3>
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
		else if (this.props.demo === true) {
			return (
		    	<div className="home">
					<header>
				    	<h1 className="description-title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
				    	<h3 className="range">The range is F1 – C7  ~   <Link to="/instructions">Instructions</Link></h3>
				  	</header>
				  	<div className="logged-in-div">
				  		<p className="status">You are logged in as democrates</p>
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
				    	<h3 className="range">The range is F1 – C7   ~   <Link to="/instructions">Instructions</Link></h3>
				  	</header>
				  	<div className="logged-out-div">
				  		<Link to="/signup" className="signup-link">Signup</Link>
				  		<Link to="/login" className="login-link">Login</Link>
				  		<a href="" className="demo-link" onClick={(e) => this.startDemo(e)}>Demo</a>
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
	currentUser: state.auth.currentUser,
	demo: state.auth.demo
});

export default connect(mapStateToProps)(Home);