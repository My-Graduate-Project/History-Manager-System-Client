import * as React from 'react'
import { Component } from 'react'

// scss
import './scss/index.scss'
// axios
import { userInfo } from '@/api/login'

import {
  Layout,
  Breadcrumb,
  Tabs,
  Table,
  Tag,
  Space,
  Pagination,
  Button,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  message
} from 'antd'
const { Content } = Layout
const { TabPane } = Tabs
const { RangePicker } = DatePicker

// 请求
import { showArticleList, removeSingleArticle } from '@/api/articles'

interface ArtManagerProps {}

interface ArtManagerState {}

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
            <Button danger style={{ borderRadius: '20px' }} onClick={this.handleRemove}>
              删除
            </Button>
          </Space>
        )
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
    pageSize: 3
  }
  // 初始化
  // 获取用户信息
  getUserInfo = async () => {
    const result = await userInfo()
    this.setState({
      privilege: result.data.privilege,
      status: result.data.privilege !== '管理员' ? true : false
    })
  }
  componentDidMount() {
    // 用户信息
    this.getUserInfo()
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
      count: result.data.length
    })
    // 分类数据
    const passData = result.data.filter((item: { article_status: any }) => {
      return item.article_status === 'pass'
    })
    const failData = result.data.filter((item: { article_status: any }) => {
      return item.article_status === 'fail'
    })
    const auditingData = result.data.filter((item: { article_status: any }) => {
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
  // list callback
  callback = (key: string) => {
    console.log(key)
  }
  // 点击触发事件
  handleClick = () => {
    console.log(this.state.status)
  }
  // 删除文章
  handleRemove = async (e: any) => {
    const id =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-row-key')
    const result = await removeSingleArticle(id)
    if (result.code === 200) {
      message.success(result.msg)
    }
  }
  // 日期变化
  onFinish = (fieldsValue: any) => {
    console.log('Success:', fieldsValue)
    const rangeValue = fieldsValue['range-picker']
    const values = {
      ...fieldsValue,
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
    }
  }
  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  // 分页
  getPagination = async (page: number, pageSize: number) => {
    console.log(page, pageSize)
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
          {/* 查询部分 */}
          <Row gutter={5}>
            <Col span={24}>
              <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
                style={{ position: 'relative' }}
              >
                <Form.Item
                  label="标题"
                  name="title"
                  rules={[{ required: true, message: '请输入查询文章标题' }]}
                >
                  <Input style={{ borderRadius: '20px' }} />
                </Form.Item>
                <Form.Item
                  name="range-picker"
                  label="日期"
                  rules={[{ required: true, message: 'Please select time!' }]}
                  wrapperCol={{ span: 4 }}
                >
                  <RangePicker style={{ borderRadius: '20px' }} />
                </Form.Item>

                <Button
                  type="primary"
                  style={{
                    borderRadius: '20px',
                    width: '100px'
                  }}
                  htmlType="submit"
                >
                  查询
                </Button>
              </Form>
            </Col>
          </Row>

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
        </Content>
      </div>
    )
  }
}

export default ArtManager
