import * as React from 'react'
import { Component } from 'react'

// antd
import { Layout } from 'antd'
const { Content } = Layout

interface HomeContentProps {}

interface HomeContentState {}

class HomeContent extends Component<HomeContentProps, HomeContentState> {
  constructor(props: HomeContentProps) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32
          }}
        >
          <div className="site-small">
            <Content className="site-content-small">小</Content>
            <Content className="site-content-small">小</Content>
            <Content className="site-content-small">小</Content>
            <Content className="site-content-small">小</Content>
          </div>
          <div className="site-middle">
            <Content className="site-content-middle">中</Content>
            <Content className="site-content-middle">中</Content>
          </div>
          <div className="site-large">
            <Content className="site-content-large">中</Content>
          </div>
        </Content>
      </React.Fragment>
    )
  }
}

export default HomeContent
