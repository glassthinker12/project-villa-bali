import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

import { Eyebrow } from "./concept-one-eyebrow";
import { FramedImage } from "./concept-one-framed-image";

export const ConceptOneGallerySection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden">
			{/* top */}
			<div className="relative pb-10">
				<div className="absolute inset-x-0 top-0 h-128 w-full overflow-hidden">
					<img
						alt="Gallery"
						src="/images/gallery/gallery-bg.png"
						loading="lazy"
						decoding="async"
						className="size-full object-cover"
					/>
					<div className="absolute inset-x-0 top-0 h-121.75 w-full bg-[linear-gradient(180.02deg,rgba(36,33,33,0.6)_0%,rgba(36,33,33,0.7)_99.986%)]" />
				</div>
				<div className="relative flex w-full flex-col items-center gap-6 pt-16">
					<div className="flex w-full flex-col items-center gap-8">
						<div className="flex w-full max-w-110 flex-col items-center gap-2 px-4 text-center">
							<Eyebrow text="VILLAS GALLERY" />
							<h2 className="w-full font-bold font-heading text-4xl text-paper leading-11">
								A Glimpse of Seaview Private Villas
							</h2>
						</div>
						<div className="relative h-104.75 w-full max-w-110 overflow-hidden">
							<div className="absolute top-14 left-[calc(50%+161px)] h-76.75 w-59.75 -translate-x-1/2 overflow-hidden opacity-50">
								<img
									alt=""
									src="/images/gallery/gallery-right.png"
									loading="lazy"
									decoding="async"
									className="size-full object-cover"
								/>
							</div>
							<div className="absolute top-14 left-[calc(50%-160px)] h-76.75 w-59.75 -translate-x-1/2 overflow-hidden opacity-50">
								<img
									alt=""
									src="/images/gallery/gallery-left.png"
									loading="lazy"
									decoding="async"
									className="size-full object-cover"
								/>
							</div>
							<FramedImage
								alt=""
								src="/images/gallery/gallery-center.png"
								className="absolute top-0 left-1/2 h-104.75 w-[calc(100%-48px)] max-w-81.75 -translate-x-1/2"
								frameClassName="absolute inset-[1.64%_0_0_1.8%] border-[1.5px] border-taupe"
							/>
						</div>
					</div>
					<div className="flex items-center gap-1.25">
						<div className="size-3 bg-brand" />
						<div className="size-2 bg-brand-light" />
						<div className="size-2 bg-brand-light" />
						<div className="size-2 bg-brand-light" />
					</div>
				</div>
			</div>

			{/* bottom */}
			<div id="cave" className="w-full px-4 py-8">
				<div className="flex w-full max-w-110 flex-col gap-8">
					<div className="flex w-full flex-col items-center gap-2 text-center">
						<Eyebrow text="OUR UNIQUE EXPERIENCES" className="text-brand" />
						<h2 className="w-full font-bold font-heading text-4xl text-ink leading-11">
							The Private Beach Cave Access
						</h2>
					</div>

					<div className="flex w-full flex-col gap-4">
						<img
							alt="Cave 1"
							src="/images/cave/cave-1.png"
							loading="lazy"
							decoding="async"
							className="aspect-343/217 w-full shrink-0 object-cover"
						/>
						<img
							alt="Cave 2"
							src="/images/cave/cave-2.png"
							loading="lazy"
							decoding="async"
							className="aspect-343/217 w-full shrink-0 object-cover"
						/>
						<img
							alt="Cave 3"
							src="/images/cave/cave-3.png"
							loading="lazy"
							decoding="async"
							className="aspect-343/217 w-full shrink-0 object-cover"
						/>
					</div>

					<Button variant="outline-brand" size="xl">
						See All Gallery
						<ArrowRightIcon className="size-6" />
					</Button>
				</div>
			</div>
		</section>
	);
};
