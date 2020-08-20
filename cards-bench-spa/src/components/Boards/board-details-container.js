import React, { Component } from 'react'
import BoardDetailsView from './board-details-view'

class BoardDetails extends Component {
    render() {
        return (
            <BoardDetailsView boardId={this.props.match.params.boardId} />
        )
    }
}

export default BoardDetails;
