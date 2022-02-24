import * as React from 'react'
import { Component } from 'react'

// antd
import { Layout, Carousel } from 'antd'
const { Content } = Layout

interface HomeContentProps {}

interface HomeContentState {}

// echarts
import * as echarts from 'echarts'

// class
class characterData {
  character_name: string | undefined // 角色名称
  character_img: string | undefined // 角色图片
  character_description: string | undefined // 角色描述
}

import { characterInfo } from '@/api/characters'

class HomeContent extends Component<HomeContentProps, HomeContentState> {
  constructor(props: HomeContentProps) {
    super(props)
  }
  state = {
    characterInfo: []
  }
  componentDidMount() {
    var chartDom1 = document.querySelector('.showDetail') as HTMLElement
    var myChart1 = echarts.init(chartDom1)
    const option1 = {
      title: {
        text: '后台部分数据展示',
        x: 'center',
        y: 'top',
        textStyle: {
          fontSize: 24
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center'
      },
      series: [
        {
          name: '数量：',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '历史文章' },
            { value: 735, name: '画作' },
            { value: 580, name: '古迹' },
            { value: 484, name: '古籍' }
          ]
        }
      ]
    }
    myChart1.setOption(option1)
    // 获取人物信息
    this.getCharacterInfo()
  }
  // 获取人物信息
  getCharacterInfo = async () => {
    const res: any = await characterInfo()
    console.log(res)
    if (res.code === 200) {
      this.setState({
        characterInfo: res.data
      })
    }
  }
  // onChange
  render() {
    return (
      <React.Fragment>
        <Content
          className="site-content"
          style={{
            margin: '24px 16px',
            padding: 32
          }}
        >
          <div className="site-middle">
            <Content className="site-content-middle">
              <div className="showDetail"> </div>
            </Content>
            <Content className="site-content-middle">
              <Carousel autoplay>
                {this.state.characterInfo.map((item: characterData, index) => (
                  <div>
                    <h1>{item.character_name}</h1>
                    <img src={item.character_img} alt="" />
                    <span>{item.character_description}</span>
                  </div>
                ))}
              </Carousel>
            </Content>
          </div>
          <div className="site-large">
            <Content className="site-content-large">中</Content>
          </div>
        </Content>
      </React.Fragment>
    )
  }
}

export default HomeContent
