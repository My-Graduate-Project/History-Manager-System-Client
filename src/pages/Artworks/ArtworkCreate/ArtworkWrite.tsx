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

interface ArtworkWriteProps {}

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
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

// scss
import './scss/index.scss'

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
    imageUrl: ''
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
  handleSelectChange = (value) => {
    console.log(`selected ${value}`)
  }
  // form onFinish
  onFinish = (values: any) => {
    console.log(values)
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
          imageUrl: imageUrl,
          loading: false
        })
      })
    }
  }
  // date change
  handleChangeData = (date: any, dateString: string) => {
    console.log(date)
  }
  normFile = (e: any) => {
    //如果是typescript, 那么参数写成 e: any
    // console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  render() {
    const { current, loading, imageUrl } = this.state
    console.log(imageUrl)
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
                onFinish={this.onFinish}
                // autoComplete="off"
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
                        <Input name="artworkTitle" />
                      </Form.Item>
                      {/* 副标题 */}
                      <Form.Item
                        label="画作副标题"
                        name="artworkSubTitle"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的副标题！！' }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* 作者 */}
                      <Form.Item
                        label="原作者"
                        name="artworkCreater"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input />
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
                            rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                          >
                            <Select onChange={this.handleSelectChange}>
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        {/* 画作材质 */}
                        <Col span={12}>
                          <Form.Item
                            label="画作风格"
                            name="artworkTexture"
                            wrapperCol={{ span: 8 }}
                            rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                          >
                            <Select onChange={this.handleSelectChange}>
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="Yiminghe">yiminghe</Option>
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
                        <Input />
                      </Form.Item>
                      {/* 画作创作地点 */}
                      <Form.Item
                        label="创作地点"
                        name="artworkCreatePlace"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* 画作创作时间 */}
                      <Form.Item
                        label="创作时间"
                        name="artworkCreateTIme"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                        rules={[{ required: true, message: '请输入画作的原作者！！' }]}
                      >
                        <Input />
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
                        <TextArea style={{ height: '100px' }} placeholder="请输入画作描述" />
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
                          name="created_time"
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
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          onChange={this.handleUploadChange}
                          beforeUpload={beforeUpload}
                        >
                          {imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
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
                      <Button
                        type="primary"
                        onClick={() => message.success('Processing complete!')}
                      >
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
              {this.state.imageUrl === '' ? (
                <Image
                  width={'100%'}
                  height={'100%'}
                  src="https://gitee.com/sue201982/mysql/raw/master/img/Madonna%20in%20the%20Meadow.jpg"
                />
              ) : (
                <Image width={'100%'} height={'100%'} src={this.state.imageUrl} />
              )}
            </Content>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ArtworkWrite
