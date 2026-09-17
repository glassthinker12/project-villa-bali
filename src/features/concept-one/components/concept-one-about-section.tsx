import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

import { Eyebrow } from "./concept-one-eyebrow";
import { FramedImage } from "./concept-one-framed-image";

export const ConceptOneAboutSection = () => {
	return (
		<section id="about" className="relative w-full overflow-hidden pb-16">
			{/* background */}
			<div className="absolute inset-x-0 top-0 h-151.5 overflow-hidden bg-sky">
				<div className="absolute top-[calc(50%+0.5px)] left-1/2 h-26.75 w-full max-w-80.25 -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-20" />
			</div>

			<div className="relative flex w-full flex-col items-center gap-6">
				{/* text */}
				<div className="flex w-full flex-col items-center justify-center gap-8 px-4 pt-16 pb-4">
					<div className="flex w-full flex-col items-center gap-2 text-center">
						<Eyebrow
							text="SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN"
							className="text-brand"
						/>
						<h2 className="w-full font-bold font-heading text-4xl text-ink leading-11">
							More than just a villa for vacation
						</h2>
						<p className="w-full text-mist text-sm leading-5.5">
							As the only villa with access to a private beach cave on the
							island, Seaview Private Villas offers a unique experience for
							families, couples or groups, seeking a memorable and affordable
							stay.
						</p>
					</div>
					<Button variant="brand" size="xl">
						Read Our Story
						<ArrowRightIcon className="size-6" />
					</Button>
				</div>

				{/* image */}
				<div className="w-full px-4">
					<FramedImage
						alt="Seaview Private Villas"
						src="/images/about/about-image.png"
						className="max-w-102"
					/>
				</div>
			</div>
		</section>
	);
};
