import useViewport from 'hooks/useViewport'
import NowPlayingBarMobile from './NowPlayingBarMobile';
import NowPlayingBarDesktop from './NowPlayingBarDesktop';
const NowPlayingBar = () => {
	const { breakpoint_md, width } = useViewport();
	return width < breakpoint_md ? <NowPlayingBarMobile /> : <NowPlayingBarDesktop />
}

export default NowPlayingBar
