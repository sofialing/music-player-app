import AlbumListItem from 'components/partials/lists/AlbumListItem';

const AllAlbums = ({ albums }) => {
	return albums && (
		<section className="albums">
			<h2 className="title">Albums</h2>
			<ul className="list">
				{albums.items.map(album => <AlbumListItem album={album} displayArtist={false} key={album.id} />)}
			</ul>
		</section>
	)
}

export default AllAlbums;
