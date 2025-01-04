'use client';
import { motion } from 'motion/react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
export const DirectionDown = ({ count = 5 }: { count?: number }) => {
	return (
		<div className='flex flex-col items-center -space-y-2'>
			{Array(count)
				.fill(0)
				.map((v, i) => (
					<motion.div
						key={i}
						animate={{ opacity: [0, 0.8, 0] }}
						transition={{
							duration: 2, // Duration of the animation cycle
							ease: 'easeInOut',
							repeat: Infinity, // Infinite loop
							delay: 0.4 * i
						}}>
						<FaAngleDown className='text-green-500 size-6' />
					</motion.div>
				))}{' '}
		</div>
	);
};

export const DirectionToRight = ({ count = 5 }: { count?: number }) => {
	return (
		<div className='flex  items-center -space-x-2'>
			{Array(count)
				.fill(0)
				.map((v, i) => (
					<motion.div
						key={i}
						animate={{ opacity: [0, 0.8, 0] }}
						transition={{
							duration: 2, // Duration of the animation cycle
							ease: 'easeInOut',
							repeat: Infinity, // Infinite loop
							delay: 0.4 * i
						}}>
						<FaAngleRight className='text-green-500 size-6' />
					</motion.div>
				))}{' '}
		</div>
	);
};
