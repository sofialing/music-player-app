import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import CategoryCard from 'components/partials/CategoryCard';
import './Categories.scss';

const Categories = () => {
	const { spotify } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const num = width <= breakpoint_lg ? 4 : 6;
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getCategories(options)
			.then(({ categories }) => setCategories(categories))
			.catch(error => console.log(error))

	}, [spotify])

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
				{categories && categories.items.slice(0, num).map((category, index) => <CategoryCard category={category} key={index} />)}
			</ul>
		</section>
	)
}

export default Categories;
