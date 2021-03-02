import AlbumListItem from 'components/partials/lists/AlbumListItem';

const AllSingles = ({ singles }) => {
	return singles && (
		<section className="singles">
			<h2 className="title">Singles</h2>
			<ul className="list">
				{singles.items.map(album => <AlbumListItem album={album} displayArtist={false} key={album.id} />)}
			</ul>
		</section>
	)
}

export default AllSingles;
