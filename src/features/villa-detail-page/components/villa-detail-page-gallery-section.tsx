import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	scaleIn,
	staggerContainer,
} from "@/lib/animation-variants";

import type { VillaDetailPageGallerySection as VillaDetailPageGallerySectionType } from "../types";

type VillaDetailPageGallerySectionProps = {
	data: VillaDetailPageGallerySectionType;
};

const GALLERY_ITEM_CLASSES = [
	"row-span-1 h-85.75 overflow-hidden rounded-lg md:row-span-2 md:h-full",
	"h-85.75 overflow-hidden rounded-lg md:aspect-auto md:h-78",
	"h-85.75 overflow-hidden rounded-lg md:aspect-auto md:h-78",
	"h-85.75 overflow-hidden rounded-lg md:aspect-auto md:h-78",
	"h-85.75 overflow-hidden rounded-lg md:aspect-auto md:h-78",
];

export function VillaDetailPageGallerySection({
	data,
}: VillaDetailPageGallerySectionProps) {
	const { ref, isInView } = useScrollReveal();

	if (data.galleries.length < 1) return;

	return (
		<section
			ref={ref}
			className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12"
			>
				{/* Grid */}
				<motion.div
					variants={staggerContainer}
					className="grid w-full gap-2 md:grid-cols-[1.75fr_1fr_1fr] md:grid-rows-2 md:gap-4"
				>
					{data.galleries
						.slice(0, GALLERY_ITEM_CLASSES.length)
						.map((gallery, index) => (
							<motion.div
								key={gallery.id}
								variants={scaleIn}
								transition={defaultTransition}
								className={`group ${GALLERY_ITEM_CLASSES[index]}`}
							>
								<img
									src={gallery.imageUrl}
									alt={gallery.title}
									loading="lazy"
									decoding="async"
									className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								/>
							</motion.div>
						))}
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<Link to="/" className={buttonVariants({ variant: "ghost-brand" })}>
						View All
						<ArrowRightIcon className="size-6 transition-transform duration-300 group-hover/button:translate-x-1" />
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}
