import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import useViewport from '../../../hooks/useViewport'

const Navbar = () => {
	const { breakpoint, width } = useViewport();
	return width < breakpoint ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar;
