import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectNote } from '../actions/index';
import { actionCreators } from '../store/Notes'
import { bindActionCreators } from 'redux';

// const ConnectedList = ({ notes }) => (
//     <ul onClick={()=>this.props.selectNote} className="list-group list-group-flush">
//       {notes.map(el => (
//         <li className="list-group-item" key={el.id}>
//           {el.text}
//         </li>
//       ))}
//     </ul>
//   );

export class NoteList extends Component {
    componentDidMount() {
        this.props.getNotes();
    }
    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    {this.props.notes.map(el => {
                        let textToShow = "";
                        if (el.text.length <= 50)
                            textToShow = el.text;
                        else
                            textToShow = el.text.substring(0, 50) + "...";
                        return (<li onClick={() => this.props.selectNote(el)} className="list-group-item" key={el.id}>
                            {textToShow}
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { notes: state.notes };
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)


// const NoteList =  connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
// export default NoteList;

export default connect(mapStateToProps, mapDispatchToProps)(NoteList)