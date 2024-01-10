import Link from "next/link"

const Navbar = () => {
    const menus = [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Profile', url: '/profile' },
        { title: 'Admin', url: '/admin' },
        { title: 'Logout', url: 'logout' }
    ]

    return (
        <nav className="flex items-center justify-between w-screen h-12 px-12">
            <div>
                <h1 className="text-xl font-bold">Overtime Management System</h1>
            </div>
            <ul className="flex items-center gap-4 text-sm">
                {menus.map(menu => (
                    <li key={menu.url}>
                        <Link href={menu.url}>{menu.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
