import * as React from 'react';
import { Component } from 'react';

interface HomeProps {
     home: string;
}
 
interface HomeState {
    home: string;
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { home:"Hello React!!!"  };
    }
    render() { 
        return ( 
            <div className="homePage">
                <h1>{this.state.home}</h1>
            </div>
         );
    }
}
 
export default Home;