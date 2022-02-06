import * as React from 'react'
import { Component } from 'react'

interface HomePageProps {}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props)
    this.state = {}
  }
  render() {
    return <div>HomePage</div>
  }
}

export default HomePage
