import * as React from 'react'
import { Component } from 'react'

// connect
import { connect } from 'react-redux'

interface PersonalInfoProps {
  logout: any
  history: any
}

interface PersonalInfoState {}

// axios
import { userInfo } from '@/api/login'
//store
import { logout } from '@/pages/Login/Components/Login/store/actions'

import { Descriptions, Button } from 'antd'

class PersonalInfo extends Component<PersonalInfoProps, PersonalInfoState> {
  constructor(props: PersonalInfoProps) {
    super(props)
  }
  state = {
    username: ''
  }
  // 获取用户信息
  getUserInfo = async () => {
    const result = await userInfo()
    this.setState({
      username: result.data.username
    })
  }
  componentDidMount() {
    this.getUserInfo()
  }
  // 用户退出
  handleLogout = () => {
    this.props.logout()
    this.props.history.push('/')
  }
  render() {
    const { username } = this.state
    return (
      <React.Fragment>
        <Descriptions size="middle" contentStyle={{ lineHeight: '64px' }}>
          <Descriptions.Item contentStyle={{ lineHeight: '64px' }} label="用户">
            {username}
          </Descriptions.Item>
        </Descriptions>
        {/* 用户退出 */}
        <Button onClick={this.handleLogout} style={{ float: 'right' }} danger>
          退出登录
        </Button>
      </React.Fragment>
    )
  }
}

export default connect(null, { logout })(PersonalInfo)
