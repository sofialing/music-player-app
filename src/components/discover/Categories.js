import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import CategoryCard from 'components/partials/cards/CategoryCard';
import './Categories.scss';

const Categories = ({ categories }) => {
	const { breakpoint_lg, width } = useViewport();
	const num = width <= breakpoint_lg ? 4 : 6;

	return categories && (
		<section className="categories">
			<header className="header">
				<h2 className="title">
					<Link to='categories' state={{ categories }}>Genres & themes</Link>
				</h2>
				<Link className="view-all" to='categories' state={{ categories }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{categories.items.slice(0, num).map(category => <CategoryCard category={category} key={category.id} />)}
			</ul>
		</section>
	)
}

export default Categories;
