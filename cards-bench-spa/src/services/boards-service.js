import axios from 'axios';

export async function createBoard(boardInfo, userId) {
    const options = {
        url: `http://localhost:5000/api/${userId}/boards/create`,
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

export async function deleteBoard(boardId, userId) {
    const options = {
        url: `http://localhost:5000/api/${userId}/boards/delete`,
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            boardId: boardId
        }
    };

    return (await axios(options));
}

export async function getUserBoards(userId) {
    const options = {
        url: `http://localhost:5000/api/${userId}/boards/user`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };
    return (await axios(options));
}
