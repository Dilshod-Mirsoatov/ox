import {useState} from "react";
import {Table} from "antd";
import {connect} from "react-redux";


const AppTable =({data,loader})=>{
    const [column, setColumn] = useState([
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
        },
    ])
    return <Table loading={loader} dataSource={data} columns={column} />
}
const propsToState = state => {
    return {
        loader: state?.loader
    }
};
export default connect(propsToState, null)(AppTable);