import { motion } from "motion/react";
import { ScrollArea } from "#/components/ui/scroll-area";

const CAVE_IMAGES = [
	"/images/cave/cave-1.webp",
	"/images/cave/cave-1.webp",
	"/images/cave/cave-3.webp",
];

export const ConceptTwoCaveSection = () => {
	return (
		<section id="cave" className="relative w-full overflow-hidden py-16">
			<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4">
				<motion.div
					className="flex w-full flex-col items-center justify-center gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							OUR EXCLUSIVE EXPERIENCE
						</p>
						<h2 className="w-full px-8 font-bold font-heading text-4xl leading-11 md:px-0">
							The Private Beach Cave Access
						</h2>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ delay: 0.3, duration: 0.6 }}
				>
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="mx-auto flex w-max snap-x snap-mandatory gap-4">
							{CAVE_IMAGES.map((cave, index) => {
								return (
									<motion.div
										key={`cave-${index + 1}`}
										className="w-80 shrink-0 snap-center"
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ delay: 0.4 + index * 0.15, duration: 0.7 }}
									>
										<div className="h-50 w-full overflow-hidden rounded-[8px]">
											<img
												src={cave}
												alt={`cave-${index + 1}`}
												className="h-full w-full object-cover"
											/>
										</div>
									</motion.div>
								);
							})}
						</div>
					</ScrollArea>
				</motion.div>
			</div>
		</section>
	);
};
