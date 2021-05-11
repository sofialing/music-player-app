import { useState, useEffect } from 'react';
import FastAverageColor from 'fast-average-color';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const fac = new FastAverageColor();

const HeroSection = ({ title, subtitle, player_uri, image_url, description = null, details = null }) => {
	const [style, setStyle] = useState(null);

	useEffect(() => {
		fac.getColorAsync(image_url)
			.then(color => setStyle({ backgroundColor: color.rgb }))
			.catch(e => setStyle({ backgroundColor: 'transparent' }));
		return () => fac.destroy();
	}, [image_url])

	return (
		<header className="hero" style={style}>
			<div className="hero__inner">
				<img className="hero__img" src={image_url ? image_url : noImage} alt={`${subtitle} cover`} loading="lazy" width="250" height="250" />
				<div className="hero__content">
					<span className="hero__content--subtitle">{subtitle}</span>
					<div className="hero__content--title">
						<h1>{title}</h1>
					</div>
					{description && <p className="hero__content--desc">{description}</p>}
					{details && <p className="hero__content--details">{details}</p>}
				</div>
				<PlayButton uri={player_uri} type={subtitle} />
			</div>
		</header>
	)
}

export default HeroSection;
