// REDUX
import React, { Component } from 'react';

class ContainerComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <App value={this.props}/>
            <UnApp value={this.props}/>
        )
    }
}

class UnApp extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'This is UnApp' };
    }

    render() {
        const { text } = this.state;
        return (
            <div>
                <h1>{text}</h1>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>This is React Ninja</div>;
    }
}

export default App;

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
