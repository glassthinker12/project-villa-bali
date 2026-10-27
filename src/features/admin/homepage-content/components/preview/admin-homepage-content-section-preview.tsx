import { ArrowRight } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { HomepageAboutSection } from "#/features/homepage/components/homepage-about-section";
import { HomepageGallerySection } from "#/features/homepage/components/homepage-gallery-section";
import { HomepageHeroSection } from "#/features/homepage/components/homepage-hero-section";
import { HomepageVillaSection } from "#/features/homepage/components/homepage-villa-section";
import type { HomepageContent, HomepageSectionKey } from "../../types";

type AdminHomepageContentSectionPreviewProps = {
	section: HomepageSectionKey;
	content: HomepageContent;
};

const mapToHomepageContent = (content: HomepageContent) => ({
	hero: content.hero,
	about: {
		...content.about,
		cta: {
			label: content.about.cta.label,
			href: content.about.cta.url,
		},
	},
	villa: {
		...content.villa,
		cta: {
			label: content.villa.cta.label,
			href: content.villa.cta.url,
		},
	},
	experience: {
		...content.experience,
		cta: {
			label: content.experience.cta.label,
			href: content.experience.cta.url,
		},
	},
	gallery: {
		...content.gallery,
		cta: {
			label: content.gallery.cta.label,
			href: content.gallery.cta.url,
		},
	},
});

export const AdminHomepageContentSectionPreview = ({
	section,
	content,
}: AdminHomepageContentSectionPreviewProps) => {
	const mapped = mapToHomepageContent(content);

	return (
		<Card className="contain-[layout_paint_inline-size] w-full min-w-0 max-w-full overflow-hidden">
			<div className="w-full min-w-0 max-w-full overflow-hidden">
				<div className="transform-[translateZ(0)] pointer-events-none w-full min-w-0 max-w-full select-none overflow-hidden">
					{section === "hero" && (
						<div className="w-full min-w-0 max-w-full overflow-hidden [&>section]:relative [&>section]:mt-0! [&>section]:h-70 [&>section]:w-full [&>section]:max-w-full [&>section]:overflow-hidden [&>section]:md:h-90">
							<HomepageHeroSection {...mapped.hero} />
						</div>
					)}
					{section === "about" && (
						<div className="w-full min-w-0 max-w-full overflow-hidden [&>section]:w-full [&>section]:max-w-full [&>section]:overflow-hidden">
							<HomepageAboutSection {...mapped.about} />
						</div>
					)}
					{section === "villa" && (
						<div className="w-full min-w-0 max-w-full overflow-hidden [&>section]:w-full [&>section]:max-w-full [&>section]:overflow-hidden">
							<HomepageVillaSection {...mapped.villa} />
						</div>
					)}
					{section === "experience" && (
						<div className="w-full min-w-0 max-w-full overflow-hidden">
							<div className="relative w-full overflow-hidden bg-cream py-10 md:py-12">
								<div className="flex w-full flex-col gap-6">
									<div className="mx-auto hidden w-full max-w-6xl flex-col items-start gap-2 px-4 md:flex md:px-8">
										{mapped.experience.eyebrow ? (
											<p className="font-subheading text-brand text-sm tracking-wider">
												{mapped.experience.eyebrow}
											</p>
										) : null}
										<h3 className="font-bold font-heading text-2xl text-foreground md:text-3xl">
											{mapped.experience.heading || "-"}
										</h3>
									</div>

									<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center md:hidden">
										<div className="flex flex-col gap-2">
											<p className="font-subheading text-brand text-sm tracking-wider">
												{mapped.experience.eyebrow || "Local Guide"}
											</p>
											<h3 className="font-bold font-heading text-2xl text-foreground">
												{mapped.experience.heading || "-"}
											</h3>
										</div>
									</div>

									<div className="w-full min-w-0">
										<div className="mx-auto flex w-full max-w-6xl flex-wrap gap-3 px-4 md:px-8">
											{mapped.experience.experiences?.length ? (
												mapped.experience.experiences.slice(0, 3).map((exp) => (
													<div
														key={exp.title}
														className="flex w-full min-w-0 flex-col gap-3 sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]"
													>
														<div className="relative aspect-square w-full overflow-hidden rounded-lg">
															{exp.bgImageUrl ? (
																<img
																	src={exp.bgImageUrl}
																	alt=""
																	className="absolute inset-0 size-full object-cover"
																/>
															) : (
																<div className="absolute inset-0 bg-muted/40" />
															)}
															<div className="absolute inset-0 bg-linear-to-b from-foreground/50 to-foreground/30" />
															<div className="absolute inset-[13.5%] overflow-hidden rounded-lg bg-sky">
																{exp.innerImageUrl ? (
																	<img
																		src={exp.innerImageUrl}
																		alt={exp.title}
																		className="size-full object-cover"
																	/>
																) : (
																	<div className="size-full bg-muted/40" />
																)}
															</div>
														</div>
														<h4 className="font-bold font-heading text-lg text-olive md:text-xl">
															{exp.title || "-"}
														</h4>
													</div>
												))
											) : (
												<div className="flex h-40 w-full items-center justify-center rounded-lg border bg-muted/40">
													<span className="text-muted-foreground text-sm">
														No experiences added
													</span>
												</div>
											)}
										</div>
									</div>

									<div className="mx-auto hidden w-full max-w-6xl items-center justify-between px-4 md:flex md:px-8">
										<div className="flex items-center gap-3">
											<div className="flex size-9 items-center justify-center rounded-md border text-muted-foreground">
												<ArrowRight className="size-4 rotate-180" />
											</div>
											<div className="flex size-9 items-center justify-center rounded-md border text-muted-foreground">
												<ArrowRight className="size-4" />
											</div>
										</div>
										{mapped.experience.cta?.label ? (
											<div
												className={buttonVariants({ variant: "ghost" })}
												aria-disabled
											>
												{mapped.experience.cta.label}
												<ArrowRight className="size-5" />
											</div>
										) : null}
									</div>
								</div>
							</div>
						</div>
					)}
					{section === "gallery" && (
						<div className="w-full min-w-0 max-w-full overflow-hidden [&>section]:w-full [&>section]:max-w-full [&>section]:overflow-hidden">
							<HomepageGallerySection {...mapped.gallery} />
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
