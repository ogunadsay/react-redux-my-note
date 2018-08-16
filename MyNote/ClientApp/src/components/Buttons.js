import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNote, deleteNote } from '../actions/index';
import { actionCreators } from '../store/Notes'
import { bindActionCreators } from 'redux';

export class Buttons extends Component {
    randomString(length = 16, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    render() {
        return (
            <div>
                <button className="btn btn-info float-right" type="button" onClick={() => { this.props.addNote({ text: "" }) }}>+</button>
                <button className="btn btn-danger float-right" type="button" onClick={() => { this.props.deleteNote(this.props.selectedNote.id) }} disabled={!this.props.deleteButtonEnabled}>x</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { selectedNote: state.selected, deleteButtonEnabled: state.deleteButtonEnabled }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
