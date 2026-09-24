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
	const transition = shouldReduceMotion
		? { duration: 0 }
		: { duration, ease: "easeInOut" as const };

	// Calculate how much to clip from the bottom when "short"
	// clipBottom is the percentage of the container hidden when collapsed
	const clipBottom = ((tall - short) / tall) * 100;

	return (
		<motion.div
			className="relative w-full"
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			style={{ height: tall }}
		>
			<motion.div
				className="relative w-full overflow-hidden rounded-[8px]"
				style={{ height: tall }}
				animate={{
					clipPath: active
						? "inset(0% 0% 0% 0% round 8px)"
						: `inset(0% 0% ${clipBottom}% 0% round 8px)`,
				}}
				transition={transition}
			>
				{images.map((image, index) => (
					<motion.img
						key={`${image.src}-${index}`}
						src={image.src}
						alt={image.alt}
						loading="eager"
						decoding="async"
						className="absolute inset-0 h-full w-full object-cover"
						style={{ willChange: "opacity" }}
						animate={{ opacity: active === (index === 0) ? 1 : 0 }}
						transition={transition}
					/>
				))}
			</motion.div>
		</motion.div>
	);
};

