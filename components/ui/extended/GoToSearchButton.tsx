'use client';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { Button } from '../button';

const GoToSearchButton = () => {
	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<Link href='/search'>
				<Button size={'lg'} className='rounded-full px-8 py-6 '>
					<span className='text-lg font-medium leading-6 text-primary-foreground'>
						Find Parking Nearby
					</span>
				</Button>
			</Link>
		</motion.div>
	);
};

export default GoToSearchButton;
