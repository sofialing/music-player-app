import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const UserModule = ({ user, logout }) => {
	const [toggle, setToggle] = useState(false);

	return (
		<div className="user-settings">
			<div className="user-settings__inner">
				<button className="user-settings__btn" aria-label="Toggle settings" aria-expanded={toggle} onClick={() => setToggle(prevState => !prevState)}>
					<figure className="user-settings__btn--img" title={user.display_name}>
						<img src={user.image} alt={user.display_name} aria-hidden="false" />
					</figure>
					<span className="user-settings__btn--name">{user.display_name}</span>
					<ArrowDropDownIcon />
				</button>
				<ul className="user-settings__menu" aria-hidden={!toggle}>
					<li className="user-settings__menu--item">
						<span className={user.is_premium ? 'is-premium' : 'is-free'}>{user.is_premium ? 'Premium user' : 'Free account'}</span>
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
