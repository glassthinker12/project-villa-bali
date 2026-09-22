import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";

export type ConceptOneVilla = {
	name: string;
	price: string;
	image: string;
	frameWidth: string;
};

type ConceptOneVillaCardProps = {
	villa: ConceptOneVilla;
};

export const ConceptOneVillaCard = ({ villa }: ConceptOneVillaCardProps) => {
	return (
		<motion.article
			className="flex w-full flex-col gap-4"
			whileHover={{ y: -4, transition: { duration: 0.2 } }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="relative h-61.75 overflow-hidden">
				<img
					alt={villa.name}
					src={villa.image}
					loading="lazy"
					decoding="async"
					className="absolute top-0 left-0 h-52.25 w-full object-cover"
				/>
				<div className="absolute inset-x-0 top-42.75 flex w-full items-end justify-between">
					<h3 className="whitespace-nowrap text-center font-bold font-heading text-2xl text-olive leading-8">
						{villa.name}
					</h3>
					<div
						className="relative h-19 shrink-0 border border-olive"
						style={{ width: villa.frameWidth }}
						aria-hidden="true"
					>
						<div className="absolute top-1/2 left-1.75 flex -translate-y-1/2 flex-col items-start justify-center overflow-hidden whitespace-nowrap bg-cream p-2 text-center shadow-[8px_8px_20px_10px_rgba(45,45,45,0.15)]">
							<p className="font-medium text-[10px] text-muted-foreground leading-4">
								Starting from
							</p>
							<p className="font-bold font-subheading text-xl leading-7">
								{villa.price}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
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
			<Button variant="outline-ink">
				See Villa Details
				<ArrowRightIcon className="size-5" />
			</Button>
		</motion.article>
	);
};
