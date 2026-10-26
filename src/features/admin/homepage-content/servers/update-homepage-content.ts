import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSupabaseServerClient } from "#/lib/supabase/server";

const galleryContentSchema = z.object({
	eyebrow: z.string().min(1),
	heading: z.string().min(1),
	galleries: z
		.array(
			z.object({
				imageUrl: z.string().min(1),
				alt: z.string().min(1),
			}),
		)
		.length(5),
	cta: z.object({
		label: z.string().min(1),
		url: z.string().min(1),
	}),
});

export const updateHomepageContentFn = createServerFn({
	method: "POST",
})
	.validator((data: { type: string; content: unknown }) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { data: page, error: pageError } = await supabase
			.from("pages")
			.select("id")
			.eq("slug", "homepage")
			.single();

		if (pageError || !page) {
			throw new Error("Page not found");
		}

		const { data: pageSection, error: pageSectionError } = await supabase
			.from("page_sections")
			.select("id, type, content")
			.eq("page_id", page.id)
			.eq("type", data.type)
			.single();

		if (pageSectionError || !pageSection) {
			throw new Error("Page section not found");
		}

		let content = data.content;

		if (data.type === "gallery") {
			const parsedGalleryContent = galleryContentSchema.safeParse(content);

			if (!parsedGalleryContent.success) {
				throw new Error("Gallery section must contain exactly 5 images");
			}

			content = parsedGalleryContent.data;
		}

		const { error: updatePageSectionError } = await supabase
			.from("page_sections")
			.update({ content })
			.eq("id", pageSection.id);

		if (updatePageSectionError) {
			throw new Error(`Failed update page section - ${data.type}`);
		}
	});
