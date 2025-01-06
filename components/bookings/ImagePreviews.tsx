'use client';
import Autoplay from 'embla-carousel-autoplay';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext
} from '../ui/carousel';
const image_urls = [
	'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--976407210_la43y2.jpg',
	'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/render-a-cover-picture-of-a-secure-parking-garage-near-central-park-in-manhattan-new-york-the-imag-736153979_kvpczt.jpg',
	'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--184920453_v8umyi.jpg',
	'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-an-affordable-clean-outdoor-parking-garage-in-brooklyn-new-york-the-pict-620611113_ortr3g.jpg',
	'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-and-clean-parking-garage-in-brooklyn-new-york-the-picture-sh-825512221_kzvig6.jpg'
];

const ImagePreviews = () => {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 2000
				})
			]}
			className='w-full '>
			<CarouselContent className=''>
				{image_urls.map((url, index) => (
					<CarouselItem key={index}>
						<img src={url} alt='' className='object-cover h-[200px] w-full' />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default ImagePreviews;
