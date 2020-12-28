import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { usePlayer } from '../../contexts/PlayerContext'
import CategoryCard from '../elements/CategoryCard'

const Categories = () => {
	const { spotify } = usePlayer();
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getCategories(options)
			.then(({ categories }) => setCategories(categories))
			.catch(error => console.log(error))

	}, [spotify])

	return categories && (
		<section>
			<header>
				<Link to='categories'>
					<h2>Genres and themes</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="categories__grid">
				{categories && categories.items.splice(0, 6).map((category, index) => <CategoryCard category={category} key={index} />)}
			</ul>
		</section>
	)
}

export default Categories
