// 引入 redux
import { createStore } from "redux";
// 引入 reducer
import reducer from "./reducer";


// 创建 store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 导出 store
export default store;