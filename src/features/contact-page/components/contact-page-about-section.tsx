import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";
import { toGoogleMapsEmbed } from "@/lib/utils";
import type { ContactPageAboutSection as ContactPageAboutSectionType } from "../types";

type ContactPageAboutSectionProps = {
	data: ContactPageAboutSectionType;
};

export function ContactPageAboutSection({
	data,
}: ContactPageAboutSectionProps) {
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
						<p className="text-base text-mist leading-5.5">{data.body}</p>
						<Separator className="my-6" />
						<div className="grid w-full grid-cols-4 items-start">
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-2xl text-olive">
									2 Hours
								</p>
								<p className="text-center text-muted-foreground text-xs">
									From Ngurah Rai Airport
								</p>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-2xl text-olive">
									10 Min
								</p>
								<p className="text-center text-muted-foreground text-xs">
									from Canggu
								</p>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-2xl text-olive">
									40 Min
								</p>
								<p className="text-center text-muted-foreground text-xs">
									from Kuta
								</p>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<p className="text-center font-bold font-heading text-2xl text-olive">
									40 Min
								</p>
								<p className="text-center text-muted-foreground text-xs">
									from Kuta
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
		</section>
	);
}
