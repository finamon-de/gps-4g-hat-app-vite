import { Container, Navbar, Row } from "react-bootstrap"
import { Outlet } from "react-router"
import { MainNavigation } from "../routes/MainNavigation"
import { useBreakoint } from "../style/BreakpointHelper"

export const MainLayout = (props: any) => {

    const breakpoint = useBreakoint()

    return (
        <>
            <Navbar collapseOnSelect bg="dark" variant="dark" expand={'md'} className={'has-shadow'}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img 
                            src={'/images/finamon_logo_cyan.png'} 
                            alt={'Logo'} 
                            style={{width: 48}}
                            className="d-inline-block align-top" />
                        <div className="ms-4 me-4 d-inline-block">GPS 4G HAT App</div>
                        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-collapse" />
                    <Navbar.Collapse id={'navbar-collapse'}>
                        {
                            ['xs', 'sm'].includes(breakpoint) &&
                                <MainNavigation id={'topbar-nav'} showMobileMenu={false} vertical={false} />
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid>
                <Row>
                    <div className={`col-md-3 col-lg-2 d-md-block bg-light collapse has-shadow`}>
                        <MainNavigation id={'sidebar-nav'} vertical={true} {...props} />
                    </div>
                    <main className={'col-md-9 ms-sm-auto col-lg-10 px-md-4'}>
                        <Outlet />
                    </main>
                </Row>
            </Container>
        </>
    )
}