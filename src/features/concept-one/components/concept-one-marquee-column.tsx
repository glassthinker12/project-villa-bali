import { motion } from "motion/react";

interface MarqueeColumnProps {
	images: string[];
	direction: "up" | "down";
	duration?: number;
	className?: string;
}

export const ConceptOneMarqueeColumn = ({
	images,
	direction,
	duration = 20,
	className = "",
}: MarqueeColumnProps) => {
	const doubled = [...images, ...images];
	const y = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

	return (
		<div className={`h-full overflow-hidden ${className}`}>
			<motion.div
				className="flex flex-col gap-4"
				animate={{ y }}
				transition={{ repeat: Infinity, ease: "linear", duration }}
			>
				{doubled.map((src, i) => (
					<div
						key={i}
						className="h-full w-full shrink-0 overflow-hidden rounded-lg"
					>
						<img
							alt=""
							className="h-full w-full max-w-none object-cover"
							src={src}
						/>
					</div>
				))}
			</motion.div>
		</div>
	);
};
