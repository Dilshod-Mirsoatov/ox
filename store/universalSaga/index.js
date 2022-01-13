import {call, put, takeEvery} from "redux-saga/effects";
import Req from "../api";
import {redirect, setToast} from "../actions";
import {
    AUTH, GET_PRODUCTS
} from "../types";

function parser(type){
    return type.split(' ');
}

function* Get(action){
    try{
        const [method,url] = parser(action.type);
        yield put({
            type: 'loader',
            payload: true
        })
        const {data} = yield Req({
            type: action.type,
        });
        yield put({
            type: 'loader',
            payload: false
        })
        yield put({
            type: 'data',
            payload: data.items
        })
        yield put({
            type: 'totalCount',
            payload: data.total_count
        });
    }
    catch(err){
        const {data} = err.response;
        yield put(setToast({
            type: 'error',
            message: data?.content
        }));
        if(data.status === 401){
            localStorage.removeItem('token');
            yield put({
                type: 'isUser',
                payload: false
            })
        }
    }
}
function* Auth(action){
    try{
        const [method,url] = parser(action.type);
        const formData = new FormData();
        for (const key in action.payload) {
            console.log(key);
            formData.append(`${key}`, action.payload[key]);
        }
        yield put({
            type: 'loader',
            payload: true
        })
        const {data} = yield Req({
            type: action.type,
            data: formData,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        localStorage.setItem('token', data.token);
        yield put({
            type: 'isUser',
            payload: true
        });
        yield put({
            type: 'loader',
            payload: false
        });
        yield put(setToast({
            type: 'success',
            message: 'Success!'
        }));
        redirect(`/dashboard`);
    }
    catch (err){
        const {data} = err.response;
        if(data.status === 401){
            localStorage.removeItem('token');
            yield put({
                type: 'isUser',
                payload: false
            })
        }
        yield put(setToast({
            type: 'error',
            message: data?.content
        }));
    }
}



export default function* rootSaga() {
    yield takeEvery(AUTH, Auth);
    yield takeEvery(GET_PRODUCTS, Get);
}