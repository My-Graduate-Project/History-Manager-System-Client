import * as React from 'react'
import { Component } from 'react'
// antd
import { Breadcrumb, Layout, Collapse } from 'antd'
const { Content } = Layout
const { Panel } = Collapse

interface OtherProps {}

interface OtherState {}

// axios
import { getHelps } from '@/api/person'
class helpCenter {
  id: number | string
  title: string | undefined
  content: string | undefined
}

class Other extends Component<OtherProps, OtherState> {
  constructor(props: OtherProps) {
    super(props)
  }
  state = {
    text: []
  }
  callback = (key) => {
    console.log(key)
  }
  // 获取帮助
  componentDidMount() {
    this.getHelps()
  }
  getHelps = async () => {
    const res = await getHelps()
    console.log(res)
    this.setState({
      text: res.data
    })
  }
  render() {
    return (
      <div>
        {/* 面包屑 */}
        <Breadcrumb className="bread">
          <Breadcrumb.Item>帮助中心</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">常见问题</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* 内容区域 */}
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32,
            minHeight: 280
          }}
        >
          <Collapse
            defaultActiveKey={['1']}
            onChange={this.callback}
            style={{
              textAlign: 'left'
            }}
          >
            {this.state.text.map((item: helpCenter, index) => (
              <Panel header={item.title} key={item.id}>
                <p dangerouslySetInnerHTML={{ __html: `${item.content}` }}></p>
              </Panel>
            ))}
          </Collapse>
        </Content>
      </div>
    )
  }
}

export default Other
