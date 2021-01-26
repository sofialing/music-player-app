import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import CategoryCard from 'components/partials/CategoryCard';
import './Categories.scss';

const Categories = () => {
	const { spotify } = useAuth();
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
				<Link to='categories' state={{ categories }}>
					<h2 className="title">Genres & themes</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="grid">
				{categories && categories.items.slice(0, 6).map((category, index) => <CategoryCard category={category} key={index} />)}
			</ul>
		</section>
	)
}

export default Categories;
