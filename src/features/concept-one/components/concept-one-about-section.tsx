import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { useTraverseProgress } from "../hooks/use-traverse-progress";

const TRAVEL = 320;

export const ConceptOneAboutSection = () => {
	const { ref, progress } = useTraverseProgress<HTMLElement>();
	const shift = (progress - 0.5) * TRAVEL;

	return (
		<section ref={ref} className="relative overflow-hidden bg-[#fffaf5]">
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-[#fffaf5] to-[#e1ecf9]" />
				<img
					alt=""
					className="absolute inset-0 h-full w-full max-w-none object-cover opacity-40"
					src="/images/about/about-bg.webp"
				/>
			</div>

			<div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 p-8 md:p-16">
				{/* text */}
				<motion.div
					className="flex w-full flex-col items-center justify-center gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center gap-2 text-center [word-break:break-word]">
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
						<Button variant="brand" size="lg">
							Read Our Story
							<ArrowRightIcon className="block h-6 w-6" />
						</Button>
					</div>
				</motion.div>

				{/* parallax image */}
				<div className="relative w-full overflow-hidden bg-[#bae1f6] p-4">
					<div className="relative h-109.25 w-full overflow-hidden">
						<img
							alt="Aerial view of Seaview Private Villas"
							className="absolute top-0 left-0 w-full max-w-none object-cover will-change-transform"
							style={{
								height: `calc(100% + ${TRAVEL}px)`,
								transform: `translateY(${shift}px)`,
								translate: "0 -50%",
								top: "50%",
							}}
							src="/images/about/about-image.webp"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
