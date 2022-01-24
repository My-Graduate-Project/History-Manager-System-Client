import React from 'react'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'

const Layout: React.FC<RouteConfigComponentProps> = React.memo(function Layout(props) {
    // const history = useHistory()
    const { route } = props
    console.log('hybird layout')
    return renderRoutes(route?.routes)
})

export default Layout