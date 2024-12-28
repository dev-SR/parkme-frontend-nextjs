import fs from 'fs';
import Link from 'next/link';
import path from 'path';

export const findPages = (dir: string): string[] => {
	let results: string[] = [];
	const list = fs.readdirSync(dir);

	list.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(findPages(filePath));
		} else if (file === 'page.tsx') {
			results.push(filePath);
		}
	});

	return results;
};
export const mapRoutes = (pages: string[], baseDir: string): string[] => {
	return pages.map((page) => {
		const relativePath = path.relative(baseDir, page);
		if (relativePath === 'page.tsx') return '/';

		const route = relativePath.replace(/\\page\.tsx$/, '').replace(/\\/g, '/'); // Windows compatibility
		return route === 'index' ? '/' : `/${route}`;
	});
};
const NavigationHelperPage = async ({ currentPage }: { currentPage: string }) => {
	const pagesDirectory = path.join(process.cwd(), 'app');
	const pages = findPages(pagesDirectory);
	const routes = mapRoutes(pages, pagesDirectory);

	return (
		<div className='flex flex-col h-full w-full mx-auto p-10 space-y-4'>
			<div className='text-primary font-bold '>
				Current Page: <span className='underline'>{currentPage}</span>
			</div>
			<ul className='space-y-2 '>
				{routes.map((route, index) => (
					<li key={index} className='list-item'>
						<Link href={route} className='text-primary underline'>
							{route === '/' ? '/root' : route}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavigationHelperPage;
