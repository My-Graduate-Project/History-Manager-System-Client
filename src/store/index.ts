// 生成 createStore 实例
import { createStore, applyMiddleware, compose } from 'redux';
// 引入 redux-saga
import createSagaMiddleware from 'redux-saga';
// 引入 reducer
import reducer from './reducer';
// 引入 saga
import saga from "./saga"
// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();
// 挂载 saga 中间件
const storeEnhancer = applyMiddleware(sagaMiddleware);
// trace 开发环境下的调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

// 创建 store 实例
const store = createStore(reducer, composeEnhancers(storeEnhancer));

// 启动 saga
sagaMiddleware.run(saga);

// 导出 store 实例
export default store;