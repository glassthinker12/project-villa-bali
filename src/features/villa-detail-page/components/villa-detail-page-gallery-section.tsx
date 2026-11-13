import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { GalleryPreview } from "@/components/gallery-preview";
import { Button } from "@/components/ui/button";
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
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);

	const previewItems = useMemo(
		() =>
			data.galleries.map((gallery) => ({
				id: gallery.id,
				src: gallery.imageUrl,
				title: gallery.title || "Villa photo",
			})),
		[data.galleries],
	);

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
						.map((gallery, index) => {
							const title = gallery.title || "Villa photo";

							return (
								<motion.div
									key={gallery.id}
									variants={scaleIn}
									transition={defaultTransition}
									className={`group ${GALLERY_ITEM_CLASSES[index]}`}
								>
									<button
										type="button"
										aria-label={`Open ${title}`}
										onClick={() => setPreviewIndex(index)}
										className="block size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
									>
										<img
											src={gallery.imageUrl}
											alt={title}
											loading="lazy"
											decoding="async"
											draggable={false}
											className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										/>
									</button>
								</motion.div>
							);
						})}
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<Button
						type="button"
						variant="ghost-brand"
						aria-label="View all villa photos"
						onClick={() => setPreviewIndex(0)}
					>
						View All
						<ArrowRightIcon className="size-6 transition-transform duration-300 group-hover/button:translate-x-1" />
					</Button>
				</motion.div>
			</motion.div>

			<GalleryPreview
				items={previewItems}
				index={previewIndex}
				onIndexChange={setPreviewIndex}
				onClose={() => setPreviewIndex(null)}
			/>
		</section>
	);
}
