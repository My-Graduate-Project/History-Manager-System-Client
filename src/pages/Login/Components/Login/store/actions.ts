// 引入 constants type 类型
import { USER_LOGIN } from "./constants"
// 引入请求
import { loginUser } from "../../../../../api/login"

// 定义类型
interface UserInfo {
  username: string,
  password: string,
}

// 用户登录
export const login = (userInfo: UserInfo) => {
  return (dispatch: any) => {
    return loginUser(userInfo)
  }
}

// 用户登录状态
export const loginStatus = (data: any) => {
  return {
    type: USER_LOGIN,
    data: data
  }
}