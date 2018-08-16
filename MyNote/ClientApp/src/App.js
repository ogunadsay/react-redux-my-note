import React, { Component } from 'react';

import NoteList from './components/NoteList';
import Buttons from './components/Buttons';
import NoteDetail from './components/NoteDetail'


class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-10">
                        <Buttons/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{ maxHeight: 500, overflowY: "scroll" }}>
                        <NoteList/>
                    </div>
                    <div className="col-md-8">
                        <NoteDetail/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
