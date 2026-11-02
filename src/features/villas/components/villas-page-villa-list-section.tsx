import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { VillaContent } from "../types";

type VillasPageVillaListSectionProps = VillaContent;

export const VillasPageVillaListSection = ({
	body,
	villas,
}: VillasPageVillaListSectionProps) => {
	return (
		<section className="relative overflow-hidden md:overflow-visible">
			{/* Background — gradient + decorative image */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
				<img
					src="/images/about/about-bg.webp"
					alt=""
					loading="lazy"
					decoding="async"
					className="absolute inset-0 size-full object-cover opacity-30"
				/>
			</div>

			{/* Content */}
			<div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:px-16 md:pb-16">
				<div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
					<div className="flex w-full flex-col items-center gap-2 md:w-180">
						<p className="text-foreground text-lg leading-5.5 md:text-mist">
							{body}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{villas.map((villa, index) => (
						<motion.div
							key={villa.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.6, delay: index * 0.15 }}
						>
							<Link
								to="/villas/$slug"
								params={{ slug: villa.slug }}
								className="flex h-full flex-col gap-4 transition-transform hover:scale-[1.02]"
							>
								<div className="h-86 overflow-hidden rounded-md">
									<img
										src={villa.imageUrl}
										alt=""
										loading="lazy"
										decoding="async"
										className="size-full object-cover"
									/>
								</div>
								<div className="flex flex-col justify-between md:flex-row md:items-end">
									<div>
										<h3 className="font-bold font-heading text-2xl text-olive">
											{villa.name}
										</h3>
									</div>
									<div>
										<div className="flex items-center gap-2 text-foreground text-sm leading-5.5 md:text-mist">
											<span>{villa.guest} Guests</span>
											<span>{villa.bedroom} Bedroom</span>
											<span>{villa.bathroom} Bathroom</span>
										</div>
									</div>
								</div>
								<div>
									<p className="text-foreground text-sm leading-5.5 md:text-mist">
										{villa.description}
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
