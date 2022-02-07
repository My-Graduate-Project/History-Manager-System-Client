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
  AreaChartOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  FundViewOutlined,
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

interface HomeSiderBarProps {}

interface HomeSiderBarState {}

class HomeSiderBar extends React.Component<HomeSiderBarProps, HomeSiderBarState> {
  constructor(props: HomeSiderBarProps) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {/* 首页详情 */}
          <Menu.Item key="1" icon={<HomeOutlined />}>
            首页详情
          </Menu.Item>
          {/* 文章页详情 */}
          <SubMenu key="subArtitle" icon={<SnippetsOutlined />} title="文章详情">
            <Menu.Item key="subArtitle1" icon={<AlignCenterOutlined />}>
              文章预览
            </Menu.Item>
            <Menu.Item key="subArtitle2" icon={<DatabaseOutlined />}>
              文章管理
            </Menu.Item>
            <Menu.Item key="subArtitle3" icon={<EditOutlined />}>
              写文章
            </Menu.Item>
            <Menu.Item key="subArtitle4" icon={<AreaChartOutlined />}>
              文章详细内容
            </Menu.Item>
          </SubMenu>
          {/* 展品展示详情 */}
          <SubMenu key="subExhibits" icon={<HistoryOutlined />} title="展品展示">
            <Menu.Item key="subExhibits1" icon={<AppstoreOutlined />}>
              展品详情列表
            </Menu.Item>
            <Menu.Item key="subExhibits2" icon={<EditOutlined />}>
              发布展品信息
            </Menu.Item>
            <Menu.Item key="subExhibits3" icon={<FundViewOutlined />}>
              查看展品预览
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
