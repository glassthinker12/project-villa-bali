import { motion } from "motion/react";
import { ConceptOneMarqueeColumn } from "./concept-one-marquee-column";

const GALLERY_LEFT = [
	"/images/gallery/gallery-left-1.webp",
	"/images/gallery/gallery-left-1.webp",
];
const GALLERY_CENTER = [
	"/images/gallery/gallery-center-1.webp",
	"/images/gallery/gallery-center-1.webp",
];
const GALLERY_RIGHT = [
	"/images/gallery/gallery-right-1.webp",
	"/images/gallery/gallery-right-1.webp",
];

export const ConceptOneGallerySection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden py-16">
			{/* background */}
			<div className="absolute inset-0 h-2/3 w-full">
				<img
					src="/images/gallery/gallery-bg.webp"
					alt=""
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 h-full w-full bg-linear-to-b from-[#242121]/60 to-[#242121]/70" />
			</div>

			<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4">
				<motion.div
					className="flex w-full flex-col items-start justify-start gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand-soft leading-6.5">
							VILLAS GALLERY
						</p>
						<h2 className="w-full px-8 font-bold font-heading text-4xl text-white leading-11 md:px-0">
							A Glimpse of Seaview Private Villas
						</h2>
					</div>

					<motion.div
						className="w-full bg-background p-4"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						<div className="grid h-104.25 grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr_1fr]">
							<ConceptOneMarqueeColumn
								images={GALLERY_LEFT}
								direction="up"
								duration={22}
								className="hidden md:block"
							/>
							<ConceptOneMarqueeColumn
								images={GALLERY_CENTER}
								direction="down"
								duration={20}
							/>
							<ConceptOneMarqueeColumn
								images={GALLERY_RIGHT}
								direction="up"
								duration={24}
								className="hidden md:block"
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
