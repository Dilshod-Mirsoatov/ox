import Auth from "../../components/Auth";
import {useEffect, useState} from "react";
import {GET_PRODUCTS} from "../../store/types";
import {connect, useDispatch} from "react-redux";
import {Col, Input, Layout, Row} from "antd";
import AppTable from "../../components/AppTable";

const {Content} = Layout;

const Dashboard = ({data = new Array(), totalCount = 0})=>{
    const dispatch = useDispatch();
    const [customData, setCustomData] = useState();
    useEffect(()=>{
        dispatch({
            type: GET_PRODUCTS,
        })
    },[]);
    useEffect(()=>{
        setCustomData(data);
    },[data]);

    const sort = (e)=>{
        const value = e.target.value;
        if(value === ''){
            setCustomData(data);
        }else{
            const sortArray = new Array();
            for (const d of data) {
                const index = d.name.toLowerCase().indexOf(value.toLowerCase());
                if(index >= 0){
                    sortArray.push(d);
                }
            }
            for (const i in sortArray) {
                const index = sortArray[i].name.toLowerCase().indexOf( value.toLowerCase() );
                for (const j in sortArray) {
                    const nextIndex = sortArray[j].name.toLowerCase().indexOf( value.toLowerCase());
                    if(index < nextIndex){
                        const first = sortArray[i];
                        const last = sortArray[j];
                        sortArray[i] = last;
                        sortArray[j] = first;
                    }
                }
            }
            setCustomData(sortArray);
        }
    }
    return(
        <Auth>
            <Layout>
                <Content className="dashboard">
                    <Row justify="center">
                        <Col span={18}>
                            <Row justify='end' className="py">
                                <Col span={8}>
                                    <Input onKeyUp={sort}/>
                                </Col>
                            </Row>
                            <AppTable count={totalCount} data={customData}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Auth>
    )
}

const propsToState = state => {
    return {
        data: state?.data,
        totalCount: state?.totalCount
    }
};
export default connect(propsToState, null)(Dashboard);