import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import noImage from 'assets/images/no-user-image.png';


const UserModule = ({ user, logout }) => {
	const [toggle, setToggle] = useState(false);
	const imgSrc = user.image ? user.image : noImage;

	return (
		<div className="user-settings">
			<div className="user-settings__inner">
				<button className="user-settings__btn" aria-label="Toggle settings" aria-expanded={toggle} onClick={() => setToggle(prevState => !prevState)}>
					<figure className="user-settings__btn--img" title={user.display_name}>
						<img src={imgSrc} alt={user.display_name} aria-hidden="false" width="30" height="30" />
					</figure>
					<span className="user-settings__btn--name">{user.display_name}</span>
					<ArrowDropDownIcon />
				</button>
				<ul className="user-settings__menu" aria-hidden={!toggle}>
					<li className="user-settings__menu--item">
						{user.is_premium
							? <span className="is-premium">Premium <CheckCircleOutlineIcon /> </span>
							: <span className="not-premium">Free account <BlockIcon /></span>
						}
					</li>
					<li className="user-settings__menu--item">
						<button onClick={logout}>Log out</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default UserModule;
