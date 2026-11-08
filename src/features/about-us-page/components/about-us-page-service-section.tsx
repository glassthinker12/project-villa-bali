import { AstroidIcon } from "lucide-react";
import { motion } from "motion/react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";

import type { AboutUsPageServiceSection as AboutUsPageServiceSectionType } from "../types";

type AboutUsPageServiceSectionProps = {
	data: AboutUsPageServiceSectionType;
};

export function AboutUsPageServiceSection({
	data,
}: AboutUsPageServiceSectionProps) {
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

				{/* right */}
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
						<p className="text-base text-mist leading-5.5">{data.body}</p>
						<div className="mt-6 flex w-full flex-col gap-2">
							{data.services.map((item, index) => (
								<div
									key={`about-us-service-${index + 1}`}
									className="flex w-full items-center justify-center gap-2 rounded-md border border-olive px-4 py-2"
								>
									<AstroidIcon className="size-4 text-olive" />
									<p className="text-olive text-sm md:text-base">{item}</p>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
