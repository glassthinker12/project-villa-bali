import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "#/components/ui/button";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "../lib/animation-variants";
import type { GalleryContent } from "../types";

type HomepageGallerySectionProps = GalleryContent;

const GALLERY_ITEM_CLASSES = [
	"col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-1 md:h-78",
	"col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-2 md:aspect-auto md:h-78",
	"col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-1 md:aspect-auto md:h-78",
	"col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78",
	"col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78",
];

export const HomepageGallerySection = ({
	eyebrow,
	heading,
	galleries,
	cta,
}: HomepageGallerySectionProps) => {
	const { ref, isInView } = useScrollReveal();

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
				{/* Header */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col items-center justify-center gap-2 text-center"
				>
					<p className="font-subheading text-base text-brand tracking-wider">
						{eyebrow}
					</p>
					<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
						{heading}
					</h2>
				</motion.div>

				{/* Grid */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"
				>
					{galleries
						.slice(0, GALLERY_ITEM_CLASSES.length)
						.map((gallery, index) => (
							<div
								key={`${gallery.imageUrl}-${index}`}
								className={GALLERY_ITEM_CLASSES[index]}
							>
								<img
									src={gallery.imageUrl}
									alt={gallery.alt}
									loading="lazy"
									decoding="async"
									className="size-full object-cover"
								/>
							</div>
						))}
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<a href={cta.href} className={buttonVariants({ variant: "ghost" })}>
						{cta.label}
						<ArrowRight className="size-6" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};
