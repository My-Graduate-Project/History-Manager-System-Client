import * as React from 'react'
import { Component } from 'react'

// antd
import { Menu } from 'antd'
// antd icons
import {
  HomeOutlined,
  SnippetsOutlined,
  AlignCenterOutlined,
  DatabaseOutlined,
  EditOutlined,
  FormatPainterOutlined,
  BookOutlined,
  CodeSandboxOutlined,
  DeploymentUnitOutlined,
  HistoryOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  SafetyOutlined,
  UserOutlined,
  SettingOutlined,
  PushpinOutlined
} from '@ant-design/icons'
// Menus
const { SubMenu } = Menu

// react-router-dom
import { Link } from 'react-router-dom'

interface HomeSiderBarProps {
  history: any
}

interface HomeSiderBarState {}

class HomeSiderBar extends Component<HomeSiderBarProps, HomeSiderBarState> {
  constructor(props: HomeSiderBarProps) {
    super(props)
    console.log(this.props.history)
  }

  render() {
    return (
      <React.Fragment>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {/* 首页详情 */}
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">首页详情</Link>
          </Menu.Item>
          {/* 文章页详情 */}
          <SubMenu key="subArtitle" icon={<SnippetsOutlined />} title="文章详情">
            <Menu.Item key="subArtitle1" icon={<DatabaseOutlined />}>
              <Link to="/article">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="subArtitle2" icon={<AlignCenterOutlined />}>
              <Link to="/managerArt">文章处理</Link>
            </Menu.Item>
            <Menu.Item key="subArtitle3" icon={<EditOutlined />}>
              写文章
            </Menu.Item>
          </SubMenu>
          {/* 展品画作详情 */}
          <SubMenu key="subArtwork" icon={<FormatPainterOutlined />} title="画作展示">
            <Menu.Item key="subArtwork1" icon={<AppstoreOutlined />}>
              画作详情列表
            </Menu.Item>
            <Menu.Item key="subArtwork2" icon={<AlignCenterOutlined />}>
              画作详情处理
            </Menu.Item>
            <Menu.Item key="subArtwork3" icon={<EditOutlined />}>
              发布画作信息
            </Menu.Item>
          </SubMenu>
          {/* 历史古籍展示 */}
          <SubMenu key="subIncunabula" icon={<BookOutlined />} title="古籍展示">
            <Menu.Item key="subIncunabula1" icon={<AppstoreOutlined />}>
              古籍详情列表
            </Menu.Item>
            <Menu.Item key="subIncunabula2" icon={<AlignCenterOutlined />}>
              古籍详情处理
            </Menu.Item>
            <Menu.Item key="subIncunabula3" icon={<EditOutlined />}>
              发布古籍信息
            </Menu.Item>
          </SubMenu>
          {/* 历史帝国展示 */}
          <SubMenu key="subEmpire" icon={<CodeSandboxOutlined />} title="帝国展示">
            <Menu.Item key="subEmpire1" icon={<AppstoreOutlined />}>
              帝国详情列表
            </Menu.Item>
            <Menu.Item key="subEmpire2" icon={<AlignCenterOutlined />}>
              帝国详情处理
            </Menu.Item>
            <Menu.Item key="subEmpire3" icon={<EditOutlined />}>
              发布帝国信息
            </Menu.Item>
          </SubMenu>
          {/* 历史战争展示 */}
          <SubMenu key="subWar" icon={<DeploymentUnitOutlined />} title="战争展示">
            <Menu.Item key="subWar1" icon={<AppstoreOutlined />}>
              战争详情列表
            </Menu.Item>
            <Menu.Item key="subWar2" icon={<AlignCenterOutlined />}>
              战争详情处理
            </Menu.Item>
            <Menu.Item key="subWar3" icon={<EditOutlined />}>
              发布战争信息
            </Menu.Item>
          </SubMenu>
          {/* 历史古迹展示 */}
          <SubMenu key="subSite" icon={<HistoryOutlined />} title="古迹展示">
            <Menu.Item key="subSite1" icon={<AppstoreOutlined />}>
              古迹详情列表
            </Menu.Item>
            <Menu.Item key="subSite2" icon={<AlignCenterOutlined />}>
              古迹详情处理
            </Menu.Item>
            <Menu.Item key="subSite3" icon={<EditOutlined />}>
              发布古迹信息
            </Menu.Item>
          </SubMenu>
          {/* 历史人物展示 */}
          <SubMenu key="subPerson" icon={<TeamOutlined />} title="人物展示">
            <Menu.Item key="subPerson1" icon={<AppstoreOutlined />}>
              人物详情列表
            </Menu.Item>
            <Menu.Item key="subPerson2" icon={<AlignCenterOutlined />}>
              人物详情处理
            </Menu.Item>
            <Menu.Item key="subPerson3" icon={<EditOutlined />}>
              发布人物信息
            </Menu.Item>
          </SubMenu>
          {/* 角色管理 */}
          <SubMenu key="subCharacter" icon={<ContactsOutlined />} title="角色管理">
            <Menu.Item key="subCharacter1" icon={<SafetyOutlined />}>
              管理员列表
            </Menu.Item>
            <Menu.Item key="subCharacter2" icon={<UserOutlined />}>
              用户列表
            </Menu.Item>
          </SubMenu>
          {/* 帮助中心 */}
          <SubMenu key="subHelpCenter" icon={<SettingOutlined />} title="帮助中心">
            <Menu.Item key="subHelpCenter1" icon={<PushpinOutlined />}>
              <Link to="/helpCenter">常见问题</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </React.Fragment>
    )
  }
}

export default HomeSiderBar
