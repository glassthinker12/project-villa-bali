import { motion } from "motion/react";
import type { VillaDetailPageContent } from "../types";

type VillaDetailPageHeroSectionProps = VillaDetailPageContent;

export const VillaDetailPageHeroSection = (
	villa: VillaDetailPageHeroSectionProps,
) => {
	return (
		<section className="relative -mt-20 h-dvh w-full overflow-hidden">
			<img
				src={villa.imageUrl}
				alt={villa.name}
				loading="lazy"
				decoding="async"
				className="absolute inset-0 size-full object-cover"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />

			<div className="absolute inset-x-0 top-20 flex h-[calc(100%-8rem)] flex-col justify-between pb-16">
				<div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 px-4">
					<motion.div
						className="mt-auto flex flex-col items-center justify-center gap-4 text-white"
						initial={{ opacity: 0, y: 60 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<h1 className="text-center font-bold font-heading text-6xl leading-14 md:text-8xl md:leading-16">
							<span>{villa.name}</span>
							<br />
						</h1>

						<div className="mt-4 flex items-center gap-2 text-sm leading-5.5 md:text-base">
							<span>{villa.guest} Guests</span>
							<span>{villa.bedroom} Bedroom</span>
							<span>{villa.bathroom} Bathroom</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
