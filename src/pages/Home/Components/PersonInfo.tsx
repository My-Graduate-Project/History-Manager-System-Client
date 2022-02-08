import * as React from 'react'
import { Component } from 'react'

interface PersonalInfoProps {}

interface PersonalInfoState {}

// axios
import { userInfo } from '@/api/login'

import { Descriptions } from 'antd'

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
    console.log(result)
    this.setState({
      username: result.data.username
    })
  }
  componentDidMount() {
    this.getUserInfo()
  }
  render() {
    const { username } = this.state
    return (
      <Descriptions size="middle" contentStyle={{ lineHeight: '64px' }}>
        <Descriptions.Item contentStyle={{ lineHeight: '64px' }} label="用户">
          {username}
        </Descriptions.Item>
      </Descriptions>
    )
  }
}

export default PersonalInfo
