import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './PageHeader.scss';

const PageHeader = ({ title }) => {
	const navigate = useNavigate();
	return (
		<header className="page-header">
			<h1>{title}</h1>
			<button aria-label="Go back" className="back-btn" onClick={() => navigate(-1)} title="Go back">
				<ArrowBackIosIcon />
			</button>
		</header>
	)
}

export default PageHeader;
