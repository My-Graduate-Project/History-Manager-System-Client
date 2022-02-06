// 引入 constants type 类型
import { USER_REGISTER } from "./constants"
// 引入请求
import { registerUser } from "@/api/login"

// 定义类型
interface UserInfo {
  username: string,
  password: string,
  email: string,
}

// 用户注册
export const register = (userInfo: UserInfo) => {
  console.log(userInfo)
  return (dispatch: any) => {
    return registerUser(userInfo)
  }
}