import Axios from 'axios';
function Req ({type, data, headers, query}){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [method, url, key] = URLParser(type);
    const token = `Bearer ${localStorage.getItem('token')}`;
    return Axios({
        url: `${baseUrl}/${url}`,
        method: method ? method : "GET",
        data: data ? data : {},
        query: query ? query : {},
        headers: headers ? {
            ...headers,
            Authorization: token
        } : {
            Authorization: token
        },
    });
}

function URLParser(string){
    return string.split(' ');
}
export default Req;
export {Req, URLParser};