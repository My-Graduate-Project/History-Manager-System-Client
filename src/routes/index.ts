// 动态加载路由
import loadable from '@loadable/component';
// react-router-config
import { RouteConfig } from 'react-router-config';
// 动态加载组件
import Home from "@/pages/Home/HomePage" // 首页

// 路由配置
const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    }
]

// 导出路由配置
export default routes;