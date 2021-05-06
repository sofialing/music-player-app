import { useViewport } from 'contexts/ViewportContext';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
	const { isMobile } = useViewport();

	return isMobile ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar;
