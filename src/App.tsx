import React,{ Component } from 'react';

interface HomeProps {
  home: string;
}
 
interface HomeState {
  home: string;
}
 
class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      home: "HomePage"
    }
  }
  render() { 
    return (
      <div className="App">
        <h1>React {this.state.home}</h1>
      </div>
    );
  }
}
 
export default Home;