export const VillaDetailPageLocationSection = () => {
	return (
		<section className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24">
			<div className="flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12">
				<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
					<div className="flex flex-1 flex-col items-start justify-center gap-8 md:text-left">
						<div className="flex w-full flex-col items-start gap-2">
							<p className="font-bold font-heading text-4xl leading-11">
								A Glimpse of SEAVIEW Private Villas
							</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col items-start justify-center gap-8 md:text-left">
						<div className="flex w-full flex-col items-start gap-2">
							<p className="text-lg text-muted-foreground leading-6.5">
								As the only villa with access to a private beach cave on the
								island, Seaview Private Villas offers a unique experience for
								families, couples or groups, seeking a memorable and affordable
								stay.
							</p>
						</div>
					</div>
				</div>

				<div className="w-full">
					<div
						className="w-full overflow-hidden rounded-md"
						style={{ height: "400px" }}
					>
						<iframe
							title="Google Map"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://maps.google.com/maps?q=-8.67955,115.441942&z=15&output=embed"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
