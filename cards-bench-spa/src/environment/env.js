let APIURI;

if (process.env.NODE_ENV !== 'production') {
    APIURI = 'http://localhost:5000/api/';
} else {
    APIURI = 'https://cardsbench.herokuapp.com/api/';    
}

export { APIURI };
