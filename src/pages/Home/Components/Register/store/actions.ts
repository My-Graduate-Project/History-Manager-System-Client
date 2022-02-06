// 引入 constants type 类型
import { USER_REGISTER } from "./constants"

// 定义类型
interface UserInfo { }

// 用户注册
export const register = (userInfo: UserInfo) => {
  console.log('register');
  return {
    type: USER_REGISTER,
  };
}