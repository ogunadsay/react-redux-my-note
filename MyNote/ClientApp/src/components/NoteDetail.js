import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateNote } from '../actions/index';
import { actionCreators } from '../store/Notes'
import { bindActionCreators } from 'redux';

export class NoteDetail extends Component {
    render() {

        if (this.props.selectedNote.length === 0) {
            return "Please select a note..."
        }
        return (
            <textarea
                ref={input => input && input.focus()}
                style={{ height: 500 }}
                className="form-control"
                id={this.props.selectedNote.id}
                value={this.props.selectedNote.text}
                onChange={(e) => this.props.updateNote({ id: e.target.id, text: e.target.value })} />
        )
    }
}
const mapStateToProps = (state) => {
    return { selectedNote: state.selected }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);