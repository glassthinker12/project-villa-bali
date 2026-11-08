import { StarIcon } from "lucide-react";
import { motion } from "motion/react";

import type { HomepageHeroSection as HomepageHeroSectionType } from "../types";

type HomepageHeroSectionProps = {
	data: HomepageHeroSectionType;
};

export function HomepageHeroSection({ data }: HomepageHeroSectionProps) {
	return (
		<section className="relative -mt-20 h-dvh w-full overflow-hidden">
			<video
				src={data.videoUrl}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				className="absolute inset-0 size-full object-cover"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />

			<div className="absolute inset-x-0 top-20 flex h-[calc(100%-8rem)] flex-col justify-between">
				<div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 px-4">
					<motion.div
						className="mt-auto flex flex-col items-center justify-center gap-4 text-white"
						initial={{ opacity: 0, y: 60 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						{/* Eyebrow */}
						<motion.p
							className="mb-4 text-center text-base uppercase"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							{data.eyebrow}
						</motion.p>

						{/* Title */}
						<motion.h1
							className="text-center font-bold font-heading text-6xl leading-12 md:text-8xl md:leading-16"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
						>
							<span className="leading-16">{data.title}</span>
							<br />
							<span className="text-5xl md:text-6xl">{data.subtitle}</span>
						</motion.h1>

						{/* Google review */}
						<motion.div
							role="img"
							aria-label="5.0 out of 5 stars from Google Reviews"
							className="flex flex-wrap items-center gap-1"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
						>
							<p className="font-bold font-subheading text-base text-white">
								5.0
							</p>
							<div className="flex items-center gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<StarIcon
										key={`review-star-${i}`}
										fill="#EECF1E"
										strokeWidth={0}
										className="size-4"
									/>
								))}
							</div>
							<p className="text-white text-xs underline">
								from Google Reviews
							</p>
						</motion.div>

						{/* Scroll to explore */}
						<motion.div
							className="mt-8 flex flex-col items-center gap-2 text-white/80"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.6 }}
						>
							<span className="text-xs uppercase tracking-widest">
								Scroll Down to Explore
							</span>
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{
									repeat: Infinity,
									duration: 2,
									ease: "easeInOut",
								}}
							>
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
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
