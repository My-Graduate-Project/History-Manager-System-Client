import * as React from 'react'
import { Component } from 'react'

// antd
import {
  Layout,
  Breadcrumb,
  Row,
  Form,
  Col,
  Input,
  Steps,
  Button,
  DatePicker,
  message,
  Image,
  Select,
  Upload,
  Result
} from 'antd'
const { Content } = Layout
const { TextArea } = Input
const { Step } = Steps
const { Option } = Select
// icons
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// withRouter
import { withRouter } from 'react-router-dom'

interface ArtworkWriteProps {
  history: any
}

interface ArtworkWriteState {}

// 进度条
const steps = [
  {
    title: '第一步：画作基本信息',
    render: () => <span>第一步：画作基本信息</span>
  },
  {
    title: '第二步：画作描述信息',
    content: 'Second-content'
  },
  {
    title: '第三步：画作发布',
    content: 'Third-content'
  }
]
// 图片上传前
function beforeUpload(file: any) {
  const isJPG = file.type === 'image/jpeg'
  const isJPEG = file.type === 'image/jpeg'
  const isGIF = file.type === 'image/gif'
  const isPNG = file.type === 'image/png'
  if (!(isJPG || isJPEG || isGIF || isPNG)) {
    message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('超过2M限制，不允许上传~')
    return false
  }
  return (isJPG || isJPEG || isGIF || isPNG) && isLt2M
}

// scss
import './scss/index.scss'
// axios
import { getAllArtworkStyles, getAllArtWorkTexture, addArtworkList } from '@/api/artwork'

class ArtworkWrite extends Component<ArtworkWriteProps, ArtworkWriteState> {
  constructor(props: ArtworkWriteProps) {
    super(props)
  }
  // 数据
  state = {
    // 当前步骤
    current: 0,
    // 图片
    loading: false,
    // 画作信息
    artworkInfo: {
      artworkTitle: '',
      artworkSubTitle: '',
      artworkCreater: '',
      artworkDynasty: '',
      artworkCreatePlace: '',
      artworkCreateTime: '',
      artworkStyle: 0,
      artworkTexture: 0,
      artWork: '',
      artworkDesc: '',
      updateTime: ''
    },
    // 接收画作风格、材质数据
    getartworkStyle: [],
    getartworkTexture: []
  }
  // componentDidMount
  componentDidMount() {
    this.getData()
  }
  // 下一页
  next = () => {
    this.setState({
      current: this.state.current + 1
    })
  }
  // 上一页
  prev = () => {
    this.setState({
      current: this.state.current - 1
    })
  }
  // select change
  handleSelectTexture = (value: any) => {
    // console.log(`selected ${value}`)
    this.setState({
      artworkInfo: {
        ...this.state.artworkInfo,
        artworkTexture: value
      }
    })
  }
  handleSelectStyle = (value: any) => {
    // console.log(`selected ${value}`)
    this.setState({
      artworkInfo: {
        ...this.state.artworkInfo,
        artworkStyle: value
      }
    })
  }
  // Upload onChange
  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  handleUploadChange = (info: any) => {
    // console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl: any) => {
        this.setState({
          loading: false,
          artworkInfo: {
            ...this.state.artworkInfo,
            artWork: imageUrl
          }
        })
      })
    }
  }
  // date change
  handleChangeData = (date: any, dateString: string) => {
    this.setState({
      artworkInfo: {
        ...this.state.artworkInfo,
        updateTime: dateString
      }
    })
  }
  normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  // 获取数据
  getData = async () => {
    const artworkStyles = await getAllArtworkStyles()
    const artworkTexture = await getAllArtWorkTexture()
    // console.log(artworkStyles)
    this.setState({
      getartworkStyle: artworkStyles.data,
      getartworkTexture: artworkTexture.data
    })
  }
  // input change
  handleChange = (e: any) => {
    this.setState({
      artworkInfo: {
        ...this.state.artworkInfo,
        [e.target.name]: e.target.value
      }
    })
  }
  // submit
  handleSubmit = async () => {
    console.log(this.state.artworkInfo)
    const result = await addArtworkList(this.state.artworkInfo)
    console.log(result)
    if (result.code === 200) {
      message.success('发布成功')
      this.props.history.push('/showArtworkList')
    }
  }
  // customRequest
  handleCustomRequest = ({ file, onSuccess }) => {
    console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      this.setState({
        artworkInfo: {
          ...this.state.artworkInfo,
          artWork: base64
        }
      })
      onSuccess(base64)
    }
    // onSuccess('ok')
  }
  render() {
    const { current, loading } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <div>
        {/* 面包屑栏 */}
        <Row>
          <Breadcrumb className="bread">
            <Breadcrumb.Item>画作详情</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">画作作品创建</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        {/* 表单列表 */}
        <Row>
          {/* 左侧表单 */}
          <Col className="left-artwork total-height" span={16}>
            <Content
              className="site-content-left"
              style={{
                margin: '0px 16px',
                padding: 32,
                minHeight: 280
              }}
            >
              {/* 步骤条 */}
              <Row className="steps">
                {/* <Steps current={this.state.current}></Steps> */}
                <Steps
                  type="navigation"
                  size="small"
                  current={current}
                  // onChange={this.onChange}
                  className="site-navigation-steps"
                >
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
              </Row>
              {/* 表单 */}
              <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                className="form-artwork"
              >
                <div className="steps-content">
                  {current === 0 && (
                    <React.Fragment>
                      {/* 主标题 */}
                      <Form.Item
                        label="画作主标题"
                        name="artworkTitle"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的主标题！！' }]}
                      >
                        <Input name="artworkTitle" onChange={this.handleChange} />
                      </Form.Item>
                      {/* 副标题 */}
                      <Form.Item
                        label="画作副标题"
                        name="artworkSubTitle"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的副标题！！' }]}
                      >
                        <Input name="artworkSubTitle" onChange={this.handleChange} />
                      </Form.Item>
                      {/* 作者 */}
                      <Form.Item
                        label="原作者"
                        name="artworkCreater"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input name="artworkCreater" onChange={this.handleChange} />
                      </Form.Item>
                      {/* 风格、材质 */}
                      <Row>
                        {/* 画作风格 */}
                        <Col span={12}>
                          <Form.Item
                            label="画作风格"
                            name="artworkStyle"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 8 }}
                            rules={[{ required: true, message: '请选择画作风格！！' }]}
                          >
                            <Select onChange={this.handleSelectStyle}>
                              {this.state.getartworkStyle.map((item: any) => {
                                return (
                                  <Option key={item.id} value={item.id}>
                                    {item.title}
                                  </Option>
                                )
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        {/* 画作材质 */}
                        <Col span={12}>
                          <Form.Item
                            label="画作材质"
                            name="artworkTexture"
                            wrapperCol={{ span: 8 }}
                            rules={[{ required: true, message: '请选择画作材质！！' }]}
                          >
                            <Select onChange={this.handleSelectTexture}>
                              {this.state.getartworkTexture.map((item: any) => {
                                return (
                                  <Option key={item.id} value={item.id}>
                                    {item.title}
                                  </Option>
                                )
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      {/* 画作创作时期 */}
                      <Form.Item
                        label="创作时期 "
                        name="artworkDynasty"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input name="artworkDynasty" onChange={this.handleChange} />
                      </Form.Item>
                      {/* 画作创作地点 */}
                      <Form.Item
                        label="创作地点"
                        name="artworkCreatePlace"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input name="artworkCreatePlace" onChange={this.handleChange} />
                      </Form.Item>
                      {/* 画作创作时间 */}
                      <Form.Item
                        label="创作时间"
                        name="artworkCreateTime"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input name="artworkCreateTime" onChange={this.handleChange} />
                      </Form.Item>
                    </React.Fragment>
                  )}
                  {current === 1 && (
                    <React.Fragment>
                      {/* 画作描述 */}
                      <Form.Item
                        label="画作描述"
                        name="artworkDesc"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作描述' }]}
                      >
                        <TextArea
                          name="artworkDesc"
                          onChange={this.handleChange}
                          style={{ height: '100px' }}
                          placeholder="请输入画作描述"
                        />
                      </Form.Item>
                      {/* 发布时间 */}
                      <Form.Item
                        label="画作发布时间"
                        name="updateTime"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入发布日期' }]}
                      >
                        <DatePicker
                          style={{ borderRadius: '20px', width: '100%' }}
                          name="updateTime"
                          onChange={this.handleChangeData}
                          placeholder="发布日期"
                          size="large"
                        />
                      </Form.Item>
                      {/* 图片上传到图床后并显示 */}
                      <Form.Item
                        label="画作上传"
                        name="artWork"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                      >
                        <Upload
                          name="artWork"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          accept="image/*"
                          customRequest={this.handleCustomRequest}
                          onChange={this.handleUploadChange}
                          beforeUpload={beforeUpload}
                        >
                          {this.state.artworkInfo.artWork ? (
                            <img
                              src={this.state.artworkInfo.artWork}
                              alt="avatar"
                              style={{ width: '100%' }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Form.Item>
                    </React.Fragment>
                  )}
                  {current === 2 && (
                    <React.Fragment>
                      <Result
                        status="success"
                        title="点击发布按钮进行画作提交"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                      />
                    </React.Fragment>
                  )}
                </div>

                {/* 下一页、上一页按钮 */}
                <Form.Item>
                  <div className="steps-action">
                    {/* 下一页按钮 */}
                    {current < steps.length - 1 && (
                      <Button type="primary" onClick={this.next}>
                        下一页
                      </Button>
                    )}
                    {/* 完成按钮 */}
                    {current === steps.length - 1 && (
                      <Button type="primary" onClick={this.handleSubmit}>
                        发布画作
                      </Button>
                    )}
                    {/* 上一页按钮 */}
                    {current > 0 && (
                      <Button style={{ margin: '0 8px' }} onClick={this.prev}>
                        上一页
                      </Button>
                    )}
                  </div>
                </Form.Item>
              </Form>
            </Content>
          </Col>
          {/* 右侧图片展示 */}
          <Col className="right-artwork total-height" span={8}>
            <Content
              className="site-content-right"
              style={{
                margin: '0px 16px',
                padding: 32,
                minHeight: 280
              }}
            >
              {/* imageUrl */}
              {this.state.artworkInfo.artWork === '' ? (
                <Image
                  width={'100%'}
                  height={'100%'}
                  src="https://gitee.com/sue201982/mysql/raw/master/img/Madonna%20in%20the%20Meadow.jpg"
                />
              ) : (
                <Image width={'100%'} height={'100%'} src={this.state.artworkInfo.artWork} />
              )}
            </Content>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(ArtworkWrite)
