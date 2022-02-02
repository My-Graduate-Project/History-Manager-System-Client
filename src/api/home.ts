import request from "../common/axios"

// 
export function getRandomData() {
  return request('/home', 'get');
}