import request from "../common/axios"

// 获取管理员数据
export const getAdmin = async () => {
  return await request("/adminList", "get");
}

// 获取用户数据
export const getUsers = async () => {
  return await request("/userList", "get");
}

// 获取帮助数据
export const getHelps = async () => {
  return await request("/helpCenterList", "get");
}