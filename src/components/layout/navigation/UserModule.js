import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

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
					<li className="user-settings__menu--item"><Link to="/profile">Profile</Link></li>
					<li className="user-settings__menu--item"><button onClick={logout}>Logga ut</button></li>
				</ul>
			</div>
		</div>
	)
}

export default UserModule;
