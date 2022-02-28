import * as React from 'react'
import { useState, useEffect } from 'react'
// antd
import { Breadcrumb, Layout, Table, Space } from 'antd'
const { Content } = Layout

// axios
import { getAdmin } from '@/api/person'

function AdministratorPage() {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([
    {
      title: '管理员账号名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.username}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const result = await getAdmin()
    if (result.code === 200) {
      result.data.forEach((item: any) => {
        item.key = item.id
      })
      setData(result.data)
    }
  }
  return (
    <div>
      {/* 面包屑 */}
      <Breadcrumb className="bread">
        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">管理员列表</a>
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
        <Table columns={columns} dataSource={data} />
      </Content>
    </div>
  )
}

export default AdministratorPage
