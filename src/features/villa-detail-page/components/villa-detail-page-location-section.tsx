import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	scaleIn,
	staggerContainer,
} from "@/lib/animation-variants";
import { toGoogleMapsEmbed } from "@/lib/utils";

import type { VillaDetailPageLocationSection as VillaDetailPageLocationSectionType } from "../types";

type VillaDetailPageLocationSectionProps = {
	data: VillaDetailPageLocationSectionType;
};

export function VillaDetailPageLocationSection({
	data,
}: VillaDetailPageLocationSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12"
			>
				<motion.div
					variants={staggerContainer}
					className="flex w-full flex-col gap-8"
				>
					<motion.div
						variants={fadeUp}
						transition={defaultTransition}
						className="flex flex-col items-start justify-between gap-8 md:flex-row"
					>
						<div className="w-full md:w-1/2">
							<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
								{data.title}
							</h2>
						</div>
						<div className="w-full md:w-1/2">
							<p className="text-mist text-sm leading-5.5">{data.body}</p>
						</div>
					</motion.div>
					<motion.div
						variants={scaleIn}
						transition={defaultTransition}
						className="w-full overflow-hidden rounded-md"
						style={{ height: "400px" }}
					>
						<iframe
							title="Google Map"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src={toGoogleMapsEmbed(data.locationUrl)}
						/>
					</motion.div>
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<a
						href={data.locationUrl}
						className={buttonVariants({ variant: "ghost-brand" })}
						target="_blank"
					>
						View in Google Maps
						<ArrowRightIcon className="size-6 transition-transform duration-300 group-hover/button:translate-x-1" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
}
