import request from "../common/axios"

/** 用户注册信息
 * 
 * @param userInfo { Object }
 * @returns 
 */
export function registerUser(userInfo: any) {
  return request('/register', 'post', userInfo);
}