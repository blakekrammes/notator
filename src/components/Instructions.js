import React, { Component } from 'react';
import './css/Instructions.css';

export class Instructions extends Component {
	render() {
		return (
			// <div className="instruction-list">
			// 	{/*pngs courtesy of flaticon.com*/}
			// 	<div className="note-img-div wholeN">
			// 		<img className="note-img-whole" src="notes/whole.png" alt="whole-note"/>
			// 		<span className="note-img-text whole-text">w</span>
			// 	</div>
			// 	<div className="note-img-div">
			// 		<img className="note-img half" src="/notes/half.png" alt="half-note"/>
			// 		<span className="note-img-text half-text">h</span>
			// 	</div>
			// 	<div className="note-img-div">
			// 		<img className="note-img" src="/notes/quarter.png" alt="quarter-note"/>
			// 		<span className="note-img-text quarter-text">q</span>
			// 	</div>
			// 	<div className="note-img-div">
			// 		<img className="note-img" src="/notes/eighth.png" alt="eighth-note"/>
			// 		<span className="note-img-text eighth-text">e</span>
			// 	</div>
			// 	<div className="note-img-div six">
			// 		<img className="note-img sixteenth" src="/notes/sixteenth.png" alt="sixteenth-note"/>
			// 		<span className="note-img-text sixteenth-text">s</span>
			// 	</div>
			// 	<div className="note-img-div dotted-note-div">
			// 		<img className="note-img dotted-note-img" src="/notes/dotted_quarter.png" alt="dotted-quarter-note"/>
			// 		<span className="divider">|</span>
			// 		<img className="note-img note-img-dotted-half" src="/notes/dotted_half.png" alt="dotted-half-note"/>
			// 		<span className="divider one">|</span>
			// 		<span className="note-img-text etc">etc.</span>
			// 		<span className="divider two">|</span>
			// 		<span className="augmentation-dot">.</span>
			// 		<span className="note-img-text dotted-note-text">+ (note)</span> 
			// 	</div>
			// 	<div className="note-img-div x">
			// 		<img className="note-img x-img" src="/notes/x.png" alt="deletion-x"/>
			// 		<span className="note-img-text delete-text">d</span>
			// 	</div>
			// </div>
			<div className="qwerty-div">
				<ul className="cf" id="qwerty">
					<li><a href="#" className="key c87"><span>w</span></a></li>
					<li><a href="#" className="key c72"><span>h</span></a></li>
					<li><a href="#" className="key c81"><span>q</span></a></li>
					<li><a href="#" className="key c69"><span>e</span></a></li>
					<li><a href="#" className="key c83"><span>s</span></a></li>
					<li><a href="#" className="key c190 alt"><b>&gt;</b><span>.</span></a></li>
					<li><a href="#" className="key c46" id="delete"><span>Delete</span></a></li>
				</ul>
			</div>
    //     <ul class="cf" id="asdfg">
	//     	<li><a href="#" class="key c20 alt" id="caps"><b></b><span>caps lock</span></a></li>
	//     	<li><a href="#" class="key c65"><span>a</span></a></li>
	//     	<li><a href="#" class="key c83"><span>s</span></a></li>
	//     	<li><a href="#" class="key c68"><span>d</span></a></li>
	//     	<li><a href="#" class="key c70"><span>f</span></a></li>
	//     	<li><a href="#" class="key c71"><span>g</span></a></li>
	//     	<li><a href="#" class="key c72"><span>h</span></a></li>
	//     	<li><a href="#" class="key c74"><span>j</span></a></li>
	//     	<li><a href="#" class="key c75"><span>k</span></a></li>
	//     	<li><a href="#" class="key c76"><span>l</span></a></li>
	//     	<li><a href="#" class="key c186 alt"><b>:</b><span>;</span></a></li>
	//     	<li><a href="#" class="key c222 alt"><b>"</b><span>'</span></a></li>
	//     	<li><a href="#" class="key c13 alt" id="enter"><span>return</span></a></li>
    //     </ul>
    //     <ul class="cf" id="zxcvb">
	//     	<li><a href="#" class="key c16 shiftleft"><span>Shift</span></a></li>
	//     	<li><a href="#" class="key c90"><span>z</span></a></li>
	//     	<li><a href="#" class="key c88"><span>x</span></a></li>
	//     	<li><a href="#" class="key c67"><span>c</span></a></li>
	//     	<li><a href="#" class="key c86"><span>v</span></a></li>
	//     	<li><a href="#" class="key c66"><span>b</span></a></li>
	//     	<li><a href="#" class="key c78"><span>n</span></a></li>
	//     	<li><a href="#" class="key c77"><span>m</span></a></li>
	//     	<li><a href="#" class="key c188 alt"><b>&lt;</b><span>,</span></a></li>
	//     	<li><a href="#" class="key c190 alt"><b>&gt;</b><span>.</span></a></li>
	//     	<li><a href="#" class="key c191 alt"><b>?</b><span>/</span></a></li>
	//     	<li><a href="#" class="key c16 shiftright"><span>Shift</span></a></li>
    //     </ul>
	// 	<ul class="cf" id="bottomrow">
	//     	<li><a href="#" class="key" id="fn"><span>fn</span></a></li>
	//     	<li><a href="#" class="key c17" id="control"><span>control</span></a></li>
	//     	<li><a href="#" class="key option" id="optionleft"><span>option</span></a></li>
	//     	<li><a href="#" class="key command" id="commandleft"><span>command</span></a></li>
	//     	<li><a href="#" class="key c32" id="spacebar"></a></li>
	//     	<li><a href="#" class="key command" id="commandright"><span>command</span></a></li>
	//     	<li><a href="#" class="key option" id="optionright"><span>option</span></a></li>
    //         <ol class="cf">
    //         	<li><a href="#" class="key c37" id="left"><span></span></a></li>
    //             <li>
    //             	<a href="#" class="key c38" id="up"><span></span></a>
    //             	<a href="#" class="key c40" id="down"><span></span></a>
    //             </li>
    //         	<li><a href="#" class="key c39" id="right"><span></span></a></li>
    //         </ol>
    //     </ul>
    // </div>
		);
	}
}