import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	scaleIn,
	staggerContainer,
	staggerItem,
} from "@/lib/animation-variants";
import type { CavePageGuestStorySection as CavePageGuestStorySectionType } from "../types";

type CavePageGuestStorySectionProps = {
	data: CavePageGuestStorySectionType;
};

export function CavePageGuestStorySection({
	data,
}: CavePageGuestStorySectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				<div className="flex w-full flex-col items-center gap-2">
					<motion.p
						variants={fadeUp}
						transition={defaultTransition}
						className="font-subheading text-base text-brand uppercase tracking-wider"
					>
						{data.eyebrow}
					</motion.p>
					<motion.h2
						variants={fadeUp}
						transition={defaultTransition}
						className="font-bold font-heading text-3xl text-foreground md:text-4xl"
					>
						{data.heading}
					</motion.h2>
					<div className="mt-8 grid w-full grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8">
						<div className="block md:hidden">
							<motion.div
								variants={scaleIn}
								transition={defaultTransition}
								className="square relative h-96 w-full overflow-hidden rounded-lg"
							>
								<img
									src={data.imageUrl}
									alt="Main guest story"
									loading="lazy"
									decoding="async"
									className="absolute inset-0 size-full object-cover"
								/>
							</motion.div>
						</div>
						<motion.div
							variants={staggerContainer}
							className="flex flex-col gap-8"
						>
							<CavePageGuestStorySectionGuestStory {...data.firstGuestStory} />
							<CavePageGuestStorySectionGuestStory {...data.secondGuestStory} />
						</motion.div>
						<div className="hidden md:block">
							<motion.div
								variants={scaleIn}
								transition={defaultTransition}
								className="square relative h-full w-full overflow-hidden rounded-lg"
							>
								<img
									src={data.imageUrl}
									alt="Main guest story"
									loading="lazy"
									decoding="async"
									className="absolute inset-0 size-full object-cover"
								/>
							</motion.div>
						</div>
						<motion.div
							variants={staggerContainer}
							className="flex flex-col gap-8"
						>
							<CavePageGuestStorySectionGuestStory {...data.thirdGuestStory} />
							<CavePageGuestStorySectionGuestStory {...data.fourthGuestStory} />
						</motion.div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

function CavePageGuestStorySectionGuestStory(data: {
	name: string;
	caption: string;
	description: string;
	imageUrl: string;
}) {
	return (
		<motion.div
			variants={staggerItem}
			transition={defaultTransition}
			className="flex flex-col gap-4"
		>
			<p className="text-mist text-sm leading-5.5">{data.description}</p>
			<div className="flex items-center gap-2">
				<div className="relative h-11 w-11 overflow-hidden rounded-md">
					<img
						src={data.imageUrl}
						alt={data.name}
						loading="lazy"
						decoding="async"
						className="absolute inset-0 size-full object-cover"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-bold">{data.name}</p>
					<p className="text-muted-foreground text-xs">{data.caption}</p>
				</div>
			</div>
		</motion.div>
	);
}
