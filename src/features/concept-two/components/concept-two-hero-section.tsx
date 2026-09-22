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
				<div className="h-full w-full flex flex-col gap-4 max-w-6xl mx-auto px-4">
					<div className="flex flex-col items-center justify-center gap-4 mt-auto text-white">
						{/* greetings */}
						<p className="text-base text-center leading-6.5 uppercase">
							Welcome to
						</p>

						{/* title */}
						<h1 className="font-heading font-bold text-6xl md:text-8xl leading-14 md:leading-16 text-center">
							<span>SEAVIEW</span>
							<br />
							<span className="text-5xl md:text-6xl">Private Villas</span>
						</h1>

						{/* review */}
						<div
							role="img"
							aria-label="5.0 out of 5 stars from Google Reviews"
							className="flex flex-wrap items-center gap-1"
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
