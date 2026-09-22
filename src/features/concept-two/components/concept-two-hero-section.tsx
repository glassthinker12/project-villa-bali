import { motion } from "motion/react";

export const ConceptTwoHeroSection = () => {
	return (
		<section className="relative -mt-20 h-[calc(100vh-8rem)] w-full overflow-hidden">
			<img
				src="/images/hero/hero-bg.webp"
				alt="Seaview Private Villas Hero"
				loading="eager"
				decoding="async"
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
						<motion.p
							className="text-center text-base uppercase leading-6.5"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							Welcome to
						</motion.p>

						<motion.h1
							className="text-center font-bold font-heading text-6xl leading-14 md:text-8xl md:leading-16"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
						>
							<span>SEAVIEW</span>
							<br />
							<span className="text-5xl md:text-6xl">Private Villas</span>
						</motion.h1>

						<motion.div
							role="img"
							aria-label="5.0 out of 5 stars from Google Reviews"
							className="flex flex-wrap items-center gap-1"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
						>
							<p className="font-bold font-subheading text-base text-white leading-6.5">
								5.0
							</p>
							<div className="flex items-center gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<img
										key={`star-${i}`}
										alt=""
										src="/icons/star.svg"
										className="size-4"
									/>
								))}
							</div>
							<p className="text-white text-xs leading-5 underline">
								from Google Reviews
							</p>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
