import request from '@/common/axios';
import axios from 'axios';
import * as React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";

// react-router-dom
import { Link } from "react-router-dom"

interface HomeProps {
    count: number;
    history: any;
}
 
interface HomeState {
    home: string;
}
 
class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { home:"Hello React!!!"  };
    }
    render() { 
        return ( 
            <div className="homePage">
                <h1>{this.state.home}</h1>
                <h1>{this.props.count}</h1>
                <Link to="/other">跳转到 Other 页面</Link>
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