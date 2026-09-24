import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";

export const ConceptOneCaveSection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden py-16">
			<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4">
				<motion.div
					className="flex w-full flex-col items-start justify-start gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							OUR UNIQUE EXPERIENCES
						</p>
						<h2 className="w-full px-8 font-bold font-heading text-4xl leading-11 md:px-0">
							The Private Beach Cave Access
						</h2>
					</div>

					<motion.div
						className="h-full w-full"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						<div className="grid h-full gap-4 md:grid-cols-[2.3fr_1fr]">
							<motion.div
								className="h-120 overflow-hidden"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ delay: 0.4, duration: 0.7 }}
							>
								<img
									src="/images/cave/cave-1.webp"
									alt=""
									className="h-full w-full object-cover"
								/>
							</motion.div>

							<motion.div
								className="grid h-120 gap-4 md:grid-rows-2"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ delay: 0.5, duration: 0.6 }}
							>
								<motion.div
									className="h-full overflow-hidden md:h-auto"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ delay: 0.7, duration: 0.6 }}
								>
									<img
										src="/images/cave/cave-2.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</motion.div>

								<motion.div
									className="h-full overflow-hidden md:h-auto"
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ delay: 0.8, duration: 0.6 }}
								>
									<img
										src="/images/cave/cave-3.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</motion.div>
							</motion.div>
						</div>
					</motion.div>

					{/* cta */}
					<motion.div
						className="flex w-full items-center justify-center"
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.6, duration: 0.5 }}
					>
						<Button variant="outline-brand">
							See All Gallery
							<ArrowRightIcon className="size-6" />
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
