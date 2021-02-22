import AlbumListItem from 'components/partials/album/AlbumListItem';

const AllCompilations = ({ compilations }) => {
	return compilations && (
		<section className="compilations">
			<h2 className="title">Compilations</h2>
			<ul className="list">
				{compilations.items.map(album => <AlbumListItem album={album} displayArtist={false} key={album.id} />)}
			</ul>
		</section>
	)
}

export default AllCompilations;
