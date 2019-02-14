import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickKeyboardKey, updateMusic, pressAugmentationDot, releaseAugmentationDot } from '../actions/index';
import './css/Instructions.css';
import HandleNotes from './HandleNotes';

export class Instructions extends Component {
	onMouseDown(e) {
		e.preventDefault();
		let keyCode;
		// directs the clicks on the css apple keyboard keys for writing notation
		switch(e.target.textContent) {
			case 'Delete':
			keyCode = 8;
			break
			case 'w':
			keyCode = 87;
			break
			case 'h':
			keyCode = 72;
			break
			case 'q':
			keyCode = 81;
			break
			case 'e':
			keyCode = 69;
			break
			case 's':
			keyCode = 83;
			break
			case '.':
			keyCode = 190;
			this.props.dispatch(pressAugmentationDot());
			break
			case '>':
			keyCode = 190;
			this.props.dispatch(pressAugmentationDot());
			break
			default:
			break
		}
		let fabricatedEvent = {
			keyCode: keyCode,
			clickEvent: true
		}	
		// call HandleNotes' method to filter the pitch through the notation code
		this.child.pressKey(fabricatedEvent);	
		this.props.dispatch(updateMusic());
		}
	onMouseUp(e) {
		if (e.target.textContent === '.' || e.target.textContent === '>') {
			this.props.dispatch(releaseAugmentationDot());
		}
	}
	render() {
		return (
			<div className="qwerty-div">
				<HandleNotes onRef={ref => (this.child = ref)} 
							 wholeNoteKey={this.wholeNoteKey}
							 halfNoteKey={this.halfNoteKey}
							 quarterNoteKey={this.quarterNoteKey}
							 eighthNoteKey={this.eighthNoteKey}
							 sixteenthNoteKey={this.sixteenthNoteKey}
							 augmentationDotKey={this.augmentationDotKey}
							 deleteKey={this.deleteKey} />
				<ul className="cf" id="qwerty">
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.wholeNoteKey = ref}
						   href="#" className="key c87"><span>w</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.halfNoteKey = ref}
						   href="#" className="key c72"><span>h</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.quarterNoteKey = ref}
						   href="#" className="key c81"><span>q</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.eighthNoteKey = ref}
						   href="#" className="key c69"><span>e</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.sixteenthNoteKey = ref}
						   href="#" 
						   className="key c83"><span>s</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.augmentationDotKey = ref}
						   href="#" className="key c190 alt"><b>&gt;</b><span>.</span>
						</a>
					</li>
					<li>
						<a onMouseDown={(e) => this.onMouseDown(e)} 
						   onMouseUp={(e) => this.onMouseUp(e)} 
						   ref={ref => this.deleteKey = ref}
						   href="#" className="key c46" id="delete"><span>Delete</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clickKeyboardKey: (key) => {
			dispatch(clickKeyboardKey(key))
		}
	}
};

export default connect(mapDispatchToProps)(Instructions);