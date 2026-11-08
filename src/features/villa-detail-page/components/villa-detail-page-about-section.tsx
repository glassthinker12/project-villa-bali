import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
	staggerItem,
} from "@/lib/animation-variants";
import { formatToIDR } from "@/lib/currency";
import { getIcon } from "@/lib/icons";

import type { VillaDetailPageAboutSection as VillaDetailPageAboutSectionType } from "../types";

type VillaDetailPageAboutSectionProps = {
	data: VillaDetailPageAboutSectionType;
};

export function VillaDetailPageAboutSection({
	data,
}: VillaDetailPageAboutSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
				<motion.img
					src="/villa-detail/about/about-bg.png"
					alt="About Background"
					loading="lazy"
					decoding="async"
					className="absolute inset-0 size-full object-cover"
					initial={{ opacity: 0 }}
					animate={{ opacity: isInView ? 0.3 : 0 }}
					transition={{ ...defaultTransition, duration: 1 }}
				/>
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
					className="flex flex-1 flex-col items-center justify-center gap-8"
				>
					<div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:gap-2">
						<p className="text-[20px] text-mist leading-7 md:w-180">
							{data.description}
						</p>
						<div className="flex w-full flex-row justify-between gap-4 md:w-auto md:flex-col md:justify-start">
							<div>
								<p className="font-medium text-xs">Starting from</p>
								<p className="font-bold text-brand text-xl">
									{formatToIDR(data.pricePerNight)}
								</p>
							</div>
							<Button variant="brand" size="lg" className="rounded-[8px]">
								Check Availability
								<ArrowRightIcon className="size-6 transition-transform duration-300 group-hover/button:translate-x-1" />
							</Button>
						</div>
					</div>
				</motion.div>

				{/* bottom */}
				{(!!data.features.length || !!data.amenities.length) && (
					<motion.div
						variants={fadeUp}
						transition={defaultTransition}
						className="grid grid-cols-1 gap-8 md:grid-cols-2"
					>
						{!!data.features.length && (
							<motion.div
								variants={staggerContainer}
								className="flex flex-col gap-8"
							>
								<motion.p
									variants={fadeUp}
									transition={defaultTransition}
									className="font-bold font-heading text-2xl"
								>
									Villa Features
								</motion.p>
								<motion.div
									variants={staggerContainer}
									className="grid grid-cols-2 gap-4"
								>
									{data.features.map((item, index) => {
										const Icon = getIcon(item.icon) ?? SparklesIcon;
										return (
											<motion.div
												key={`feature-${index}`}
												variants={staggerItem}
												transition={defaultTransition}
												className="group flex items-start gap-2 transition-transform duration-300 hover:translate-x-1"
											>
												<Icon className="size-5 shrink-0 transition-colors duration-300 group-hover:text-brand" />
												<p className="text-muted-foreground text-sm">
													{item.label}
												</p>
											</motion.div>
										);
									})}
								</motion.div>
							</motion.div>
						)}
						{!!data.amenities.length && (
							<motion.div
								variants={staggerContainer}
								className="flex flex-col gap-8"
							>
								<motion.p
									variants={fadeUp}
									transition={defaultTransition}
									className="font-bold font-heading text-2xl"
								>
									Villa Amenities
								</motion.p>
								<motion.div
									variants={staggerContainer}
									className="grid grid-cols-2 gap-4"
								>
									{data.amenities.map((item, index) => {
										const Icon = getIcon(item.icon) ?? SparklesIcon;
										return (
											<motion.div
												key={`amenity-${index}`}
												variants={staggerItem}
												transition={defaultTransition}
												className="group flex items-start gap-2 transition-transform duration-300 hover:translate-x-1"
											>
												<Icon className="size-5 shrink-0 transition-colors duration-300 group-hover:text-brand" />
												<p className="text-muted-foreground text-sm">
													{item.label}
												</p>
											</motion.div>
										);
									})}
								</motion.div>
							</motion.div>
						)}
					</motion.div>
				)}
			</motion.div>
		</section>
	);
}
