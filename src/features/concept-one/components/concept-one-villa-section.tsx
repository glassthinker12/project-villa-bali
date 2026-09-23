import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { CONCEPT_ONE_VILLAS } from "../data/concept-one-data";
import { staggerContainer, staggerItem } from "../lib/animation-variants";
import { ConceptOneVillaCard } from "./concept-one-villa-card";

export const ConceptOneVillaSection = () => {
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
					className="flex w-full flex-col gap-6 md:flex-row"
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
							className="flex-1"
						>
							<ConceptOneVillaCard villa={villa} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};
