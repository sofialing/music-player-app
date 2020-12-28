import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
	return (
		<Link to={`categories/${category.id}`}>
			<li className="category-card">
				<header className="category-card__header">
					<img src={category.icons[0].url} alt={category.name} />
				</header>
				<div className="category-card__body">
					<h3>{category.name}</h3>
				</div>
			</li>
		</Link>
	)
}

export default CategoryCard
