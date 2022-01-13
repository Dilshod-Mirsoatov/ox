import {all} from 'redux-saga/effects'
import universalSaga from "./universalSaga";

export default function* rootSaga() {
    yield all([
        universalSaga()
    ]);
}