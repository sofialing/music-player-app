import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
	return (
		<Link to={`/discover/categories/${category.id}`} state={{ category }}>
			<li className="card card-category">
				<header className="card__header">
					<img src={category.image_url} alt={category.name} />
				</header>
				<div className="card__body">
					<h3 className="card__body--title">{category.name}</h3>
				</div>
			</li>
		</Link>
	)
}

export default CategoryCard;
