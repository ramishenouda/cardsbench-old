import React from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';

import LoaderView from './../loader/loader-view'
import ErrorPage from '../error-page/error-page-view';
import PopUpBox from '../pop-up-box/pop-up-box-container';
import List from '../lists/lists-container';

import './board-details-style.css';

function BoardDetailsView(props) {
    if (props.loadingBoard) {
        return (
            <div className="board-details">
                <div className="boards-loader">
                    <div className="loader-view pb-5 mb-5 d-flex justify-content-center">
                        <LoaderView width={100} height={100} />
                    </div>
                    <div className="loader-view loader-text mt-5 pt-5 d-flex justify-content-center">
                        <h5>Loading board...</h5>
                    </div>
                </div>
            </div>
        );
    }

    if(props.errorWhileLoadingBoard) {
        return <ErrorPage code={"500"} text={"Error while loading the board."} buttonHTML = {
          <button onClick={() => props.loadBoard()} className="error-page-button">TRY AGAIN</button>
        } />
    }

    const popUpBoxContent = (
      <FormGroup className="mt-4">
        <Button onClick={props.toggleInvitingPeople} className="button button-yellow d-block button-small mb-1">
          Invite people
        </Button>
        <Button onClick={() => props.deleteBoard(props.boardId)} className="button button-danger d-block button-small">
          Delete board
        </Button>
      </FormGroup>
    );

    const invitingPopUpBoxContent = (
      <FormGroup className="mt-4">
        <Form.Label className="text-dark"> invite people </Form.Label>
        <Form.Control
          onChange={props.handleChange} 
          name="peopleEmails" 
          placeholder="user1@gmail.com, user2@outlook.com, ..." 
          autoFocus="on"
          autoComplete="off"
          value={props.peopleEmails}
        />
        <FormGroup className="mt-4">
          <Button onClick={props.toggleInvitingPeople} className="button button-small button-info mr-2">
            Back
          </Button>
          <Button type="submit" onClick={props.invitePeople} className="button button-small button-success">
            Invite
          </Button>
        </FormGroup>
      </FormGroup>
    );

    const popUpBoxStyle = {
      background: 'rgba(255, 255, 255, 0.8)',
      width: window.innerWidth > 767 ? '600px' : '',
      height: '200px',
      top: '35%',
      position:'fixed'
    }

    const popUpBoxIsOpen = props.showMenu || props.invitingPeople ? true : false

    const styleWhenPopUpBox = {
      opacity: popUpBoxIsOpen ? 0.4 : 1,
      pointerEvents: popUpBoxIsOpen ? 'none' : '',
      WebkitUserSelect: popUpBoxIsOpen? 'none' : '',
      msUserSelect: popUpBoxIsOpen? 'none' : '',
      userSelect: popUpBoxIsOpen? 'none' : ''
    }

    return (
      <div>
        <div style={ styleWhenPopUpBox } className="board-details">
          <div className="ml-1 mr-1">
            {!props.updatingBoardTitle ? (
              <div className="mt-1 mb-1">
                <span onClick={props.toggleUpdatingTitle} className="board-title"> {props.board.boardName} </span>
                <span onClick={props.toggleMenu} className="show-menu-button float-right">
                  Show Menu
                </span>
              </div>
            ) : (
              <div className="mt-1">
                <form onSubmit={props.unToggleUpdatingTitle}>
                  <input
                    onChange={props.handleChange}
                    className="board-title-input mt-1 mb-2"
                    type="text"
                    name="boardTitle"
                    value={props.boardTitle}
                    autoComplete="off"
                    autoFocus="on"
                    />
                </form>
              </div>
            )}
            <div className="board-wrapper">
              <div className="board-contents">
                <List boardId={props.board.boardId} lists={props.board.lists} />
              </div>
            </div>
          </div>
        </div>

        {
          props.showMenu ? (
            <PopUpBox
              popUpBoxContent={popUpBoxContent}
              style={popUpBoxStyle}
              showConfirmButton={false}
              cancelButtonFunction={props.toggleMenu}
              cancelButtonText="Close menu"
            />
          ) : ''
        }

        {
          props.invitingPeople && !props.showMenu ? (
            <PopUpBox
              popUpBoxContent={invitingPopUpBoxContent}
              style={popUpBoxStyle}
              cancelButtonFunction={props.toggleInvitingPeople}
              showConfirmButton={false}
              showCancelButton={false}
              cancelButtonText="Back"
              confirmButtonText="Add Users"
            />
          ) : ('')
        }

      </div>
    );
}

export default BoardDetailsView;
