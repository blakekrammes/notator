import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/DetailedInstructions.css';

export default class DetailedInstructions extends Component {
	render() {     
		return (
			<div>
				<header>
					<h1 className="main-title"><Link to="/">Notator</Link></h1>
				</header>
				<div className="detailed-instructions-div">
					<div className="main-instructions">
						<h2>play or sing into the microphone to create music notation</h2>
						<div className="detailed-instructions-step-one-div">
							<h3>1. to begin, click
							</h3>
							<i className="fa fa-microphone detailed-instructions-mic-icon"></i>
						</div>
						<h3>2. play or sing into the microphone – the range is F1 – C7</h3>
						<h3>3. while a note displays, press or click the relevant keyboard key to write it</h3>
					</div>
					<ul className="detailed-instructions-list">
						<div className="detailed-instructions-line-flex-container">
							<li>whole notes 
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c87"><span>w</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>half notes
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c72"><span>h</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>quarter notes 
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c81"><span>q</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>eighth notes
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c69"><span>e</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>sixteenth notes
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c83"><span>s</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>dotted notes, first press/click
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
								<a href="#" className="key c190 alt"><b>&gt;</b><span>.</span>
								</a>
								</li>
							</ul>
						</div>
						<div className="detailed-instructions-line-flex-container">
							<li>delete notes 
							</li>
							<ul className="cf detailed-instructions-qwerty" id="qwerty">
								<li>
									<a href="#" className="key c46" id="delete"><span>Delete</span>
									</a>
								</li>
							</ul>
						</div>
					</ul>
					<h3>4. after writing notes, you can play back or download the <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/MIDI">MIDI</a></h3>
					<h3>5. if you have an account, you can click the 'Save' link to have Notator save your composition</h3>
				</div>
			</div>
		);
	}
};