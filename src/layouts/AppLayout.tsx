import { Link, Outlet } from 'react-router'

function AppLayout() {
    return (
        <>
            <nav>
                <Link to="/">Catch Log</Link>
                <Link to="/stats">Statistics</Link>
            </nav>

            <Outlet />
        </>
    )
}

export default AppLayout