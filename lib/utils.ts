import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const isStartTimeValid = (startTime: Date) => {
	const currentDate = new Date();
	return startTime > currentDate;
};

export const isEndTimeValid = ({ endTime, startTime }: { startTime: Date; endTime: Date }) => {
	return endTime > startTime;
};
