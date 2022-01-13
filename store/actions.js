// action functions
import Router from "next/router";

const redirect = (path) => {
    Router.push(path);
}
const setToast = (props) => {
    const {type = 'error', message = 'Error'} = props;
    return {
        type: "Toast",
        payload: {
            type: type,
            message: typeof message === 'object' ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : message
        }
    }
}
export {
    redirect,
    setToast
}