export const keyMirror = (object) => {
        for (let key in object) {
            object[key] = key;
        }
        return object;
    };

export const get = (uri) => fetch('/api/' + uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (Math.floor(response.status / 100) !== 2) {
                throw response;
            }
            return response;
        })
        .then(response => response.text())
        .then(text => text ? JSON.parse(text) : {});

export const post = (uri, body) => fetch('/api/' + uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

        .then(response => {
            if (Math.floor(response.status / 100) !== 2) {
                throw response;
            }
            return response;
        })
        .then(response => response.text())
        .then(text => text ? JSON.parse(text) : {});