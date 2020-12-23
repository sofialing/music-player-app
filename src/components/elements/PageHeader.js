import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const PageHeader = ({ title }) => {
	const navigate = useNavigate();
	return (
		<header className="page-header">
			<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
			<h1>{title}</h1>
		</header>
	)
}

export default PageHeader
