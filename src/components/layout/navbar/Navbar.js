import useViewport from 'hooks/useViewport'
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
	const { breakpoint_md, width } = useViewport();
	return width < breakpoint_md ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar;
