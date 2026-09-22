import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTraverseProgress } from "../hooks/use-traverse-progress";

const TRAVEL = 320;

export const ConceptOneAboutSection = () => {
	const { ref, progress } = useTraverseProgress<HTMLElement>();
	const shift = (progress - 0.5) * TRAVEL;

	return (
		<section ref={ref} className="relative overflow-hidden bg-[#fffaf5]">
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-t from-[#fffaf5] to-[#e1ecf9]" />
				<img
					alt=""
					className="absolute inset-0 h-full w-full max-w-none object-cover opacity-40"
					src="/images/about/about-bg.webp"
				/>
			</div>

			<div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center gap-8 p-8 md:p-16">
				{/* text */}
				<motion.div
					className="flex w-full flex-col items-center justify-center gap-8"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<div className="flex w-full flex-col items-center gap-2 text-center [word-break:break-word]">
						<p
							style={{
								fontFamily: "Poppins",
								fontSize: 16,
								lineHeight: "26px",
								color: "#2365b0",
							}}
						>
							SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
						</p>
						<p
							className="min-w-full"
							style={{
								fontFamily: "Playfair Display",
								fontWeight: 700,
								fontSize: 36,
								lineHeight: "44px",
								color: "#242121",
							}}
						>
							More than just a villa for vacation
						</p>
						<p
							className="max-w-[720px]"
							style={{
								fontFamily: "Lato",
								fontSize: 14,
								lineHeight: "22px",
								color: "#7e7c7c",
							}}
						>
							As the only villa with access to a private beach cave on the
							island, Seaview Private Villas offers a unique experience for
							families, couples or groups, seeking a memorable and affordable
							stay.
						</p>
					</div>

					<button
						className="flex items-center justify-center gap-2 bg-[#2365b0] px-6 py-3 transition-colors hover:bg-[#1c5290]"
						type="button"
					>
						<span
							style={{
								fontFamily: "Lato",
								fontSize: 16,
								lineHeight: "26px",
								color: "#fafafa",
							}}
						>
							Read Our Story
						</span>
						<ArrowRightIcon className="block h-6 w-6" />
					</button>
				</motion.div>

				{/* parallax image */}
				<div className="relative w-full overflow-hidden bg-[#bae1f6] p-4">
					<div className="relative h-[437px] w-full overflow-hidden">
						<img
							alt="Aerial view of Seaview Private Villas"
							className="absolute top-0 left-0 w-full max-w-none object-cover will-change-transform"
							style={{
								height: `calc(100% + ${TRAVEL}px)`,
								transform: `translateY(${shift}px)`,
								translate: "0 -50%",
								top: "50%",
							}}
							src="/images/about/about-image-2.webp"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
