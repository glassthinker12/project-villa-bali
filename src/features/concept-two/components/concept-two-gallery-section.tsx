import { Button } from "#/components/ui/button";
import { ScrollArea } from "#/components/ui/scroll-area";
import { ArrowRightIcon } from "lucide-react";

const GALLERY_IMAGES = [
	"/images/gallery/gallery-two-1.jpg",
	"/images/gallery/gallery-two-2.png",
	"/images/gallery/gallery-two-3.jpg",
	"/images/gallery/gallery-two-4.jpg",
];

export const ConceptTwoGallerySection = () => {
	return (
		<section
			id="gallery"
			className="relative w-full overflow-hidden pt-16 pb-8"
		>
			<div className="relative flex flex-col items-start gap-4">
				{/* top */}
				<div className="px-4">
					<div className="relative h-128 w-full rounded-[8px] overflow-hidden flex items-center justify-center">
						{/* background */}
						<div className="absolute h-full w-full inset-0">
							<img
								src="/images/gallery/gallery-two-bg.png"
								alt=""
								className="h-full w-full object-cover"
							/>
							<div className="absolute h-full w-full inset-0 bg-[linear-gradient(180deg,rgba(36,33,33,0.60)_0.01%,rgba(36,33,33,0.70)_99.99%)] opacity-65" />
							<div
								className="absolute top-4 left-4 size-2 shrink-0 rotate-45 bg-white"
								aria-hidden="true"
							/>
							<div
								className="absolute top-4 right-4 size-2 shrink-0 rotate-45 bg-white"
								aria-hidden="true"
							/>
							<div
								className="absolute bottom-4 left-4 size-2 shrink-0 rotate-45 bg-white"
								aria-hidden="true"
							/>
							<div
								className="absolute bottom-4 right-4 size-2 shrink-0 rotate-45 bg-white"
								aria-hidden="true"
							/>
						</div>

						<div className="relative text-white">
							<div className="flex flex-col items-center justify-center gap-2 px-12">
								<p className="text-base text-brand-soft uppercase">
									VILLAS GALLERY
								</p>
								<h2 className="w-full font-bold font-heading text-4xl text-paper leading-11 text-center">
									A Glimpse of SEAVIEW Private Villas
								</h2>
							</div>
						</div>
					</div>
				</div>

				{/* bottom */}
				<div className="px-4 w-full grid grid-cols-2 space-y-4">
					{GALLERY_IMAGES.map((gallery, index) => {
						return (
							<div key={`gallery-${index + 1}`} className="w-full shrink-0">
								<div className="h-43.75">
									<div
										className={`h-full ${index === 1 ? "p-4 pr-0" : index === 2 ? "p-4 pl-0" : ""}`}
									>
										<div className="relative h-full w-full overflow-hidden rounded-[8px]">
											<img
												src={gallery}
												alt={`gallery-${index + 1}`}
												className="h-full w-full object-cover"
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* overview */}
				<div className="w-full flex flex-col items-center gap-4">
					<div className="flex flex-col items-center justify-center gap-2">
						<p className="text-base text-brand uppercase">
							OUR EXCLUSIVE EXPERIENCE
						</p>
						<p className="font-heading text-primary text-4xl font-bold leading-11 text-center px-12">
							The Private Beach Cave Access
						</p>
					</div>

					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex w-max gap-4 px-4 snap-x snap-mandatory">
							{GALLERY_IMAGES.map((gallery, index) => {
								return (
									<div
										key={`gallery-${index + 1}`}
										className="w-80 shrink-0 snap-center"
									>
										<div className="h-50 w-full overflow-hidden rounded-[8px]">
											<img
												src={gallery}
												alt={`gallery-${index + 1}`}
												className="h-full w-full object-cover"
											/>
										</div>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				</div>

				{/* cta */}
				<div className="w-full px-4 mt-4">
					<Button variant="brand" size="xl" className="rounded-[8px]">
						See All Photos & Videos
						<ArrowRightIcon className="size-6" />
					</Button>
				</div>
			</div>
		</section>
	);
};
