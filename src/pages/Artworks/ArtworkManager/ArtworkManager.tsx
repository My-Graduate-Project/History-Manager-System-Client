import * as React from 'react'
import { useState, useEffect } from 'react'
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
  Tag,
  Empty,
  message,
  Modal,
  Descriptions,
  Image,
  Select
} from 'antd'
const { Content } = Layout
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { Meta } = Card
const { Option } = Select

// withRouter
import { withRouter } from 'react-router-dom'

interface ArtworkManagerProps {}
// scss
import './scss/index.scss'
import { formatTimeStr } from 'antd/lib/statistic/utils'

// axios
import { showArtworkList, searchArtwork, echoArtwork, updateArtworkStatus } from '@/api/artwork'

// class
class artworkData {
  id: number
  artwork: string | undefined
  artwork_title: string | undefined
  artwork_subTitle: string | undefined
  artwork_creater: string | undefined
  artwork_dynasty: string | undefined
  artwork_description: string | undefined
  artwork_create_place: string | undefined
  artwork_create_time: string | undefined
  artwork_styles_id: number | undefined
  artwork_texture_id: number | undefined
  artwork_status: string | undefined
  category_id: number | undefined
  user_id: number | undefined
  user_name: string | undefined
}

const ArtworkManage: React.FC<ArtworkManagerProps> = (props) => {
  const {} = props
  // 搜索画作信息
  const [searchArtworkTitle, setsearchArtworkTitle] = useState('')
  const [searchArtworkDate, setsearchArtworkDate] = useState([])
  // 全部数据
  const [artworkList, setArtworkList] = useState([])
  // 审核中的数据
  const [artworkListAuditing, setArtworkListAuditing] = useState([])
  const [artworkListPass, setArtworkListPass] = useState([])
  const [artworkListFail, setArtworkListFail] = useState([])
  const [artworkListDelete, setArtworkListDelete] = useState([])
  // 弹出框
  const [isModalVisible, setIsModalVisible] = useState(false)
  // 回显数据信息
  const [echoArtworkData, setEchoArtworkData] = useState([])
  // 修改状态
  const [artworkStatus, setArtworkStatus] = useState('')
  // 获取ID
  const [artworkId, setArtworkId] = useState(0)
  // 调用接口
  useEffect(() => {
    getArtworkList()
  }, [])
  // 接收获取的数据
  const getArtworkList = async () => {
    // 获取画作列表
    const result: any = await showArtworkList()
    // console.log(result)
    if (result.code === 200) {
      setArtworkList(result.data)
    }
    // 审核中数据
    const resultAuditing = result.data.filter((item: artworkData) => {
      return item.artwork_status === 'auditing'
    })
    setArtworkListAuditing(resultAuditing)
    // 已通过数据
    const resultPass = result.data.filter((item: artworkData) => {
      return item.artwork_status === 'pass'
    })
    setArtworkListPass(resultPass)
    // 未通过数据
    const resultFail = result.data.filter((item: artworkData) => {
      return item.artwork_status === 'fail'
    })
    setArtworkListFail(resultFail)
    // 已删除数据
    const resultDelete = result.data.filter((item: artworkData) => {
      return item.artwork_status === 'delete'
    })
    setArtworkListDelete(resultDelete)
  }
  // 日期选择
  const handleChangeDate = (date: any, dateString: any) => {
    setsearchArtworkDate(dateString)
  }
  // onClick
  const handleClick = async (e: any) => {
    // 阻止默认事件
    e.preventDefault()
    // 搜索画作
    const result: any = await searchArtwork(
      searchArtworkTitle,
      searchArtworkDate[0],
      searchArtworkDate[1]
    )
    // console.log(result)
    if (result.code === 200) {
      setArtworkList(result.data)
      return message.success(result.msg)
    }
  }
  // card
  const handleClickCard = async (id: number) => {
    const result: any = await echoArtwork(id)
    setIsModalVisible(true)
    if (result.code === 200) {
      result.data.forEach((item: artworkData) => {
        setArtworkId(item.id)
      })
      setEchoArtworkData(result.data)
    }
  }
  // model
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // select
  const handleChangeSelect = (value: any) => {
    // console.log(value)
    setArtworkStatus(value)
  }
  // onOk
  const handleOk = async (e: any) => {
    // console.log(e)
    // console.log(artworkId)
    const result: any = await updateArtworkStatus(artworkId, artworkStatus)
    console.log(result)
    if (result.code === 200) {
      message.success(result.msg)
      setIsModalVisible(false)
      getArtworkList()
    }
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
              <Input name="artworkTitle" onChange={(e) => setsearchArtworkTitle(e.target.value)} />
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
              {artworkList.map((item: artworkData, index) => (
                <Card
                  className="artwork_card"
                  hoverable
                  style={{ width: 280 }}
                  key={index}
                  onClick={() => handleClickCard(item.id)}
                  cover={<img className="artwork_card_img" alt="example" src={item.artwork} />}
                >
                  {/* 画作标题和描述 */}
                  <Meta title={item.artwork_title} description={item.artwork_description} />
                  {/* 创作者 */}
                  <div className="artwork_creater">
                    <span>原作者：</span>
                    {item.artwork_creater}
                  </div>
                  {/* 标签 */}
                  {item.artwork_status === 'pass' ? (
                    <Tag className="artwork_tags" color="green">
                      已发布
                    </Tag>
                  ) : item.artwork_status === 'auditing' ? (
                    <Tag className="artwork_tags" color="orange">
                      审核中
                    </Tag>
                  ) : item.artwork_status === 'fail' ? (
                    <Tag className="artwork_tags" color="blue">
                      未通过
                    </Tag>
                  ) : (
                    <Tag className="artwork_tags" color="red">
                      已删除
                    </Tag>
                  )}
                  {/* 发布日期 */}
                  <div className="artwork_date">{item.artwork_dynasty}</div>
                </Card>
              ))}
            </Content>
          </TabPane>
          <TabPane tab="已发布" key="2">
            <Content className="tab_content">
              {artworkListPass.length === 0 ? (
                <Empty className="empty" />
              ) : (
                artworkListPass.map((item: artworkData, index) => (
                  <Card
                    className="artwork_card"
                    hoverable
                    style={{ width: 280 }}
                    key={index}
                    onClick={() => handleClickCard(item.id)}
                    cover={<img className="artwork_card_img" alt="example" src={item.artwork} />}
                  >
                    {/* 画作标题和描述 */}
                    <Meta title={item.artwork_title} description={item.artwork_description} />
                    {/* 创作者 */}
                    <div className="artwork_creater">
                      <span>原作者：</span>
                      {item.artwork_creater}
                    </div>
                    {/* 标签 */}
                    {item.artwork_status === 'pass' ? (
                      <Tag className="artwork_tags" color="green">
                        已发布
                      </Tag>
                    ) : item.artwork_status === 'auditing' ? (
                      <Tag className="artwork_tags" color="orange">
                        审核中
                      </Tag>
                    ) : item.artwork_status === 'fail' ? (
                      <Tag className="artwork_tags" color="blue">
                        未通过
                      </Tag>
                    ) : (
                      <Tag className="artwork_tags" color="red">
                        已删除
                      </Tag>
                    )}
                    {/* 发布日期 */}
                    <div className="artwork_date">{item.artwork_dynasty}</div>
                  </Card>
                ))
              )}
            </Content>
          </TabPane>
          <TabPane tab="审核中" key="3">
            <Content>
              {artworkListAuditing.length === 0 ? (
                <Empty className="empty" />
              ) : (
                artworkListAuditing.map((item: artworkData, index) => (
                  <Card
                    className="artwork_card"
                    hoverable
                    style={{ width: 280 }}
                    key={index}
                    onClick={() => handleClickCard(item.id)}
                    cover={<img className="artwork_card_img" alt="example" src={item.artwork} />}
                  >
                    {/* 画作标题和描述 */}
                    <Meta title={item.artwork_title} description={item.artwork_description} />
                    {/* 创作者 */}
                    <div className="artwork_creater">
                      <span>原作者：</span>
                      {item.artwork_creater}
                    </div>
                    {/* 标签 */}
                    {item.artwork_status === 'pass' ? (
                      <Tag className="artwork_tags" color="green">
                        已发布
                      </Tag>
                    ) : item.artwork_status === 'auditing' ? (
                      <Tag className="artwork_tags" color="orange">
                        审核中
                      </Tag>
                    ) : item.artwork_status === 'fail' ? (
                      <Tag className="artwork_tags" color="blue">
                        未通过
                      </Tag>
                    ) : (
                      <Tag className="artwork_tags" color="red">
                        已删除
                      </Tag>
                    )}
                    {/* 发布日期 */}
                    <div className="artwork_date">{item.artwork_dynasty}</div>
                  </Card>
                ))
              )}
            </Content>
          </TabPane>
          <TabPane tab="未通过" key="4">
            <Content>
              {artworkListFail.length === 0 ? (
                <Empty className="empty" />
              ) : (
                artworkListFail.map((item: artworkData, index) => (
                  <Card
                    className="artwork_card"
                    hoverable
                    style={{ width: 280 }}
                    key={index}
                    onClick={() => handleClickCard(item.id)}
                    cover={<img className="artwork_card_img" alt="example" src={item.artwork} />}
                  >
                    {/* 画作标题和描述 */}
                    <Meta title={item.artwork_title} description={item.artwork_description} />
                    {/* 创作者 */}
                    <div className="artwork_creater">
                      <span>原作者：</span>
                      {item.artwork_creater}
                    </div>
                    {/* 标签 */}
                    {item.artwork_status === 'pass' ? (
                      <Tag className="artwork_tags" color="green">
                        已发布
                      </Tag>
                    ) : item.artwork_status === 'auditing' ? (
                      <Tag className="artwork_tags" color="orange">
                        审核中
                      </Tag>
                    ) : item.artwork_status === 'fail' ? (
                      <Tag className="artwork_tags" color="blue">
                        未通过
                      </Tag>
                    ) : (
                      <Tag className="artwork_tags" color="red">
                        已删除
                      </Tag>
                    )}
                    {/* 发布日期 */}
                    <div className="artwork_date">{item.artwork_dynasty}</div>
                  </Card>
                ))
              )}
            </Content>
          </TabPane>
          <TabPane tab="已删除" key="5">
            <Content>
              {artworkListDelete.length === 0 ? (
                <Empty className="empty" />
              ) : (
                artworkListDelete.map((item: artworkData, index) => (
                  <Card
                    className="artwork_card"
                    hoverable
                    style={{ width: 280 }}
                    key={index}
                    onClick={() => handleClickCard(item.id)}
                    cover={<img className="artwork_card_img" alt="example" src={item.artwork} />}
                  >
                    {/* 画作标题和描述 */}
                    <Meta title={item.artwork_title} description={item.artwork_description} />
                    {/* 创作者 */}
                    <div className="artwork_creater">
                      <span>原作者：</span>
                      {item.artwork_creater}
                    </div>
                    {/* 标签 */}
                    {item.artwork_status === 'pass' ? (
                      <Tag className="artwork_tags" color="green">
                        已发布
                      </Tag>
                    ) : item.artwork_status === 'auditing' ? (
                      <Tag className="artwork_tags" color="orange">
                        审核中
                      </Tag>
                    ) : item.artwork_status === 'fail' ? (
                      <Tag className="artwork_tags" color="blue">
                        未通过
                      </Tag>
                    ) : (
                      <Tag className="artwork_tags" color="red">
                        已删除
                      </Tag>
                    )}
                    {/* 发布日期 */}
                    <div className="artwork_date">{item.artwork_dynasty}</div>
                  </Card>
                ))
              )}
            </Content>
          </TabPane>
        </Tabs>
      </Row>
      {/* 弹出框部分 */}
      <Modal
        className="model_part"
        title="画作状态改变"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        mask={true}
        bodyStyle={{ height: '680px', overflowY: 'auto' }}
        column={24}
      >
        <Row>
          <Descriptions size="small">
            {echoArtworkData.map((item: artworkData, index) => (
              <React.Fragment key={item.id}>
                {/* 画作信息 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作"
                >
                  <Image
                    style={{
                      width: '250px',
                      height: '350px'
                    }}
                    src={item.artwork}
                  ></Image>
                </Descriptions.Item>
                {/* 画作主标题 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作主标题"
                >
                  {item.artwork_title}
                </Descriptions.Item>
                {/* 画作副标题 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作副标题"
                >
                  {item.artwork_subTitle}
                </Descriptions.Item>
                {/* 画作创作者 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作创作者"
                >
                  {item.artwork_creater}
                </Descriptions.Item>
                {/* 画作创作时期 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作创作时期"
                >
                  {item.artwork_create_time}
                </Descriptions.Item>
                {/* 画作状态修改 */}
                <Descriptions.Item
                  span={24}
                  labelStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  label="画作状态修改"
                >
                  <Select
                    defaultValue={item.artwork_status}
                    style={{ width: 120, marginTop: '16px' }}
                    onChange={handleChangeSelect}
                  >
                    <Option value="pass">审核通过</Option>
                    <Option value="auditing">审核中</Option>
                    <Option value="fail">审核未通过</Option>
                    <Option value="delete">已删除</Option>
                  </Select>
                </Descriptions.Item>
              </React.Fragment>
            ))}
          </Descriptions>
        </Row>
      </Modal>
    </div>
  )
}

export default withRouter(ArtworkManage)
