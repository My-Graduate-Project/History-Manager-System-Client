import * as React from 'react'
import { Component } from 'react'
// scss
import './scss/index.scss'
// markdown
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt(/* Markdown-it options */)
// withRouter
import { withRouter } from 'react-router-dom'

// antd
import { Layout, Breadcrumb, Row, Col, Input, Button, DatePicker, message } from 'antd'
const { Content } = Layout
const { TextArea } = Input
// 请求
import { addArticle } from '@/api/articles'

interface ArticleWriteProps {
  history: any
}

interface ArticleWriteState {}

class ArticleWrite extends Component<ArticleWriteProps, ArticleWriteState> {
  constructor(props: ArticleWriteProps) {
    super(props)
  }
  // 定义数据
  state = {
    articleInfo: {
      title: '',
      description: '',
      content: '',
      category_id: 1,
      views: 0,
      article_status: 'auditing',
      created_time: ''
    }
  }
  // onChange 方法
  handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      articleInfo: {
        ...this.state.articleInfo,
        [e.target.name]: e.target.value
      }
    })
  }
  // 内容的改变
  handleEditorChange = ({ html }) => {
    // console.log(typeof html)
    this.setState({
      articleInfo: {
        ...this.state.articleInfo,
        content: html
      }
    })
  }
  // 日期的改变
  handleChangeData = (date: any, dateString: string) => {
    this.setState({
      articleInfo: {
        ...this.state.articleInfo,
        created_time: dateString
      }
    })
  }
  // handleAddArticle 添加文章
  handleAddArticle = async () => {
    // console.log(this.state.articleInfo)
    // console.log(this.props.location)
    await addArticle(this.state.articleInfo).then((res) => {
      console.log(res)
      if (res.code == 200) {
        // 跳转到展示页
        this.props.history.push('/managerArt')
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })
  }
  // 渲染
  render() {
    return (
      <div>
        {/* 面包屑 */}
        <Breadcrumb className="bread">
          <Breadcrumb.Item>文章详情</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">写文章</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* 写文章整体表格 */}
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32,
            minHeight: 280
          }}
        >
          <div>
            <Row gutter={5}>
              {/* 左侧 */}
              <Col span={18}>
                {/* 标题行 */}
                <Row gutter={10}>
                  <Col span={24}>
                    <Input
                      name="title"
                      onChange={this.handleChange}
                      placeholder="博客标题"
                      size="large"
                    />
                  </Col>
                </Row>
                <br />
                {/* 文章内容行 */}
                <Row gutter={10}>
                  <Col span={24}>
                    <MdEditor
                      className="markdown-content"
                      onChange={this.handleEditorChange}
                      style={{ height: '630px' }}
                      renderHTML={(text) => mdParser.render(text)}
                    />
                  </Col>
                </Row>
              </Col>
              {/* 右侧 */}
              <Col span={6}>
                <Row>
                  {/* 发布文章按钮 */}
                  <Col span={24}>
                    <Button
                      style={{ borderRadius: '20px', width: '200px' }}
                      onClick={this.handleAddArticle.bind(this)}
                      type="primary"
                      size="large"
                    >
                      发布文章
                    </Button>
                    <br />
                  </Col>
                  {/* 文章简介 */}
                  <Col span={24}>
                    <br />
                    <TextArea
                      rows={4}
                      name="description"
                      onChange={this.handleChange}
                      placeholder="文章简介"
                    />
                  </Col>
                  {/* 发布日期 */}
                  <Col span={24}>
                    <div className="date-select">
                      <DatePicker
                        style={{ borderRadius: '20px', width: '100%' }}
                        name="created_time"
                        onChange={this.handleChangeData}
                        placeholder="发布日期"
                        size="large"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    )
  }
}

export default withRouter(ArticleWrite)
