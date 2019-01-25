import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Instructions } from './Instructions';
import AudioButton from './AudioButton';
import ClefButton from './ClefButton';
import TimeSignatureButton from './TimeSignatureButton';
import Pitch from './Pitch';
import SheetMusic from './SheetMusic';
import { clearAuth, authError, setDemo } from '../actions/auth';
import { clearAuthToken } from '../localStorage';
import './css/Home.css';

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
           				<h1 className="main-title"><Link to="/">Notator</Link></h1>
						<div className="logged-in-div">
				  			<Link to="/mycompositions" className="compositions-link">Compositions</Link>
				  			<a className="logout-link" href="" onClick={(e) => this.logout(e)}>Logout</a>
							<Link to="/instructions" className="instructions-link">Instructions</Link>
				  		</div>
				  	</header>
					<main>
						<p className="status"><i>You are logged in as {this.props.currentUser.username}</i></p>
						<div className="abc-buttons">
							<AudioButton />
							<ClefButton />
							<TimeSignatureButton />
						</div>
						<Pitch />
						<Instructions />
						<SheetMusic />
					</main>
			  	</div>
			);
		}
		else if (this.props.demo === true) {
			return (
		    	<div className="home">
					<header>
						<h1 className="main-title"><Link to="/">Notator</Link></h1>
						<div className="logged-in-div">
							<Link to="/mycompositions" className="compositions-link">Compositions</Link>
							<a className="logout-link" href="" onClick={(e) => this.logout(e)}>Logout</a>
							<Link to="/instructions" className="instructions-link">Instructions</Link>
						</div>
				  	</header>
					<main>
						<p className="status"><i>You are logged in as democrates</i></p>
						<div className="abc-buttons">
							<AudioButton />
							<ClefButton />
							<TimeSignatureButton />
						</div>
						<Pitch />
						<Instructions />
						<SheetMusic />
					</main>
			  	</div>
			);
		}
		else {
			return (
		    	<div className="home">
					<header>
						<h1 className="main-title"><Link to="/">Notator</Link></h1>
						<div className="logged-out-div">
							<Link to="/signup" className="signup-link">Signup</Link>
							<Link to="/login" className="login-link">Login</Link>
							<a href="" className="demo-link" onClick={(e) => this.startDemo(e)}>Demo</a>
							<Link to="/instructions" className="instructions-link">Instructions</Link>
				  		</div>
				  	</header>
					<main>
						<div className="abc-buttons">
							<AudioButton />
							<ClefButton />
							<TimeSignatureButton />
						</div>
						<Pitch />
						<Instructions />
						<SheetMusic />
					</main>
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