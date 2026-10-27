import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import { homepageFallbackContent } from "../data/homepage-fallback";

export const getHomepageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data: page, error: pageError } = await supabase
		.from("pages")
		.select("id")
		.eq("slug", "homepage")
		.single();

	if (pageError || !page) {
		console.warn(
			"[homepage] Falling back to static content: homepage page not found",
			pageError?.message,
		);
		return homepageFallbackContent;
	}

	const { data: pageSections, error: pageSectionsError } = await supabase
		.from("page_sections")
		.select("id, type, content")
		.eq("page_id", page.id);

	if (pageSectionsError || !pageSections) {
		console.warn(
			"[homepage] Falling back to static content: homepage sections not found",
			pageSectionsError?.message,
		);
		return homepageFallbackContent;
	}

	const hero = pageSections.find((item) => item.type === "hero");
	const about = pageSections.find((item) => item.type === "about");
	const villa = pageSections.find((item) => item.type === "villa");
	const experience = pageSections.find((item) => item.type === "experience");
	const gallery = pageSections.find((item) => item.type === "gallery");

	return {
		hero: {
			eyebrow: hero?.content?.eyebrow ?? homepageFallbackContent.hero.eyebrow,
			title: hero?.content?.title ?? homepageFallbackContent.hero.title,
			subtitle:
				hero?.content?.subtitle ?? homepageFallbackContent.hero.subtitle,
			videoUrl:
				hero?.content?.videoUrl ?? homepageFallbackContent.hero.videoUrl,
		},
		about: {
			eyebrow: about?.content?.eyebrow ?? homepageFallbackContent.about.eyebrow,
			heading: about?.content?.heading ?? homepageFallbackContent.about.heading,
			body: about?.content?.body ?? homepageFallbackContent.about.body,
			cta: {
				label:
					about?.content?.cta?.label ?? homepageFallbackContent.about.cta.label,
				href:
					about?.content?.cta?.url ?? homepageFallbackContent.about.cta.href,
			},
			image: {
				url:
					about?.content?.image?.url ?? homepageFallbackContent.about.image.url,
				alt:
					about?.content?.image?.alt ?? homepageFallbackContent.about.image.alt,
			},
		},
		villa: {
			eyebrow: villa?.content?.eyebrow ?? homepageFallbackContent.villa.eyebrow,
			heading: villa?.content?.heading ?? homepageFallbackContent.villa.heading,
			villas: villa?.content?.villas ?? homepageFallbackContent.villa.villas,
			cta: {
				label:
					villa?.content?.cta?.label ?? homepageFallbackContent.villa.cta.label,
				href:
					villa?.content?.cta?.url ?? homepageFallbackContent.villa.cta.href,
			},
		},
		experience: {
			eyebrow:
				experience?.content?.eyebrow ??
				homepageFallbackContent.experience.eyebrow,
			heading:
				experience?.content?.heading ??
				homepageFallbackContent.experience.heading,
			experiences:
				experience?.content?.experiences ??
				homepageFallbackContent.experience.experiences,
			cta: {
				label:
					experience?.content?.cta?.label ??
					homepageFallbackContent.experience.cta.label,
				href:
					experience?.content?.cta?.url ??
					homepageFallbackContent.experience.cta.href,
			},
		},
		gallery: {
			eyebrow:
				gallery?.content?.eyebrow ?? homepageFallbackContent.gallery.eyebrow,
			heading:
				gallery?.content?.heading ?? homepageFallbackContent.gallery.heading,
			galleries:
				gallery?.content?.galleries ??
				homepageFallbackContent.gallery.galleries,
			cta: {
				label:
					gallery?.content?.cta?.label ??
					homepageFallbackContent.gallery.cta.label,
				href:
					gallery?.content?.cta?.url ??
					homepageFallbackContent.gallery.cta.href,
			},
		},
	};
});
