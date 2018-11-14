import React, { Component } from 'react';
import './Instructions.css';

export class Instructions extends Component {
	render() {
		return (
			<div className="instruction-list">
				{/*pngs courtesy of flaticon.com*/}
				<div className="note-img-div wholeN">
					<img className="note-img-whole" src="notes/whole.png" alt="whole-note"/>
					<span className="note-img-text whole-text">w</span>
				</div>
				<div className="note-img-div">
					<img className="note-img half" src="/notes/half.png" alt="half-note"/>
					<span className="note-img-text half-text">h</span>
				</div>
				<div className="note-img-div">
					<img className="note-img" src="/notes/quarter.png" alt="quarter-note"/>
					<span className="note-img-text quarter-text">q</span>
				</div>
				<div className="note-img-div">
					<img className="note-img" src="/notes/eighth.png" alt="eighth-note"/>
					<span className="note-img-text eighth-text">e</span>
				</div>
				<div className="note-img-div six">
					<img className="note-img sixteenth" src="/notes/sixteenth.png" alt="sixteenth-note"/>
					<span className="note-img-text sixteenth-text">s</span>
				</div>
				<div className="note-img-div dotted-note-div">
					<span className="tooltip">
						<img className="note-img dotted-note-img" src="/notes/dotted_quarter.png" alt="dotted-quarter-note"/>
						<span className="divider">|</span>
						<img className="note-img" src="/notes/dotted_half.png" alt="dotted-half-note"/>
						<span className="divider one">|</span>
						<span className="note-img-text etc">etc.</span>
						<span className="divider two">|</span>
						<span className="augmentation-dot">.</span>
						<span className="note-img-text dotted-note-text">+ (note)</span> 
						<span className="note-img-text tooltip-text">up to dotted eighths</span>
					</span>
				</div>
				<div className="note-img-div x">
					<img className="note-img x-img" src="/notes/x.png" alt="deletion-x"/>
					<span className="note-img-text delete-text">d</span>
				</div>
			</div>
		);
	}
}