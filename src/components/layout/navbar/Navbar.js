import useViewport from 'hooks/useViewport'
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
	const { breakpoint, width } = useViewport();
	return width < breakpoint ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar;
