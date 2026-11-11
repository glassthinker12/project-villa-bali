import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";
import type { ExperiencePageContactSection as ExperiencePageContactSectionType } from "../types";

type ExperiencePageContactSectionProps = {
	data: ExperiencePageContactSectionType;
};

export function ExperiencePageContactSection({
	data,
}: ExperiencePageContactSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<img
					src={data.imageUrl}
					alt="About Background"
					loading="lazy"
					decoding="async"
					className="absolute inset-0 size-full object-cover"
				/>
				<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_30%)]" />
				<div className="mask-[linear-gradient(to_bottom,transparent,black)] absolute bottom-0 h-96 w-full bg-linear-to-b from-[rgba(36,33,33,0)] to-[rgba(36,33,33,0.3)] backdrop-blur-3xl" />
			</div>

			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
				>
					<div className="flex w-full flex-col items-center gap-8">
						<h2 className="font-bold font-heading text-2xl text-white md:text-3xl">
							{data.heading}
						</h2>

						<div>
							<motion.div
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								<Button variant="paper" size="lg" className="rounded-[8px]">
									{data.cta.label}
									<ArrowRightIcon className="size-6" />
								</Button>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
