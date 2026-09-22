import { Button } from "#/components/ui/button";
import { CONCEPT_ONE_VILLAS } from "#/features/concept-one/data/concept-one-data";
import { ArrowRightIcon } from "lucide-react";

export const ConceptTwoVillaSection = () => {
	return (
		<section id="villa" className="relative w-full overflow-hidden py-16">
			<div className="relative flex flex-col items-start gap-6 max-w-6xl mx-auto px-4">
				<div className="w-full">
					<div className="w-full flex items-start justify-between">
						<div>
							<p className="font-subheading text-base text-brand leading-6.5">
								VILLAS OVERVIEW
							</p>
						</div>
						<div>
							<Button
								variant="link"
								size="xs"
								className="text-brand hover:bg-transparent hover:text-brand/90"
							>
								See All Villas
								<ArrowRightIcon />
							</Button>
						</div>
					</div>

					<h2 className="font-heading font-bold text-4xl leading-11">
						Our Luxury Villas
					</h2>
				</div>

				<div className="flex w-full flex-col gap-6">
					{CONCEPT_ONE_VILLAS.map((villa) => (
						<div
							key={villa.name}
							className="h-full md:h-96 flex flex-col md:flex-row-reverse items-stretch border border-olive rounded-[8px] overflow-hidden p-4 gap-4"
						>
							<div className="shrink-0 w-full md:w-1/2 h-full rounded-[8px] overflow-hidden">
								<img
									src={villa.image}
									alt=""
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-col h-full w-full gap-4">
								<div className="flex flex-col gap-4">
									<h3 className="whitespace-nowrap font-bold font-heading text-3xl md:text-4xl text-olive leading-8">
										{villa.name}
									</h3>
									<div className="flex md:hidden w-full items-center justify-center gap-2">
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
									<div className="hidden md:flex items-center gap-2">
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/user.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">2 Guest</p>
										</div>
										<div
											className="size-2 shrink-0 rounded-full bg-brand"
											aria-hidden="true"
										/>
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bed.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">1 Bedroom</p>
										</div>
										<div
											className="size-2 shrink-0 rounded-full bg-brand"
											aria-hidden="true"
										/>
										<div className="flex items-center gap-2">
											<img
												alt=""
												aria-hidden="true"
												src="/icons/bathtub.svg"
												className="size-4 shrink-0"
											/>
											<p className="text-sm">1 Bathroom</p>
										</div>
									</div>
								</div>

								<div className="mt-auto flex md:flex-col justify-between items-end md:items-start">
									<div>
										<p className="font-medium text-xs text-secondary-foreground leading-4">
											Starting from
										</p>
										<p className="font-bold font-subheading text-xl leading-7 text-brand">
											{villa.price}
										</p>
										<p className="text-xs text-muted-foreground leading-4">
											Additional charges may apply
										</p>
									</div>
									<div className="mt-4">
										<Button
											variant="link"
											className="text-brand hover:bg-transparent hover:text-brand/90 p-0"
										>
											See Villa Detail
											<ArrowRightIcon />
										</Button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
