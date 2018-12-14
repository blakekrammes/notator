import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/TimeSignatureButton.css';
import 'font-awesome/css/font-awesome.min.css';
import {changeTimeSignature, updateMusic} from '../actions/index';

let buttons = document.getElementsByClassName('timesignatures');

export class TimeSignatureButton extends Component {

    componentDidMount() {
        document.addEventListener('click', this.removeTimeSignatureButtons);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.removeTimeSignatureButtons);
    }

    removeTimeSignatureButtons(e) {
        if (buttons[0] !== undefined && e.target.className !== 'timesignature-button home-buttons' && e.target.className !== 'time-signature-icon' && e.target.className !== 'fa fa-caret-down') {
            buttons[0].style.display = 'none';
            buttons[1].style.display = 'none';
            buttons[2].style.display = 'none';
            buttons[3].style.display = 'none';
        }
    }

    showTimeSignatureButtons() {
        if (buttons[0].style.display === 'none' || buttons[0].style.display === '') {
            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'block';
        }
        else {
            buttons[0].style.display = 'none';
            buttons[1].style.display = 'none';
            buttons[2].style.display = 'none';
            buttons[3].style.display = 'none';
        }
    }

    changeTimeSignature(e) {
        buttons[0].style.display = 'none';
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'none';
        buttons[3].style.display = 'none';
        this.props.dispatch(changeTimeSignature(e.target.textContent));
        this.props.dispatch(updateMusic());
    }

    render() {
        if (this.props.writtenNotes.length > 1) {
            return null;
        }
        else {
            return (
                <div className="timesignature-div">
                    <button className="timesignature-button home-buttons" 
                        onClick={() => this.showTimeSignatureButtons()}>
                        <img src="time-signature.png" alt="time-signature" className="time-signature-icon"/>
                            <br></br><i className="fa fa-caret-down"></i>
                        </button>
                        <div className="timesignature-buttons-div">
                            <button className="timesignatures 2/4 home-buttons" onClick={(e) => this.changeTimeSignature(e)}>2/4</button>
                            <button className="timesignatures 3/4 home-buttons" onClick={(e) => this.changeTimeSignature(e)}>3/4</button>
                            <button className="timesignatures 4/4 home-buttons" onClick={(e) => this.changeTimeSignature(e)}>4/4</button>
                            <button className="timesignatures 6/8 home-buttons" onClick={(e) => this.changeTimeSignature(e)}>6/8</button>
                        </div>
                </div>  
            );
        }
    }
} 

const mapStateToProps = state => ({
    writtenNotes: state.notator.writtenNotes
});

export default connect(mapStateToProps)(TimeSignatureButton);