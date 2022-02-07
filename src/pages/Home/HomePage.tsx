import * as React from 'react'
import { Component } from 'react'

// antd
import { Layout } from 'antd'

const { Header, Sider, Content } = Layout

// react-router-dom
import { Switch, Route, HashRouter } from 'react-router-dom'

// 导入组件
import HomeSiderBar from './Components/HomeSiderBar'
import Other from '@/pages/Others/OtherPage'

// scss
import './scss/index.scss'

interface HomePageProps {}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props)
  }
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <HashRouter>
        <Layout
          style={{
            minHeight: '100vh'
          }}
          hasSider
        >
          {/* 左侧 导航栏 */}
          <Sider
            width={275}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0
            }}
            theme={'dark'}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            {/* 侧边栏 */}
            <HomeSiderBar />
          </Sider>
          {/* 右侧 信息展示栏 */}
          <Layout className="site-layout" style={{ marginLeft: 275 }}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {/* 顶部导航栏 */}
            </Header>
            {/* 单页面切换 */}
            <Switch>
              {/* 帮助中心部分 */}
              <Route path="/helpCenter">
                <Other></Other>
              </Route>
            </Switch>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}

export default HomePage
