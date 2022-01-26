import * as React from 'react';
import { Component } from 'react';

interface OtherProps {
  
}
 
interface OtherState {
  
}
 
class Other extends React.Component<OtherProps, OtherState> {
  constructor(props: OtherProps) {
    super(props);
  }
  render() { 
    return ( 
      <div>
        <h1>OtherPage</h1>
      </div>
     );
  }
}
 
export default Other;