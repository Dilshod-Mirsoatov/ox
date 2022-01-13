import {connect} from "react-redux";
import {useCallback, useEffect, useMemo} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const Toast = (props)=>{
    const {toastContent = {}} = props;
    const {message,type} = toastContent;
    useEffect(()=>{
        if(Object.keys(toastContent).length){
            switch (type){
                case 'error':
                    toast.error(message);
                    break;
                case 'success':
                    toast.success(message);
                    break;
                case 'info':
                    toast.info(message);
                    break;
                case 'warning':
                    toast.info(message);
                    break;
            }
        }
    },[toastContent]);
    return <ToastContainer/>
}
const propsToState = state => {
    return {toastContent: state?.toast}
};
export default connect(propsToState, null)(Toast);