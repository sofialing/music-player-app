import { Link } from 'react-router-dom';
import './CategoryCard.scss';

const CategoryCard = ({ category }) => {
	return (
		<Link to={`/discover/categories/${category.id}`} state={{ category }}>
			<li className="category-card">
				<header className="category-card__header">
					<img src={category.image_url} alt={category.name} />
				</header>
				<div className="category-card__body">
					<h3>{category.name}</h3>
				</div>
			</li>
		</Link>
	)
}

export default CategoryCard;
