import React, { Component } from 'react';
import { connect } from 'react-redux';
import Story, { StoryProps } from '../components/story';
import { StoryRevealRequest, StoryResetRequest, UserRenameRequest, StoryRenameRequest } from '../store/actions';
import io from 'socket.io-client';
import { StoreState } from 'src/store/model';

interface DashboardProps extends StoryProps {
    CurrentUserId: string | null;
}

interface DashboardDispatch {
    StoryReveal: typeof StoryRevealRequest;
    StoryReset: typeof StoryResetRequest;
    StoryRename: typeof StoryRenameRequest;
    UserRename: typeof UserRenameRequest;
}
class Dashboard extends Component<DashboardProps & DashboardDispatch> {
    userRename = (newName: string) => {
        if (this.props.CurrentUserId !== null) {
            this.props.UserRename(this.props.CurrentUserId, newName);
        }
    };

    componentDidMount() {
        var socket = io.connect('http://localhost');
        socket.on('news', function(data: any) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
    }
    render() {
        return (
            <Story
                Title={this.props.Title}
                IsVoteRevealed={this.props.IsVoteRevealed}
                Users={this.props.Users}
                CurrentUsername={this.props.CurrentUsername}
                CurrentUserId={this.props.CurrentUserId}
                StoryReset={this.props.StoryReset}
                StoryReveal={this.props.StoryReveal}
                UserRename={this.userRename}
                StoryRename={this.props.StoryRename}
            ></Story>
        );
    }
}

function mapStateToProps(state: StoreState): DashboardProps {
    const currentUserId = state.users.currentUserId;
    const currentUser = state.users.users.find(u => u.id === currentUserId);

    return {
        Title: state.story.Title,
        IsVoteRevealed: state.story.IsVoteRevealed,
        Users: state.users.users,
        CurrentUserId: currentUserId,
        CurrentUsername: currentUser ? currentUser.name : '',
    };
}

const mapDispatchToProps: DashboardDispatch = {
    StoryReveal: StoryRevealRequest,
    StoryReset: StoryResetRequest,
    StoryRename: StoryRenameRequest,
    UserRename: UserRenameRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
