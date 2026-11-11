import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";
import type { ExperiencePageSeventhExperienceSection as ExperiencePageSeventhExperienceSectionType } from "../types";

type ExperiencePageSeventhExperienceSectionProps = {
	data: ExperiencePageSeventhExperienceSectionType;
};

export function ExperiencePageSeventhExperienceSection({
	data,
}: ExperiencePageSeventhExperienceSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative w-full overflow-hidden bg-cream py-9"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-10 px-4 md:px-16 lg:grid lg:grid-cols-[minmax(0,1fr)_475px] lg:items-start lg:gap-8"
			>
				<div className="grid grid-cols-2 gap-4 md:gap-8">
					<img
						src={data.experienceOne?.imageUrl ?? ""}
						alt="Experience 1"
						className="aspect-square rounded-lg object-cover"
					/>
					<img
						src={data.experienceTwo?.imageUrl ?? ""}
						alt="Experience 2"
						className="aspect-square rounded-lg object-cover"
					/>
				</div>

				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col gap-8"
				>
					<div className="flex flex-col gap-2">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{data.heading}
						</h2>
						<p className="font-subheading text-base text-olive">
							{data.caption}
						</p>
					</div>

					<p className="text-base text-muted-foreground">{data.description}</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
