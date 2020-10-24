import axios from 'axios';
import URI from './api-url';

export async function createBoard(boardInfo, userId) {
    const options = {
        url: `${URI}${userId}/boards/`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            name: boardInfo.boardName
        }
    };

    return (await axios(options));
}

export async function getBoard(userId, boardId) {
    const options = {
        url: `${URI}${userId}/boards/${boardId}`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function addUsersToBoard(userId, boardId, usersEmail) {
    const options = {
        url: `${URI}${userId}/boards/addusers`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            'usersEmails': usersEmail,
            'boardId': boardId
        }
    };

    return (await axios(options));
}

export async function deleteBoard(boardId, userId) {
    const options = {
        url: `${URI}${userId}/boards/${boardId}`,
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function updateBoard(userId, boardInfo) {
    const options = {
        url: `${URI}${userId}/boards/`,
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            boardId: boardInfo.boardId,
            boardName: boardInfo.boardName,
        }
    };

    return (await axios(options));
}

export async function getUserBoards(userId) {
    const options = {
        url: `${URI}${userId}/boards/userboards`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}
