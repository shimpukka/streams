import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdminButtons(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">EDIT</Link>
                    <button className="ui button negative">DELETE</button>
                </div>
            );
        }
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle alinged icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    // create button for logged-in users
    renderCreate = () => {
        if(this.props.isSignedIn) {
            return (
                <div style={ { textAlign: 'right' } }>
                    <Link to="/streams/new" className="ui button">Create stream</Link>
                </div>
            );
        }
    };

    render(){
        console.log(this.props.streams);
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),  // streams is an object, convert it to an array using Object.values
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }; 
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);