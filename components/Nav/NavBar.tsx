'use client';

import { ModeToggle } from './ModeToggle';

const NavBar = () => {
	return (
		<div className='bg-blue-400  h-12 w-screen flex items-center justify-end pr-6'>
			<ModeToggle />
		</div>
	);
};

export default NavBar;
