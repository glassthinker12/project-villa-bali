import { motion } from "motion/react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { defaultTransition, fadeUp } from "@/lib/animation-variants";
import type { ExperiencePageFirstExperienceSection as ExperiencePageFirstExperienceSectionType } from "../types";

type ExperiencePageFirstExperienceSectionProps = {
	data: ExperiencePageFirstExperienceSectionType;
};

export function ExperiencePageFirstExperienceSection({
	data,
}: ExperiencePageFirstExperienceSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative flex w-full flex-col items-center bg-cream px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={fadeUp}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				transition={defaultTransition}
				className="flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12"
			>
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col items-center justify-center gap-2 text-center"
				>
					<h2 className="text-center font-bold font-heading text-3xl text-foreground md:text-4xl">
						{data.heading}
					</h2>
				</motion.div>

				<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
					{[data.experienceOne, data.experienceTwo, data.experienceThree].map(
						(item) => (
							<motion.div
								key={`first-experience-${item.id}`}
								variants={fadeUp}
								transition={defaultTransition}
								className="flex flex-col gap-4"
							>
								<img
									src={item.imageUrl}
									alt={item.title}
									className="aspect-square rounded-lg object-cover"
								/>
								<div className="flex flex-col gap-1">
									<p className="font-bold font-subheading text-[20px]">
										{item.title}
									</p>
									<p className="text-muted-foreground text-sm">
										{item.category} • {item.caption}
									</p>
								</div>
								<div>
									<p className="text-base text-muted-foreground">
										{item.description}
									</p>
								</div>
							</motion.div>
						),
					)}
				</div>
			</motion.div>
		</section>
	);
}
