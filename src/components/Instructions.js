import React, { Component } from 'react';

export class Instructions extends Component {
	render() {
		return (
			<ul>
				<li>for whole notes: press w</li>
				<li>for half notes: press h</li>
				<li>for quarter notes: press q</li>
				<li>for eighth notes: press e</li>
				<li>for sixteenth notes: press s</li>
				<li>to create a dotted note: press . plus the base note value (up to dotted eighths)</li>
				<li>to delete notes: press d</li>
			</ul>
		);
	}
}