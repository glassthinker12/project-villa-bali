import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";

const ABOUT_IMAGES = [
	"/images/about/about-image-1.webp",
	"/images/about/about-image-2.webp",
	"/images/about/about-image-3.webp",
];

export const ConceptTwoAboutSection = () => {
	return (
		<section id="about" className="relative w-full overflow-hidden py-16">
			{/* background */}
			<div className="absolute inset-0 h-full w-full">
				<img
					src="/images/about/about-bg.jpg"
					alt=""
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#BAE1F6_0%,#FFFAF5_95.89%)] opacity-50" />
			</div>

			<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4">
				{/* text */}
				<motion.div
					className="flex w-full flex-col items-center justify-center gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
						</p>
						<h2 className="w-full px-8 font-bold font-heading text-4xl leading-11 md:px-0">
							More than just a villa for vacation
						</h2>
						<div className="mt-2">
							<p className="w-full text-muted-foreground text-sm leading-5.5 md:w-180">
								As the only villa with access to a private beach cave on the
								island, Seaview Private Villas offers a unique experience for
								families, couples or groups, seeking a memorable and affordable
								stay.
							</p>
						</div>
					</div>

					<div>
						<Button variant="brand" size="xl" className="rounded-[8px]">
							Read Our Story
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</motion.div>

				{/* image */}
				<motion.div
					className="relative h-48 w-full md:h-110"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					<div>
						{ABOUT_IMAGES.map((item, index) => {
							return (
								<motion.div
									key={`about-${index + 1}`}
									className={cn(
										"absolute inset-x-1/2 inset-y-0 h-37.5 w-29 overflow-hidden rounded-[8px] shadow-sm md:h-96.5 md:w-75",
										index === 0
											? "-translate-x-35 translate-y-5 -rotate-6 md:-translate-x-90 md:translate-y-10"
											: index === 2
												? "translate-x-5 translate-y-5 rotate-6 md:translate-x-15 md:translate-y-10"
												: "-translate-x-1/2",
										index === 1 ? "z-10" : "",
									)}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
								>
									<img
										src={item}
										alt={`about-${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
};
