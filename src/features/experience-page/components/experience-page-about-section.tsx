import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { staggerContainer } from "@/lib/animation-variants";
import type { ExperiencePageAboutSection as ExperiencePageAboutSectionType } from "../types";

type ExperiencePageAboutSectionProps = {
	data: ExperiencePageAboutSectionType;
};

export function ExperiencePageAboutSection({
	data,
}: ExperiencePageAboutSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative w-full bg-cream px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex h-91.25 max-w-6xl flex-col gap-8 md:flex-row"
			>
				<img
					src={data.imageUrl}
					alt="Discover Experience"
					className="absolute inset-0 size-full rounded-lg object-cover"
				/>
				<div className="absolute inset-0 rounded-lg bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />

				<div className="relative flex flex-col items-center justify-center gap-6 text-center md:order-2 md:flex-1">
					<div className="mt-48 flex flex-col items-center gap-2 md:mt-32">
						<p className="font-subheading text-base text-white uppercase tracking-wider">
							{data.eyebrow}
						</p>
						<h2 className="font-bold font-heading text-3xl text-white md:text-4xl">
							{data.heading}
						</h2>
					</div>
					<div className="flex items-center gap-4 text-white">
						<span className="text-xs uppercase tracking-widest">
							Discover Now
						</span>
						<div>
							<svg
								aria-hidden="true"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 5v14M19 12l-7 7-7-7" />
							</svg>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
