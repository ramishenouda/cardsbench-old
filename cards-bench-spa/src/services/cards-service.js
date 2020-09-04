import axios from 'axios';

export async function getCard(cardId, controllerParams) {
    const options = {
        url: `http://localhost:5000/api/${controllerParams.userId}/${controllerParams.boardId}/${controllerParams.listId}/cards/${cardId}`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function addCard(cardTitle, controllerParams) {
    const options = {
        url: `http://localhost:5000/api/${controllerParams.userId}/${controllerParams.boardId}/${controllerParams.listId}/cards`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            title: cardTitle
        }
    };

    return (await axios(options));
}

export async function deleteCard(cardId, controllerParams) {
    const options = {
        url: `http://localhost:5000/api/${controllerParams.userId}/${controllerParams.boardId}/${controllerParams.listId}/cards/${cardId}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    return (await axios(options));
}

export async function updateCard(cardInfo, controllerParams) {
    const options = {
        url: `http://localhost:5000/api/${controllerParams.userId}/${controllerParams.boardId}/${controllerParams.listId}/cards`,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
            cardId: cardInfo.cardId,
            title: cardInfo.title,
            order: cardInfo.order
        }
    };

    return (await axios(options));
}
