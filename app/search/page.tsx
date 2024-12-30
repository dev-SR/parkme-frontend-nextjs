import { AppSidebar } from '@/components/app-sidebar';
import MyMap from '@/components/location/map/Map';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
const SIDEBAR_WIDTH = '20rem';

export default function Layout() {
	return (
		<SidebarProvider
			defaultOpen={true}
			style={
				{
					'--sidebar-width': SIDEBAR_WIDTH,
					'--sidebar-width-mobile': '20rem'
				} as React.CSSProperties
			}>
			<AppSidebar />
			<SidebarInset className='h-full peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4)-var(--header-height))]'>
				<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
					<SidebarTrigger className='-ml-1' />
					<span className='text-sm '>Filter</span>
				</header>
				<ScrollArea className='h-[calc(100svh-theme(spacing.4)-(var(--header-height)*2))] bg-black'>
					<MyMap />
				</ScrollArea>
			</SidebarInset>
		</SidebarProvider>
	);
}
