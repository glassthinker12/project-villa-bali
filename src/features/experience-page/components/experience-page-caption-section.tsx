import type { ExperiencePageCaptionSection as ExperiencePageCaptionSectionType } from "../types";

type ExperiencePageCaptionSectionProps = {
	data: ExperiencePageCaptionSectionType;
};

export function ExperiencePageCaptionSection({
	data,
}: ExperiencePageCaptionSectionProps) {
	return (
		<section className="relative overflow-hidden md:overflow-visible">
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-cream" />
			</div>

			<div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-16 pb-24 md:px-16 md:pb-16">
				<div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
					<div className="flex w-full flex-col items-center gap-8">
						<p className="text-[20px] text-mist leading-7 md:w-180">
							{data.body}
						</p>
						<p className="font-bold font-subheading text-base text-olive">
							{data.caption}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
