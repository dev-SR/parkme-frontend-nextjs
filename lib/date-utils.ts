import { format } from 'date-fns';
import pluralize from 'pluralize';

export const toLocalISOString = (date: Date): string => {
	const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
	const localISOTime = new Date(date.getTime() - tzoffset).toISOString();

	return localISOTime;
};

export const formatDate = (date: string) => {
	const dateObj = new Date(date);
	return format(dateObj, 'dd MMM yy');
};

// Reusable function for formatting dates
export function formatDate2(timestamp: string, formatString: string = 'EEE, dd MMM yyyy, h:mm a') {
	const date = new Date(timestamp);
	return format(date, formatString);
}
/* 
// Format 1: Monday, January 6th, 2025 7:41
const format1 = format(date, "EEEE, MMMM do, yyyy h:mm a");
// Format 2: 06/01/2025, 19:41
const format2 = format(date, "dd/MM/yyyy, HH:mm");
// Format 3: Jan 6, 2025 7:41 PM
const format3 = format(date, "MMM d, yyyy h:mm a");
// Format 4: 2025-01-06 19:41
const format4 = format(date, "yyyy-MM-dd HH:mm");
// Format 5: Mon, 06 Jan 2025, 7:41 PM
const format5 = format(date, "EEE, dd MMM yyyy, h:mm a");
*/

export const formatTime = (date: string) => {
	const dateObj = new Date(date);
	return format(dateObj, 'HH:mm');
};

export const differenceInTime = ({
	startTime,
	endTime,
	unit = 'milliseconds'
}: {
	startTime: Date;
	endTime: Date;
	unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours';
}) => {
	const diffInMs = endTime.getTime() - startTime.getTime();
	switch (unit) {
		case 'milliseconds':
			return diffInMs;
		case 'seconds':
			return diffInMs / 1000;
		case 'minutes':
			return diffInMs / 1000 / 60;
		case 'hours':
			return diffInMs / 1000 / 60 / 60;
		default:
			throw new Error(`Invalid time unit: ${unit}`);
	}
};

export const getTimeUnits = (timeInSeconds: number) => {
	let timeString = '';

	timeInSeconds = timeInSeconds / 1000;

	const days = Math.floor(timeInSeconds / 86400);
	timeInSeconds -= days * 86400;
	if (days > 0) {
		timeString += `${days} ${pluralize('day', days)}`;
	}

	const hours = Math.floor(timeInSeconds / 3600);
	timeInSeconds -= hours * 3600;
	if (hours > 0) {
		if (timeString.length > 0) {
			timeString += ' ';
		}
		timeString += `${hours} ${pluralize('hour', hours)}`;
	}

	const minutes = Math.floor(timeInSeconds / 60);
	timeInSeconds -= minutes * 60;
	if (minutes > 0) {
		if (timeString.length > 0) {
			timeString += ' ';
		}
		timeString += `${minutes} ${pluralize('minute', minutes)}`;
	}

	return {
		days,
		hours,
		minutes,
		timeString
	};
};
