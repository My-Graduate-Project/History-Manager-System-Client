// 导入 redux 组件实例
import { combineReducers } from "redux"
// 导入注册组件
import { reducer as registerReducer } from "@/pages/Login/Components/Register/store"

// 组合所有的reducer

export default combineReducers({
  // 注册组件
  register: registerReducer,
})