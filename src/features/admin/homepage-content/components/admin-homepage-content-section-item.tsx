import { CanvasPreview } from "#/components/canvas-preview";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { HomepageAboutSection } from "#/features/homepage/components/homepage-about-section";
import { HomepageExpSection } from "#/features/homepage/components/homepage-exp-section";
import { HomepageGallerySection } from "#/features/homepage/components/homepage-gallery-section";
import { HomepageHeroSection } from "#/features/homepage/components/homepage-hero-section";
import { HomepageVillaSection } from "#/features/homepage/components/homepage-villa-section";
import type { HomepageContent, HomepageSectionKey } from "../types";

type AdminHomepageContentSectionItemProps = {
	section: HomepageSectionKey;
	content: HomepageContent;
	isDirty: boolean;
	isSaving: boolean;
	onEdit: () => void;
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

export const AdminHomepageContentSectionItem = ({
	section,
	content,
	isDirty,
	isSaving,
	onEdit,
}: AdminHomepageContentSectionItemProps) => {
	const mapped = mapToHomepageContent(content);

	return (
		<div className="flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden">
			<div className="flex items-center gap-3">
				<Button
					type="button"
					variant="outline-brand"
					disabled={isSaving}
					onClick={onEdit}
				>
					Edit
				</Button>
				{isDirty && <Badge variant="destructive">Unsaved</Badge>}
			</div>
			<Card className="w-full min-w-0 max-w-full overflow-hidden p-0">
				<CanvasPreview designWidth={1440} height={420} pointerEvents="none">
					{section === "hero" && (
						<div className="[&>section]:relative [&>section]:mt-0! [&>section]:h-225">
							<HomepageHeroSection {...mapped.hero} />
						</div>
					)}
					{section === "about" && <HomepageAboutSection {...mapped.about} />}
					{section === "villa" && <HomepageVillaSection {...mapped.villa} />}
					{section === "experience" && (
						<HomepageExpSection {...mapped.experience} />
					)}
					{section === "gallery" && (
						<HomepageGallerySection {...mapped.gallery} />
					)}
				</CanvasPreview>
			</Card>
		</div>
	);
};
