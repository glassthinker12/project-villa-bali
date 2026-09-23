import { motion, useReducedMotion } from "motion/react";

export type GalleryFlipImage = {
	src: string;
	alt: string;
};

export type GalleryFlipSlot = {
	images: [GalleryFlipImage, GalleryFlipImage];
};

type ConceptTwoGalleryFlipProps = {
	images: [GalleryFlipImage, GalleryFlipImage];
	active: boolean;
	tall: number;
	short: number;
	duration?: number;
};

export const ConceptTwoGalleryFlip = ({
	images,
	active,
	tall,
	short,
	duration = 0.7,
}: ConceptTwoGalleryFlipProps) => {
	const shouldReduceMotion = useReducedMotion();
	const fadeTransition = shouldReduceMotion
		? { duration: 0 }
		: { duration, ease: "easeInOut" as const };

	return (
		<motion.div
			className="relative w-full"
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<motion.div
				className="relative w-full overflow-hidden rounded-[8px]"
				animate={{ height: active ? tall : short }}
				transition={{ duration, ease: "easeInOut" }}
			>
				{images.map((image, index) => (
					<motion.img
						key={`${image.src}-${index}`}
						src={image.src}
						alt={image.alt}
						className="absolute inset-0 h-full w-full object-cover"
						animate={{ opacity: active === (index === 0) ? 1 : 0 }}
						transition={fadeTransition}
					/>
				))}
			</motion.div>
		</motion.div>
	);
};
