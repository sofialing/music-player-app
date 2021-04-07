import { Link } from 'react-router-dom';
import PlayButton from 'components/buttons/PlayButton';
import noImage from 'assets/images/no-image.png';

const DiscoverCard = ({ playlist, user }) => {
	const imgSrc = playlist.image_url ? playlist.image_url : noImage;

	return (
		<section className="card card-discover">
			{/* <div className="card__inner"> */}
			<header className="card__header">
				<img src={imgSrc} alt={playlist.name} />
				<PlayButton uri={playlist.player_uri} type={playlist.type} />
			</header>
			<div className="card__body">
				<h3 className="card__body--subtitle">{playlist.type}</h3>
				<h2 className="card__body--title">
					<Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
				</h2>
				<p className="card__body--desc">{playlist.description}</p>
				<p className="card__body--details">Made for {user.display_name} by {playlist.owner} &middot; {playlist.total_tracks} tracks</p>
			</div>
			{/* </div> */}
		</section>
	)
}

export default DiscoverCard;
