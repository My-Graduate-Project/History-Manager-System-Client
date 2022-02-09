import * as React from 'react'
import { Component } from 'react'

// scss
import './scss/index.scss'

// antd
import { Layout, Tabs, Table, Tag, Space, Pagination } from 'antd'
const { Content } = Layout
const { TabPane } = Tabs

interface ArticlePageProps {}

interface ArticlePageState {}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
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
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

class ArticlePage extends Component<ArticlePageProps, ArticlePageState> {
  constructor(props: ArticlePageProps) {
    super(props)
    this.state = {}
  }
  // list callback
  callback = (key: string) => {
    console.log(key)
  }
  render() {
    return (
      <div>
        {/* 展示文章状态 */}
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32
          }}
        >
          <div className="site-small">
            <Content className="site-content-small">文章总数</Content>
            <Content className="site-content-small">已发布文章</Content>
            <Content className="site-content-small">审核中文章 </Content>
            <Content className="site-content-small">未通过文章</Content>
          </div>
        </Content>
        {/* 文章列表展示 */}
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32
          }}
        >
          <div className="articleList">
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="全部文章" key="1">
                {/* 表格 */}
                <Table columns={columns} dataSource={data} pagination={false} />
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
          </div>
        </Content>
      </div>
    )
  }
}

export default ArticlePage
