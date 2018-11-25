import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TimeSignatureButton.css';
import 'font-awesome/css/font-awesome.min.css';
import {changeTimeSignature, updateMusic} from '../actions/index';

let buttons = document.getElementsByClassName('timesignatures');

export class TimeSignatureButton extends Component {

    showTimeSignatureButtons() {
        if (buttons[0].style.display === 'none' || buttons[0].style.display === '') {
            buttons[0].style.display = 'inline-block';
            buttons[1].style.display = 'inline-block';
            buttons[2].style.display = 'inline-block';
            buttons[3].style.display = 'inline-block';
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
                    <button className="timesignature-button" 
                        onClick={() => this.showTimeSignatureButtons()}>
                        Change Time Signature
                        <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="timesignature-buttons-div">
                            <button className="timesignatures 2/4" onClick={(e) => this.changeTimeSignature(e)}>2/4</button>
                            <button className="timesignatures 3/4" onClick={(e) => this.changeTimeSignature(e)}>3/4</button>
                            <button className="timesignatures 4/4" onClick={(e) => this.changeTimeSignature(e)}>4/4</button>
                            <button className="timesignatures 6/8" onClick={(e) => this.changeTimeSignature(e)}>6/8</button>
                        </div>
                </div>  
            );
        }
    }
} 

const mapStateToProps = state => ({
    writtenNotes: state.singer.writtenNotes
});

export default connect(mapStateToProps)(TimeSignatureButton);