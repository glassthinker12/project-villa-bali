export const ConceptOneGallerySection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden py-16">
			{/* background */}
			<div className="absolute h-2/3 w-full inset-0">
				<img
					src="/images/gallery/gallery-bg.webp"
					alt=""
					className="h-full w-full object-cover"
				/>
				<div className="absolute h-full w-full inset-0 bg-linear-to-b from-[#242121]/60 to-[#242121]/70" />
			</div>

			<div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
				<div className="flex flex-col items-start justify-start w-full gap-8">
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand-soft leading-6.5">
							VILLAS GALLERY
						</p>
						<h2 className="w-full font-bold font-heading text-4xl leading-11 px-8 md:px-0 text-white">
							A Glimpse of Seaview Private Villas
						</h2>
					</div>

					<div className="w-full bg-background p-4">
						<div className="flex items-center justify-center gap-4">
							{/* left */}
							<div className="w-2/3 h-full hidden md:block">
								<div className="w-full h-120 md:h-96 overflow-hidden">
									<img
										src="/images/gallery/gallery-left-1.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
							{/* center */}
							<div className="w-full h-full">
								<div className="w-full h-120 md:h-96 overflow-hidden">
									<img
										src="/images/gallery/gallery-center-1.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
							{/* right */}
							<div className="w-2/3 h-full hidden md:block">
								<div className="w-full h-120 md:h-96 overflow-hidden">
									<img
										src="/images/gallery/gallery-right-1.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
