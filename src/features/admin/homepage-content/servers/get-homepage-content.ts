import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { HomepageContent } from "../types";

export const getHomepageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data: page, error: pageError } = await supabase
		.from("pages")
		.select("id")
		.eq("slug", "homepage")
		.single();

	if (pageError || !page) {
		return null;
	}

	const { data: pageSections, error: pageSectionsError } = await supabase
		.from("page_sections")
		.select("id, type, content")
		.eq("page_id", page.id);

	if (pageSectionsError || !pageSections) {
		return null;
	}

	const hero = pageSections.find((item) => item.type === "hero");
	const about = pageSections.find((item) => item.type === "about");
	const villa = pageSections.find((item) => item.type === "villa");
	const experience = pageSections.find((item) => item.type === "experience");
	const gallery = pageSections.find((item) => item.type === "gallery");

	return {
		hero: {
			eyebrow: hero?.content?.eyebrow ?? "-",
			title: hero?.content?.title ?? "-",
			subtitle: hero?.content?.subtitle ?? "-",
			videoUrl: hero?.content?.videoUrl ?? "-",
		},
		about: {
			eyebrow: about?.content?.eyebrow ?? "-",
			heading: about?.content?.heading ?? "-",
			body: about?.content?.body ?? "-",
			cta: {
				label: about?.content?.cta?.label ?? "-",
				url: about?.content?.cta?.url ?? "-",
			},
			image: {
				url: about?.content?.image?.url ?? "-",
				alt: about?.content?.image?.alt ?? "-",
			},
		},
		villa: {
			eyebrow: villa?.content?.eyebrow ?? "-",
			heading: villa?.content?.heading ?? "-",
			villas: villa?.content?.villas ?? [],
			cta: {
				label: villa?.content?.cta?.label ?? "-",
				url: villa?.content?.cta?.url ?? "-",
			},
		},
		experience: {
			eyebrow: experience?.content?.eyebrow ?? "-",
			heading: experience?.content?.heading ?? "-",
			experiences: experience?.content?.experiences ?? [],
			cta: {
				label: experience?.content?.cta?.label ?? "-",
				url: experience?.content?.cta?.url ?? "-",
			},
		},
		gallery: {
			eyebrow: gallery?.content?.eyebrow ?? "-",
			heading: gallery?.content?.heading ?? "-",
			galleries: gallery?.content?.galleries ?? [],
			cta: {
				label: gallery?.content?.cta?.label ?? "-",
				url: gallery?.content?.cta?.url ?? "-",
			},
		},
	} as HomepageContent;
});
