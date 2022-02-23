import * as React from 'react'
import { useState } from 'react'
// antd
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Space,
  Button,
  Tabs,
  Card,
  Tag
} from 'antd'
const { Content } = Layout
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { Meta } = Card

// withRouter
import { withRouter } from 'react-router-dom'

interface ArtworkManagerProps {}
// scss
import './scss/index.scss'
import { formatTimeStr } from 'antd/lib/statistic/utils'

const ArtworkManage: React.FC<ArtworkManagerProps> = (props) => {
  const {} = props
  // 搜索画作信息
  const [searchArtwork, setsearchArtwork] = useState('')
  const [searchArtworkDate, setsearchArtworkDate] = useState([])
  const [artworkList, setArtworkList] = useState([
    {
      id: 1,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'pass',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 2,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'auditing',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 3,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'delete',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 4,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'auditing',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 5,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'auditing',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 6,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'fail',
      date: '2022-12-2',
      creater: '拉斐尔'
    },
    {
      id: 7,
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      status: 'auditing',
      date: '2022-12-2',
      creater: '拉斐尔'
    }
  ])
  // 日期选择
  const handleChangeDate = (date: any, dateString: any) => {
    setsearchArtworkDate(dateString)
  }
  // onClick
  const handleClick = (e: any) => {
    // console.log(e)
    // 阻止默认事件
    e.preventDefault()
    console.log(searchArtwork, searchArtworkDate)
  }
  // card
  const handleClickCard = (id: number) => {
    console.log(id)
  }
  return (
    <div className="artwork_manager">
      {/* 面包屑导航栏 */}
      <Breadcrumb className="bread">
        <Breadcrumb.Item>画作详情</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">画作详情处理</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* 搜索内容部分 */}
      <Row className="artwork_search">
        <Col span={12} className="artwork_item">
          <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
            <Form.Item
              label="查询画作名"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: '请输入画作名!' }]}
            >
              <Input name="artworkTitle" onChange={(e) => setsearchArtwork(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="查询时间"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: '请选择时间段!' }]}
            >
              <Space direction="vertical">
                <RangePicker onChange={handleChangeDate} style={{ borderRadius: '20px' }} />
              </Space>
              ,
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} className="artwork_item">
          <Button className="search_artwork_button" onClick={handleClick} type="primary">
            查询画作信息
          </Button>
        </Col>
      </Row>
      <Row className="artwork_tabs">
        <Tabs tabPosition="left">
          <TabPane tab="全部文章" key="1">
            <Content>
              {artworkList.map((item, index) => (
                <Card
                  className="artwork_card"
                  hoverable
                  style={{ width: 280 }}
                  key={index}
                  onClick={() => handleClickCard(item.id)}
                  cover={<img className="artwork_card_img" alt="example" src={item.img} />}
                >
                  {/* 画作标题和描述 */}
                  <Meta title={item.title} description={item.description} />
                  {/* 创作者 */}
                  <div className="artwork_creater">
                    <span>原作者：</span>
                    {item.creater}
                  </div>
                  {/* 标签 */}
                  {item.status === 'pass' ? (
                    <Tag className="artwork_tags" color="green">
                      已发布
                    </Tag>
                  ) : item.status === 'auditing' ? (
                    <Tag className="artwork_tags" color="orange">
                      审核中
                    </Tag>
                  ) : item.status === 'fail' ? (
                    <Tag className="artwork_tags" color="blue">
                      未通过
                    </Tag>
                  ) : (
                    <Tag className="artwork_tags" color="red">
                      已删除
                    </Tag>
                  )}
                  {/* 发布日期 */}
                  <div className="artwork_date">{item.date}</div>
                </Card>
              ))}
            </Content>
          </TabPane>
          <TabPane tab="已发布" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="审核中" key="3">
            Content of Tab 3
          </TabPane>
          <TabPane tab="未通过" key="4">
            Content of Tab 4
          </TabPane>
          <TabPane tab="已删除" key="5">
            Content of Tab 5
          </TabPane>
        </Tabs>
      </Row>
    </div>
  )
}

export default withRouter(ArtworkManage)
