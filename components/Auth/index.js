import {useEffect} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";

const Auth=({children,isUser = true})=>{
    const router = useRouter();
    useEffect(()=>{
        if(!isUser){
            router.push("/");
        }
    },[isUser]);
    return children
}
const propsToState = state => {
    return {
        isUser: state?.isUser
    }
};
export default connect(propsToState, null)(Auth);