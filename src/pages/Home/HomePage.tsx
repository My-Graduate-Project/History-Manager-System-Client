import request from '@/common/axios';
import axios from 'axios';
import * as React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";

import {getRandomData} from "@/api/home"

interface HomeProps {
    count: number;
}
 
interface HomeState {
    home: string;
}
 
class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        console.log(props)
        super(props);
        this.state = { home:"Hello React!!!"  };
    }
    componentDidMount() {
        axios.get("http://localhost:8080/getdata").then(res=>{
            console.log(res)
        })
       getRandomData().then(res => {
           console.log(res)
       })
    }
    render() { 
        return ( 
            <div className="homePage">
                <h1>{this.state.home}</h1>
                <h1>{this.props.count}</h1>
            </div>
         );
    }
}

// 将 state 中的数据映射到组件的 props 上
const mapStateToProps = (state: any) => {
    return {
        count: state.count
    };
}

// 将 action 映射到组件的 props 上
// const mapDispatchToProps = (dispatch: any) => {}
 
export default connect(mapStateToProps)(Home);