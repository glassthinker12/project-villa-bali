import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const GALLERY_IMAGES = [
	"/images/gallery/gallery-two-1.jpg",
	"/images/gallery/gallery-two-2.png",
	"/images/gallery/gallery-two-3.jpg",
	"/images/gallery/gallery-two-4.jpg",
];

export const ConceptTwoGallerySection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden py-16">
			<div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-4"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="relative h-110 w-full grid grid-cols-2 gap-y-4">
						{GALLERY_IMAGES.map((gallery, index) => {
							return (
								<motion.div
									key={`gallery-${index + 1}`}
									className="min-h-0 min-w-0"
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
								>
									<div
										className={`h-full w-full ${index === 1 ? "p-4 pr-0" : index === 2 ? "p-4 pl-0" : ""}`}
									>
										<img
											src={gallery}
											alt={`gallery-${index + 1}`}
											className="h-full w-full object-cover rounded-[8px] overflow-hidden"
										/>
									</div>
								</motion.div>
							);
						})}
					</div>

					<motion.div
						className="relative h-110 w-full rounded-[8px] overflow-hidden flex items-center justify-center"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						{/* background */}
						<div className="absolute h-full w-full inset-0">
							<img
								src="/images/gallery/gallery-bg.webp"
								alt=""
								className="h-full w-full object-cover"
							/>
							<div className="absolute h-full w-full inset-0 bg-[linear-gradient(180deg,rgba(36,33,33,0.60)_0.01%,rgba(36,33,33,0.70)_99.99%)] opacity-65" />
						</div>

						<div className="relative text-white">
							<div className="flex flex-col items-center justify-center gap-2">
								<p className="text-base text-brand-soft uppercase">
									VILLAS GALLERY
								</p>
								<h2 className="w-full font-bold font-heading text-4xl text-paper leading-11 text-center">
									A Glimpse of SEAVIEW Private Villas
								</h2>

								<div className="w-full px-4 mt-4">
									<Button
										variant="paper"
										size="xl"
										className="w-full rounded-[8px]"
									>
										See All Photos & Videos
										<ArrowRightIcon className="size-6" />
									</Button>
								</div>
							</div>
						</div>
					</motion.div>

					<div className="relative h-110 w-full grid grid-cols-2 gap-y-4">
						{GALLERY_IMAGES.map((gallery, index) => {
							return (
								<motion.div
									key={`gallery-${index + 1}`}
									className="min-h-0 min-w-0"
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
								>
									<div
										className={`h-full w-full ${index === 1 ? "p-4 pr-0" : index === 2 ? "p-4 pl-0" : ""}`}
									>
										<img
											src={gallery}
											alt={`gallery-${index + 1}`}
											className="h-full w-full object-cover rounded-[8px] overflow-hidden"
										/>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
};
