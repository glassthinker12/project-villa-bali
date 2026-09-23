import { useEffect, useState } from "react";
import { motion } from "motion/react";

const heroSequence = [
	"/images/hero/hero-thumb-1.webp",
	"/images/hero/hero-thumb-2.webp",
	"/images/hero/hero-thumb-3.webp",
	"/images/hero/hero-thumb-4.webp",
	"/images/hero/hero-thumb-5.webp",
];

interface ConceptOnePreloaderProps {
	onComplete?: () => void;
}

export const ConceptOnePreloader = ({
	onComplete,
}: ConceptOnePreloaderProps) => {
	const [phase, setPhase] = useState<"sequence" | "expand" | "done">(
		"sequence",
	);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		const originalHtmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
		window.scrollTo(0, 0);

		const reduce =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduce) {
			document.body.style.overflow = originalOverflow;
			document.documentElement.style.overflow = originalHtmlOverflow;
			setPhase("done");
			onComplete?.();
			return;
		}

		const timers: number[] = [];
		const stepMs = 700;

		for (let i = 1; i < heroSequence.length; i++) {
			timers.push(window.setTimeout(() => setIndex(i), stepMs * i));
		}

		timers.push(
			window.setTimeout(() => setPhase("expand"), stepMs * heroSequence.length),
		);

		return () => {
			document.body.style.overflow = originalOverflow;
			document.documentElement.style.overflow = originalHtmlOverflow;
			timers.forEach(clearTimeout);
		};
	}, [onComplete]);

	if (phase === "done") return null;

	const expanded = phase === "expand";

	return (
		<motion.div
			className="fixed inset-0 z-50 h-dvh w-full overflow-hidden bg-[#2365b0]"
			animate={{ opacity: expanded ? 1 : 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[93%] -translate-x-1/2 -translate-y-1/2 object-contain bg-[url('/images/about/about-bg.webp')] bg-center bg-cover before:absolute before:inset-0 before:bg-[#2365b0]/65"
				animate={{ opacity: expanded ? 0 : 0.6 }}
				transition={{ duration: 0.8, ease: "easeInOut" }}
			/>

			<motion.img
				aria-hidden
				src="/icons/logo-small.png"
				alt=""
				className="pointer-events-none absolute left-1/2 top-[19%] w-[19%] max-w-55 min-w-37.5 -translate-x-1/2 -translate-y-4 object-contain z-20"
				animate={{ opacity: expanded ? 0 : 1 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			/>

			<motion.div
				className="absolute overflow-hidden z-10"
				initial={false}
				animate={{
					top: "50%",
					left: "50%",
					x: "-50%",
					y: "-50%",
					width: expanded ? "100vw" : "min(41vw, 154px)",
					height: expanded ? "100svh" : "min(82vw, 308px)",
					borderRadius: expanded ? 0 : 4,
				}}
				transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
				onAnimationComplete={() => {
					if (phase === "expand") {
						document.body.style.overflow = "";
						document.documentElement.style.overflow = "";
						setPhase("done");
						onComplete?.();
					}
				}}
			>
				<motion.div
					className="flex h-full"
					style={{ width: `${heroSequence.length * 100}%` }}
					animate={{ x: `${(-100 / heroSequence.length) * index}%` }}
					transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
				>
					{heroSequence.map((src, i) => (
						<div
							key={i}
							className="h-full shrink-0"
							style={{ width: `${100 / heroSequence.length}%` }}
						>
							<img src={src} alt="" className="h-full w-full object-cover" />
						</div>
					))}
				</motion.div>
				<motion.div
					aria-hidden
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(180deg, rgba(36,33,33,0.5) 0%, rgba(36,33,33,0.3) 100%)",
					}}
					animate={{ opacity: expanded ? 1 : 0 }}
					transition={{ duration: 0.8 }}
				/>
			</motion.div>
		</motion.div>
	);
};
