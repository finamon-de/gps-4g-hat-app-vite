import { Nav } from "react-bootstrap"
import { useLocation } from "react-router"
import { getChildRoutes } from "./MainRouter"

/**
 * Main navigation component.
 */
export const MainNavigation = (props: any) => {

    const location = useLocation()

    const { vertical, id } = props

    const navItems = () => {
        const routes = getChildRoutes()
        const children = routes.map((route, index) => {
            const isActive = location.pathname === (route.path ?? '')
            return (
                <Nav.Item key={`nav-item-${index}`}>
                    <Nav.Link href={route.path ?? '#'} className={isActive ? 'active':''}>{ route.name ?? 'Missing link name' }</Nav.Link>
                </Nav.Item>
            )
        })

        return vertical ? (
            <div className="position-sticky pt-3 sidebar-sticky">
                {children}
            </div>
        ) : children
    }

    return (
        <Nav id={id} as={'nav'} className={`me-auto nav-pills ${vertical ? 'flex-column' : ''}`}>
            { navItems() }
        </Nav>
    )
}