import { motion } from "motion/react";

import { Separator } from "@/components/ui/separator";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";

import type { AboutUsPageAboutSection as AboutUsPageAboutSectionType } from "../types";

type AboutUsPageAboutSectionProps = {
	data: AboutUsPageAboutSectionType;
};

export function AboutUsPageAboutSection({
	data,
}: AboutUsPageAboutSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				{/* left */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
				>
					<div className="flex w-full flex-col items-center gap-2">
						<p className="font-subheading text-base text-brand uppercase tracking-wider">
							{data.eyebrow}
						</p>
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{data.heading}
						</h2>
						<Separator className="my-6" />
						<div className="grid w-full grid-cols-3">
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-4xl text-olive md:text-[72px]">
									{data.rating}
								</p>
								<p className="text-center text-muted-foreground text-xs md:text-base">
									Guest Rating in Google
								</p>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-4xl text-olive md:text-[72px]">
									{data.guestWelcomed}
								</p>
								<p className="text-center text-muted-foreground text-xs md:text-base">
									Guest Welcomed
								</p>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-4xl text-olive md:text-[72px]">
									{data.guestSatisfaction}
								</p>
								<p className="text-center text-muted-foreground text-xs md:text-base">
									Guest Satisfaction
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* right */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="relative aspect-4/3 w-full flex-1 overflow-hidden rounded-lg md:aspect-auto md:h-92"
				>
					<img
						src={data.imageUrl}
						alt={data.heading}
						loading="lazy"
						decoding="async"
						className="absolute inset-0 size-full object-cover"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}
