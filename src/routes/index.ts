// 动态加载路由
import loadable from '@loadable/component';
// react-router-config
import { RouteConfig } from 'react-router-config';
// 动态加载组件
const Home = loadable(() => import('@/pages/Home/HomePage'))// 首页
const Login = loadable(() => import('@/pages/Login/LoginPage'))// 首页
const Other = loadable(() => import("@/pages/Others/OtherPage")) // 其他

// 路由配置
const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Login,
    },
    {
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path: '/other',
        exact: true,
        component: Other,
    }
]

// 导出路由配置
export default routes;