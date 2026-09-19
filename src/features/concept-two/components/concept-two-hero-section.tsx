import { Button } from "#/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const ConceptTwoHeroSection = () => {
	return (
		<section className="relative -mt-20 h-188 w-full overflow-hidden">
			<img
				src="/images/hero/hero-bg-2.png"
				alt="Seaview Private Villas Hero"
				loading="eager"
				decoding="async"
				className="absolute inset-0 size-full object-cover"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />

			<div className="absolute inset-x-0 top-20 flex h-167 flex-col justify-between px-4 py-8">
				<div className="text-white h-full">
					<div className="relative flex h-full w-full flex-col justify-between px-4 pt-8 pb-8">
						<div className="flex w-full flex-col gap-4 mt-auto">
							<div className="flex flex-col justify-center gap-4">
								{/* greetings */}
								<p className="text-base text-center leading-6.5 uppercase">
									Welcome to
								</p>

								{/* title */}
								<h1 className="text-center">
									<span className="font-heading text-6xl font-bold leading-16">
										SEAVIEW
									</span>
									<br />
									<span className="font-heading text-5xl font-bold leading-13">
										Private Villas
									</span>
								</h1>

								{/* review */}
								<div
									role="img"
									aria-label="5.0 out of 5 stars from Google Reviews"
									className="flex flex-wrap items-center justify-center gap-1"
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

							{/* cta */}
							<Button variant="paper" size="xl" className="rounded-[8px]">
								See Our Villas
								<ArrowRightIcon className="size-6" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
