import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import type { VillaDetailPageContent } from "../types";

type VillaDetailPageContentSectionProps = VillaDetailPageContent;

export const VillaDetailPageContentSection = (
	villa: VillaDetailPageContentSectionProps,
) => {
	return (
		<section className="relative overflow-hidden md:overflow-visible">
			{/* Background — gradient + decorative image */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
				<img
					src="/images/about/about-bg.webp"
					alt=""
					loading="lazy"
					decoding="async"
					className="absolute inset-0 size-full object-cover opacity-30"
				/>
			</div>

			{/* Content */}
			<div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-16 pb-24 md:px-16 md:pb-16">
				<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
					<div className="flex flex-1 flex-col items-start justify-center gap-8 text-left">
						<div className="flex w-full flex-col items-start gap-2 md:w-2/3">
							<p className="text-lg text-muted-foreground leading-5.5">
								{villa.description}
							</p>
						</div>
					</div>
					<div>
						<Button
							variant="brand"
							className="h-[50px] cursor-pointer rounded-lg gap-2 px-6 py-3 font-medium text-base leading-[26px] normal-case tracking-normal hover:bg-brand/90"
						>
							Check Availability
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div>
						<p className="font-bold font-heading text-2xl">Villa Features</p>
						<div className="grid grid-cols-2">
							{villa.facilities.map((facility, index) => (
								<div
									key={`villa-features-${index + 1}`}
									className="mt-8 flex items-center gap-2"
								>
									<img src="/icons/logo-blue-small.png" alt="logo-blue-small" />
									<p className="text-muted-foreground text-sm">{facility}</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<p className="font-bold font-heading text-2xl">House Rules</p>
						<div className="grid grid-cols-2">
							{villa.rules.map((rule, index) => (
								<div
									key={`house-rules-${index + 1}`}
									className="mt-8 flex items-center gap-2"
								>
									<ArrowRightIcon className="mt-0.5 size-4" />
									<p className="text-muted-foreground text-sm">{rule}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
