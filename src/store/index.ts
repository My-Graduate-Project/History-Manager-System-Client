// 引入 创建store实例
import { createStore, applyMiddleware, compose } from "redux";
// 引入 redux-thunk
import thunk from "redux-thunk";
// 引入 redux-logger
import logger from "redux-logger";
// 引入 reducer
import reducer from "./reducer";

// 中间件挂载
// const middleware = applyMiddleware(logger, thunk);
// react_dev_tool
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// 创建store实例
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;