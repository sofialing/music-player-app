import useViewport from 'hooks/useViewport'
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
	const { breakpoint_lg, width } = useViewport();
	return width < breakpoint_lg ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar;
