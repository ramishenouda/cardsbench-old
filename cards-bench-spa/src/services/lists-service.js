import axios from 'axios';
import { APIURI as URI } from '../environment/env';

export async function getList(listId, listControllerParams) {
    const options = {
        url: `${URI}${listControllerParams.userId}/${listControllerParams.boardId}/lists/${listId}`,
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
        url: `${URI}${listControllerParams.userId}/${listControllerParams.boardId}/lists`,
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
        url: `${URI}${listControllerParams.userId}/${listControllerParams.boardId}/lists/${listId}`,
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
        url: `${URI}${listControllerParams.userId}/${listControllerParams.boardId}/lists`,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            listId: listInfo.listId,
            title: listInfo.title,
            order: listInfo.order
        }
    };

    return (await axios(options));
}
