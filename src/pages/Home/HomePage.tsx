import * as React from 'react'
import { Component } from 'react'

// antd
import { Layout } from 'antd'

const { Header, Sider } = Layout

// react-router-dom
import { Switch, Route, HashRouter } from 'react-router-dom'

// 导入组件
import HomeSiderBar from './Components/HomeSiderBar'
import PersonalInfo from './Components/PersonInfo'
// 首页组件
import HomeContent from './Components/HomeContent'
// 文章详情组件
import ArticlePage from '@/pages/Articles/ArticleList/ArticlePage'
import ArticleManager from '@/pages/Articles/ArticleManager/ArticleManager'
import ArticleWrite from '@/pages/Articles/ArticleWrite/ArticleWrite'
// 画作详情组件
import ArtworkWrite from '@/pages/Artworks/ArtworkCreate/ArtworkWrite'
import ArtworkList from '@/pages/Artworks/ArtworkList/ArtworkList'
import ArtworkManage from '@/pages/Artworks/ArtworkManager/ArtworkManager'
// 帮助中心组件
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
            <HomeSiderBar {...this.props} />
          </Sider>
          {/* 右侧 信息展示栏 */}
          <Layout className="site-layout" style={{ marginLeft: 275 }}>
            {/* 顶部导航栏 */}
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {/* 用户信息 */}
              <PersonalInfo {...this.props}></PersonalInfo>
            </Header>
            {/* 单页面切换 */}
            <Switch>
              {/* 首页详情部分 */}
              <Route path="/home">
                <HomeContent></HomeContent>
              </Route>
              {/* 文章详情部分 */}
              <Route path="/article">
                {/* 文章列表展示 */}
                <ArticlePage {...this.props}></ArticlePage>
              </Route>
              <Route path="/managerArt">
                {/* 文章管理展示 */}
                <ArticleManager {...this.props}></ArticleManager>
              </Route>
              <Route path="/managerWrite">
                {/* 文章管理展示 */}
                <ArticleWrite {...this.props}></ArticleWrite>
              </Route>
              {/* 画作详情部分 */}
              <Route path="/artworkWrite">
                <ArtworkWrite {...this.props}></ArtworkWrite>
              </Route>
              <Route path="/showArtworkList">
                <ArtworkList {...this.props}></ArtworkList>
              </Route>
              <Route path="/manageArtrwork">
                <ArtworkManage {...this.props}></ArtworkManage>
              </Route>
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
