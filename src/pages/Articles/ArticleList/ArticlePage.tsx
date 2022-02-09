import * as React from 'react'
import { Component } from 'react'

// scss
import './scss/index.scss'

import { Link } from 'react-router-dom'

// antd
import { Layout, Breadcrumb, Tabs, Table, Tag, Space, Pagination } from 'antd'
const { Content } = Layout
const { TabPane } = Tabs

interface ArticlePageProps {}

interface ArticlePageState {}

// 定义表格列
const columns = [
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
  }
]
// 定义表格数据
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
        {/* 面包屑 */}
        <Breadcrumb className="bread">
          <Breadcrumb.Item>文章详情</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/article">文章管理</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
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
