import axios from "axios";

class http {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });

        this.client.interceptors.request.use(config => {
            const public_urls = ['login', 'users/register']
            if (!public_urls.includes(config.url)){
                config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
            }
            console.log('Fron interceptor', config);
            return config;
        }, error => {
            return Promise.reject(error);
        })

        this.client.interceptors.response.use(res => res.data, error => {
            console.log('Error fron interceptor: ');
            let is401 = false;
            if (!error.response) {
                is401 = error.response.status === 401;
            } else if (!error.request) {
                is401 = error.request.status === 401;
            } else {
                is401 = error.message === 'Request failed with status code 401';
            }
            console.log('error: ', is401? '401' : 'desconocido');
            console.log(error.config);
            return Promise.reject(error);
        })
    }

    get (url, config = {}) {
        return this.client.get(url, config)
    }

    post (url, data, config) {
        return this.client.post(url, data, config)
    }

    put (url, data, config) {
        return this.client.put(url, data, config)
    }

    patch (url, data, config) {
        return this.client.patch(url, data, config)
    }

    delete (url, config) {
        return this.client.delete(url, config)
    }

    setToken (token) {
        this.client.defaults.headers.common['Authorization'] = `token ${token}`
    }

    unsetToken () {
        delete this.client.defaults.headers.common['Authorization']
    }

}

export default new http();