import * as React from 'react'
import { Component } from 'react'

// scss
import './scss/index.scss'
// axios
import { userInfo } from '@/api/login'

import { Layout, Breadcrumb, Tabs, Table, Tag, Space, Pagination, Button } from 'antd'
const { Content } = Layout
const { TabPane } = Tabs

interface ArtManagerProps {}

interface ArtManagerState {}

const data = [
  {
    key: '1',
    author: 'John Brown',
    updateTime: 32,
    title: 'New York No. 1 Lake Park',
    tags: ['已通过']
  },
  {
    key: '2',
    author: 'Jim Green',
    updateTime: 42,
    title: 'London No. 1 Lake Park',
    tags: ['审核中']
  },
  {
    key: '3',
    author: 'Joe Black',
    updateTime: 32,
    title: 'Sidney No. 1 Lake Park',
    tags: ['未通过']
  }
]

class ArtManager extends Component<ArtManagerProps, ArtManagerState> {
  constructor(props: ArtManagerProps) {
    super(props)
  }
  state = {
    privilege: '',
    status: true,
    // 定义表格列
    columns: [
      // 作者姓名
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        render: (text: string) => <a>{text}</a>
      },
      // 发布时间
      {
        title: '发布时间',
        dataIndex: 'updateTime',
        key: 'updateTime'
      },
      // 文章标题
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      // 标签 -- 展示文章状态
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: string[]) => (
          <>
            {tags.map((tag) => {
              let color
              if (tag === '已通过') {
                color = 'blue'
              }
              if (tag === '审核中') {
                color = 'green'
              }
              if (tag === '未通过') {
                color = 'red'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: any) => (
          <Space size="middle">
            <Button
              type="ghost"
              disabled={this.state.status}
              onClick={this.handleClick}
              style={{ borderRadius: '20px' }}
            >
              修改状态
            </Button>
          </Space>
        )
      }
    ]
  }
  // 获取用户信息
  getUserInfo = async () => {
    const result = await userInfo()
    this.setState({
      privilege: result.data.privilege,
      status: result.data.privilege !== '管理员' ? true : false
    })
  }
  componentDidMount() {
    this.getUserInfo()
  }
  // list callback
  callback = (key: string) => {
    console.log(key)
  }
  // 点击触发事件
  handleClick = () => {
    console.log(this.state.status)
  }
  // 判断权限
  render() {
    return (
      <div>
        {/* 面包屑 */}
        <Breadcrumb className="bread">
          <Breadcrumb.Item>文章详情</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">文章处理</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* 修改状态 */}
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32
          }}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="全部文章" key="1">
              {/* 表格 */}
              <Table columns={this.state.columns} dataSource={data} pagination={false} />
              {/* 分页 */}
              <Pagination defaultCurrent={1} total={100} />
            </TabPane>
            <TabPane tab="已发布" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="审核中" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="未通过" key="4">
              Content of Tab Pane 4
            </TabPane>
          </Tabs>
        </Content>
      </div>
    )
  }
}

export default ArtManager
