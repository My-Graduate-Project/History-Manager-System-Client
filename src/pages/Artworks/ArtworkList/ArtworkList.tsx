import * as React from 'react'
import { Component } from 'react'

// antd
import { Layout, Breadcrumb, Card, Row, Col, Carousel } from 'antd'
const { Content } = Layout
// echarts
import * as echarts from 'echarts'

interface ArticleListProps {}

interface ArticleListState {}

// scss
import './scss/index.scss'

class ArticleList extends Component<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    let chartDom = document.querySelector('.echarts') as HTMLElement
    let myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: '每日画作发布情况',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    myChart.setOption(option)
  }
  render() {
    return (
      <div className="artwork_list">
        {/* 面包屑栏 */}
        <Row>
          <Breadcrumb className="bread">
            <Breadcrumb.Item>画作详情</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">画作详情列表</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        {/* 内容区域 */}

        {/* 第一行 -- 数据展示 */}
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="已通过数量" bordered={false}>
                Card content -- 数量
              </Card>
            </Col>
            <Col span={8}>
              <Card title="未通过数量" bordered={false}>
                Card content -- 数量
              </Card>
            </Col>
            <Col span={8}>
              <Card title="待审核数量" bordered={false}>
                Card content -- 数量
              </Card>
            </Col>
          </Row>
        </div>
        <Content
          className="site-content"
          style={{
            margin: '0px 16px',
            padding: 32,
            minHeight: 420
            // background: '#f0f2f5'
          }}
        >
          {/* 轮播图部分 */}
          <Carousel className="carousel" autoplay>
            <div className="carousel_item">
              <h3>1</h3>
            </div>
            <div className="carousel_item">
              <h3>2</h3>
            </div>
            <div className="carousel_item">
              <h3>3</h3>
            </div>
            <div className="carousel_item">
              <h3>4</h3>
            </div>
          </Carousel>

          {/* 表格部分 --echarts */}
          <div className="echarts"></div>
        </Content>
      </div>
    )
  }
}

export default ArticleList
