import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

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

		const { error: updatePageSectionError } = await supabase
			.from("page_sections")
			.update({ content: data.content })
			.eq("id", pageSection.id);

		if (updatePageSectionError) {
			throw new Error(`Failed update page section - ${data.type}`);
		}
	});
