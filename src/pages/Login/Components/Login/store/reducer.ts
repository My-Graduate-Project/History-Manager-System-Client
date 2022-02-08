// 引入 constants type 类型
import { USER_LOGIN } from "./constants"
import isEmpty from 'lodash/isEmpty';

// 初始化数据
const initialState = {
  isAuth: false,
  userInfo: {}
}

// 创建reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuth: !isEmpty(action.data),
        userInfo: action.data
      }
    default:
      return state;
  }
}

export default reducer;