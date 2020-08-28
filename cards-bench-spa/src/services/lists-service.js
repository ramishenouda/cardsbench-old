import axios from 'axios';

export async function getList(listId, listControllerParams) {
    const options = {
        url: `http://localhost:5000/api/${listControllerParams.userId}/${listControllerParams.boardId}/lists/${listId}`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function addList(listTitle, listControllerParams) {
    const options = {
        url: `http://localhost:5000/api/${listControllerParams.userId}/${listControllerParams.boardId}/lists`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            title: listTitle
        }
    };

    return (await axios(options));
}

export async function deleteList(listId, listControllerParams) {
    const options = {
        url: `http://localhost:5000/api/${listControllerParams.userId}/${listControllerParams.boardId}/lists/${listId}`,
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function updateList(listInfo, listControllerParams) {
    const options = {
        url: `http://localhost:5000/api/${listControllerParams.userId}/${listControllerParams.boardId}/lists`,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            title: listInfo.title,
            listId: listInfo.listId
        }
    };

    return (await axios(options));
}
