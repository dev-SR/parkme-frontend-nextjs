'use client';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { Button } from '../button';
import { LuMapPin } from 'react-icons/lu';

const GoToSearchButton = () => {
	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<Link href='/search'>
				<Button className='rounded-full px-8 py-6 text-[1.1rem] bg-primary dark:bg-primary/35  hover:bg-primary/80 ark:hover:bg-primary/60 border border-primary text-primary-foreground dark:text-foreground'>
					<LuMapPin className='size-8 animate-bounce' />
					<span className=''>Find Parking Nearby</span>
				</Button>
			</Link>
		</motion.div>
	);
};

export default GoToSearchButton;
/* 

        // Button code
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Shimmer
        </button>
  
        // tailwind.config.js code
        {

        }
      
*/
