import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/partials/buttons/PlayButton';

const HeroSection = ({ title, subtitle, player_uri, image_url, description = null, details = null }) => {
	return (
		<header className="hero">
			<div className="hero__inner">
				<img className="hero__img" src={image_url ? image_url : noImage} alt={`${subtitle} cover`} />
				<div className="hero__content">
					<h2 className="hero__content--subtitle">{subtitle}</h2>
					<h1 className="hero__content--title">{title}</h1>
					{description && <p className="hero__content--desc">{description}</p>}
					{details && <p className="hero__content--details">{details}</p>}
				</div>
				<PlayButton uri={player_uri} type={subtitle} />
			</div>
		</header>
	)
}

export default HeroSection;
