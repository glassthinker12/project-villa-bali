import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
	staggerItem,
} from "@/lib/animation-variants";

import type { VillasPageVillaListSection as VillasPageVillaListSectionType } from "../types";

type VillasPageVillaListSectionProps = {
	data: VillasPageVillaListSectionType;
};

export function VillasPageVillaListSection({
	data,
}: VillasPageVillaListSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
			</div>

			{/* Content */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-16 pb-24 md:px-16 md:pb-16"
			>
				{/* top */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
				>
					<div className="flex w-full flex-col items-center gap-2">
						<p className="text-[20px] text-mist leading-7 md:w-180">
							{data.body}
						</p>
					</div>
				</motion.div>

				{/* list */}
				<motion.div
					variants={staggerContainer}
					className="grid grid-cols-1 gap-8 md:grid-cols-2"
				>
					{data.villas.map((item) => (
						<motion.div
							key={item.id}
							variants={staggerItem}
							transition={defaultTransition}
						>
							<Link
								to="/villas/$villaSlug"
								params={{ villaSlug: item.slug }}
								className="group flex flex-col gap-4 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
							>
								<div className="h-56 overflow-hidden rounded-md md:h-86">
									<img
										src={item.thumbnailUrl}
										alt={item.name}
										loading="lazy"
										decoding="async"
										className="size-full object-cover"
									/>
								</div>
								<div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
									<h3 className="font-bold font-heading text-2xl text-olive underline-offset-4 group-hover:underline">
										{item.name}
									</h3>
									<div className="flex items-center gap-2 text-mist text-sm">
										<span>{item.guests} Guests</span>
										<span>{item.bedrooms} Bedroom</span>
										<span>{item.bathrooms} Bathroom</span>
									</div>
								</div>
								<div>
									<p className="line-clamp-4 text-mist text-sm leading-5.5">
										{item.description}
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
