import { motion } from "motion/react";
import {
	formatSocialLabel,
	normalizeSocialUrl,
} from "@/features/general-settings/utils/social-links";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
	staggerGrid,
	staggerItem,
} from "@/lib/animation-variants";
import type { ContactPageContactSection as ContactPageContactSectionType } from "../types";

type ContactPageContactSectionProps = {
	data: ContactPageContactSectionType;
};

export function ContactPageContactSection({
	data,
}: ContactPageContactSectionProps) {
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
				{/* Header */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col items-center justify-center gap-2 text-center"
				>
					<p className="font-subheading text-base text-brand tracking-wider">
						{data.eyebrow}
					</p>
				</motion.div>

				<motion.div
					variants={staggerGrid}
					className="grid w-full grid-cols-1 gap-4 md:grid-cols-3"
				>
					<motion.a
						variants={staggerItem}
						transition={defaultTransition}
						href={normalizeSocialUrl(data.email)}
						className="flex flex-col items-center gap-2 py-4"
					>
						<img
							alt="envelope"
							src="/svg/contact-envelope.svg"
							className="shrink-0"
						/>
						<p className="font-bold text-brand">EMAIL</p>
						<p>{formatSocialLabel(data.email)}</p>
					</motion.a>
					<motion.a
						variants={staggerItem}
						transition={defaultTransition}
						href={normalizeSocialUrl(data.instagram)}
						target="_blank"
						rel="noreferrer"
						className="flex flex-col items-center gap-2 py-4"
					>
						<img
							alt="instagram"
							src="/svg/contact-instagram.svg"
							className="shrink-0"
						/>
						<p className="font-bold text-brand">INSTAGRAM</p>
						<p>{formatSocialLabel(data.instagram)}</p>
					</motion.a>
					<motion.a
						variants={staggerItem}
						transition={defaultTransition}
						href={normalizeSocialUrl(data.facebook)}
						target="_blank"
						rel="noreferrer"
						className="flex flex-col items-center gap-2 py-4"
					>
						<img
							alt="facebook"
							src="/svg/contact-facebook.svg"
							className="shrink-0"
						/>
						<p className="font-bold text-brand">FACEBOOK</p>
						<p>{formatSocialLabel(data.facebook)}</p>
					</motion.a>
				</motion.div>
			</motion.div>
		</section>
	);
}
