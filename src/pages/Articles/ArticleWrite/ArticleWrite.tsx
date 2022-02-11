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

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text)
}

// antd
import { Layout, Breadcrumb, Row, Col, Input, Button, DatePicker } from 'antd'
const { Content } = Layout
const { TextArea } = Input

interface ArticleWriteProps {}

interface ArticleWriteState {}

class ArticleWrite extends Component<ArticleWriteProps, ArticleWriteState> {
  constructor(props: ArticleWriteProps) {
    super(props)
  }
  state = {
    introducehtml: '等待编辑'
  }

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
                    <Input placeholder="博客标题" size="large" />
                  </Col>
                </Row>
                <br />
                {/* 文章内容行 */}
                <Row gutter={10}>
                  <Col span={24}>
                    <MdEditor
                      className="markdown-content"
                      style={{ height: '630px' }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={handleEditorChange}
                    />
                  </Col>
                </Row>
              </Col>
              {/* 右侧 */}
              <Col span={6}>
                <Row>
                  {/* 发布文章按钮 */}
                  <Col span={24}>
                    <Button type="primary" size="large">
                      发布文章
                    </Button>
                    <br />
                  </Col>
                  {/* 文章简介 */}
                  <Col span={24}>
                    <br />
                    <TextArea
                      rows={4}
                      // value={introducemd}
                      // onChange={changeIntroduce}
                      // onPressEnter={changeIntroduce}
                      placeholder="文章简介"
                    />
                    <div
                      className="introduce-html"
                      dangerouslySetInnerHTML={{ __html: '文章简介：' + this.state.introducehtml }}
                    ></div>
                  </Col>
                  {/* 发布日期 */}
                  <Col span={12}>
                    <div className="date-select">
                      <DatePicker placeholder="发布日期" size="large" />
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

export default ArticleWrite
