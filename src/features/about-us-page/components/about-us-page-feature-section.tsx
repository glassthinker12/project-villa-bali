import { SparklesIcon } from "lucide-react";
import { motion } from "motion/react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
	staggerGrid,
	staggerItem,
} from "@/lib/animation-variants";
import { getIcon } from "@/lib/icons";

import type { AboutUsPageFeatureSection as AboutUsPageFeatureSectionType } from "../types";

type AboutUsPageFeatureSectionProps = {
	data: AboutUsPageFeatureSectionType;
};

export function AboutUsPageFeatureSection({
	data,
}: AboutUsPageFeatureSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<motion.div
						variants={staggerGrid}
						className="grid grid-cols-2 items-start gap-4 md:grid-cols-4"
					>
						{data.features.map((item, index) => {
							const Icon = getIcon(item.icon) ?? SparklesIcon;

							return (
								<motion.div
									key={`about-us-feature-${index + 1}`}
									variants={staggerItem}
									className="flex flex-col items-center justify-center gap-2"
								>
									<Icon className="size-8" />
									<p className="text-center text-muted-foreground text-sm">
										{item.label}
									</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
}
