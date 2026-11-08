import { motion } from "motion/react";

import type { VillaDetailPageHeroSection as VillaDetailPageHeroSectionType } from "../types";

type VillaDetailPageHeroSectionProps = {
	data: VillaDetailPageHeroSectionType;
};

export function VillaDetailPageHeroSection({
	data,
}: VillaDetailPageHeroSectionProps) {
	return (
		<section className="relative -mt-20 h-dvh w-full overflow-hidden">
			<img
				src={data.imageUrl}
				alt={data.title}
				className="absolute inset-0 size-full object-cover"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />
			<div className="mask-[linear-gradient(to_bottom,transparent,black)] absolute bottom-0 h-96 w-full bg-linear-to-b from-[rgba(36,33,33,0.3)] to-[rgba(36,33,33,0.7)] backdrop-blur-3xl" />

			<div className="absolute inset-x-0 top-20 flex h-[calc(100%-8rem)] flex-col justify-between pb-16">
				<div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 px-4">
					<motion.div
						className="mt-auto flex flex-col items-center justify-between gap-4 text-white md:flex-row md:items-end"
						initial={{ opacity: 0, y: 60 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						{/* Title */}
						<motion.h1
							className="text-center font-bold font-heading text-6xl leading-12 md:text-8xl md:leading-16"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
						>
							<span className="leading-16">{data.title}</span>
						</motion.h1>

						<div className="flex flex-col items-center gap-4 md:items-start md:gap-1">
							<p className="text-center font-bold text-xl">{data.summary}</p>
							<div className="flex items-center gap-2 text-base">
								<span>{data.guests} Guests</span>
								<span>{data.bedrooms} Bedroom</span>
								<span>{data.bathrooms} Bathroom</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
