import * as React from 'react'
import { Component } from 'react'

// scss
import './scss/index.scss'

import { Link } from 'react-router-dom'

// antd
import { Layout, Breadcrumb, Tabs, Table, Button, Tag, Space, Pagination } from 'antd'
const { Content } = Layout
const { TabPane } = Tabs

interface ArticlePageProps {}

interface ArticlePageState {}

import { showArticleList } from '@/api/articles'
class ArticlePage extends Component<ArticlePageProps, ArticlePageState> {
  constructor(props: ArticlePageProps) {
    super(props)
  }
  state = {
    // 定义表格列
    columns: [
      // 作者姓名
      {
        title: '作者',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text: string) => <a>{text}</a>
      },
      // 发布时间
      {
        title: '发布时间',
        dataIndex: 'created_time',
        key: 'created_time',
        render: (text: string) => <a>{this.formateDate(text)}</a>
      },
      // 文章标题
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      // 标签 -- 展示文章状态
      {
        title: '标签',
        key: 'article_status',
        dataIndex: 'article_status',
        render: (text: string) => {
          if (text === 'pass') {
            return <Tag color="green">已发布</Tag>
          }
          if (text === 'fail') {
            return <Tag color="blue">未通过</Tag>
          }
          if (text === 'auditing') {
            return <Tag color="orange">待审核</Tag>
          }
          if (text === 'delete') {
            return <Tag color="red">已删除</Tag>
          }
        }
      }
    ],
    // 定义表格数据
    data: [],
    //
    passData: [],
    failData: [],
    auditingData: [],
    isDeleteData: [],
    // 定义分页
    count: 0,
    pageNum: 0,
    pageSize: 3,
    // 定义文章数量
    totalCount: 0,
    passCount: 0,
    failCount: 0,
    auditingCount: 0
  }
  // list callback
  callback = (key: string) => {
    console.log(key)
  }
  componentDidMount() {
    // 文章列表
    this.getArticleList()
  }
  // 获取文章列表数据
  getArticleList = async () => {
    const result = await showArticleList()
    result.data.forEach((item: { key: any; id: any }, index: number) => {
      item.key = `${item.id}`
    })
    this.setState({
      data: result.data,
      count: result.data.length,
      totalCount: result.data.length
    })
    // 分类数据
    const passData = result.data.filter((item: { article_status: any }) => {
      if (item.article_status === 'pass') {
        this.setState({
          passCount: this.state.passCount + 1
        })
      }
      return item.article_status === 'pass'
    })
    const failData = result.data.filter((item: { article_status: any }) => {
      if (item.article_status === 'fail') {
        this.setState({
          passCount: this.state.failCount + 1
        })
      }
      return item.article_status === 'fail'
    })
    const auditingData = result.data.filter((item: { article_status: any }) => {
      if (item.article_status === 'fail') {
        this.setState({
          passCount: this.state.auditingCount + 1
        })
      }
      return item.article_status === 'auditing'
    })
    const isDeleteData = result.data.filter((item: { is_deleted: any }) => {
      return item.article_status === 'delete'
    })
    this.setState({
      passData: passData,
      failData: failData,
      auditingData: auditingData,
      isDeleteData: isDeleteData
    })
  }
  //转换时间格式
  formateDate = (datetime: string | number | Date) => {
    function addDateZero(num) {
      return num < 10 ? '0' + num : num
    }
    let d = new Date(datetime)
    let formatdatetime =
      d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate())
    return formatdatetime
  }
  // 分页
  getPagination = async (page: number, pageSize: number) => {
    console.log(page, pageSize)
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
            <Content className="site-content-small">
              <h1>文章总数</h1>
              <div className="totalNum">{this.state.totalCount}</div>
            </Content>
            <Content className="site-content-small">
              <h1>已发布文章</h1>
              <div className="passNum">{this.state.passCount}</div>
            </Content>
            <Content className="site-content-small">
              <h1>审核中文章</h1>
              <div className="auditingNum">{this.state.auditingCount}</div>
            </Content>
            <Content className="site-content-small">
              <h1>未通过文章</h1>
              <div className="failNum">{this.state.passCount}</div>
            </Content>
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
            {/* Tab 栏切换 */}
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="全部文章" key="1">
                {/* 表格 */}
                <Table
                  columns={this.state.columns}
                  // rowKey={this.state.data.id}
                  dataSource={this.state.data}
                  pagination={{
                    total: this.state.data.length,
                    pageSize: 5,
                    onChange: this.getPagination
                  }}
                />
              </TabPane>
              <TabPane tab="已发布" key="2">
                {/* 表格 */}
                <Table
                  columns={this.state.columns}
                  rowKey={this.state.data.id}
                  dataSource={this.state.passData}
                  pagination={{
                    total: this.state.passData.length,
                    pageSize: 5,
                    onChange: this.getPagination
                  }}
                />
              </TabPane>
              <TabPane tab="审核中" key="3">
                {/* 表格 */}
                <Table
                  columns={this.state.columns}
                  rowKey={this.state.data.id}
                  dataSource={this.state.auditingData}
                  pagination={{
                    total: this.state.auditingData.length,
                    pageSize: 5,
                    onChange: this.getPagination
                  }}
                />
              </TabPane>
              <TabPane tab="未通过" key="4">
                {/* 表格 */}
                <Table
                  columns={this.state.columns}
                  rowKey={this.state.data.id}
                  dataSource={this.state.failData}
                  pagination={{
                    total: this.state.failData.length,
                    pageSize: 5,
                    onChange: this.getPagination
                  }}
                />
              </TabPane>
              <TabPane tab="已删除" key="5">
                {/* 表格 */}
                <Table
                  columns={this.state.columns}
                  rowKey={this.state.data.id}
                  dataSource={this.state.isDeleteData}
                  pagination={{
                    total: this.state.isDeleteData.length,
                    pageSize: 5,
                    onChange: this.getPagination
                  }}
                />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </div>
    )
  }
}

export default ArticlePage
