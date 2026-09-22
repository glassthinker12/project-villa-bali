import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { CONCEPT_ONE_VILLAS } from "#/features/concept-one/data/concept-one-data";
import { staggerContainer, staggerItem } from "../lib/animation-variants";

export const ConceptTwoVillaSection = () => {
	return (
		<section id="villa" className="relative w-full overflow-hidden py-16">
			<div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="w-full"
				>
					<div className="flex w-full items-start justify-between">
						<div variants={staggerItem}>
							<p className="font-subheading text-base text-brand leading-6.5">
								VILLAS OVERVIEW
							</p>
						</div>
						<div variants={staggerItem}>
							<Button
								variant="link"
								size="xs"
								className="text-brand hover:bg-transparent hover:text-brand/90"
							>
								See All Villas
								<ArrowRightIcon />
							</Button>
						</div>
					</div>

					<motion.h2
						variants={staggerItem}
						className="font-bold font-heading text-4xl leading-11"
					>
						Our Luxury Villas
					</motion.h2>
				</motion.div>

				<motion.div
					className="flex w-full flex-col gap-6"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					transition={{ delayChildren: 0.2, staggerChildren: 0.15 }}
				>
					{CONCEPT_ONE_VILLAS.map((villa) => (
						<motion.div
							key={villa.name}
							variants={staggerItem}
							className="flex h-full flex-col items-stretch gap-4 overflow-hidden rounded-[8px] border border-olive p-4 md:h-96 md:flex-row-reverse"
						>
							<div className="h-full w-full shrink-0 overflow-hidden rounded-[8px] md:w-1/2">
								<img
									src={villa.image}
									alt=""
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex h-full w-full flex-col gap-4">
								<div className="flex flex-col gap-4">
									<h3 className="whitespace-nowrap font-bold font-heading text-3xl text-olive leading-8 md:text-4xl">
										{villa.name}
									</h3>
									<div className="flex w-full items-center justify-center gap-2 md:hidden">
										<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/user.svg"
												className="size-6 shrink-0"
											/>
											<p className="truncate text-center text-xs leading-5.5 sm:text-sm">
												2 Guest
											</p>
										</div>
										<img
											alt=""
											aria-hidden="true"
											src="/icons/logo-blue-small.png"
											className="shrink-0"
										/>
										<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bed.svg"
												className="size-6 shrink-0"
											/>
											<p className="truncate text-center text-xs leading-5.5 sm:text-sm">
												1 Bedroom
											</p>
										</div>
										<img
											alt=""
											aria-hidden="true"
											src="/icons/logo-blue-small.png"
											className="shrink-0"
										/>
										<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bathtub.svg"
												className="size-6 shrink-0"
											/>
											<p className="truncate text-center text-xs leading-5.5 sm:text-sm">
												1 Bathroom
											</p>
										</div>
									</div>
									<div className="hidden items-center gap-2 md:flex">
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/user.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">2 Guest</p>
										</div>
										<div
											className="size-2 shrink-0 rounded-full bg-brand"
											aria-hidden="true"
										/>
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bed.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">1 Bedroom</p>
										</div>
										<div
											className="size-2 shrink-0 rounded-full bg-brand"
											aria-hidden="true"
										/>
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bathtub.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">1 Bathroom</p>
										</div>
									</div>
								</div>

								<div className="mt-auto flex items-end justify-between md:flex-col md:items-start">
									<div>
										<p className="font-medium text-secondary-foreground text-xs leading-4">
											Starting from
										</p>
										<p className="font-bold font-subheading text-brand text-xl leading-7">
											{villa.price}
										</p>
										<p className="text-muted-foreground text-xs leading-4">
											Additional charges may apply
										</p>
									</div>
									<div className="mt-4">
										<Button
											variant="link"
											className="p-0 text-brand hover:bg-transparent hover:text-brand/90"
										>
											See Villa Detail
											<ArrowRightIcon />
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};
