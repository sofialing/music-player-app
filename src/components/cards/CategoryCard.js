import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
	return (
		<li className="card card-category">
			<Link to={`/discover/categories/${category.id}`} className="card__inner" aria-label={category.name} state={{ category }}>
				<figure className="card__image">
					<img src={category.image_url} alt={category.name} loading="lazy" width="300" height="300" />
				</figure>
				<div className="card__body">
					<h3 className="card__body--title">{category.name}</h3>
				</div>
			</Link>
		</li>
	)
}

export default CategoryCard;
