import type { HomepageContent, HomepageSectionKey } from "../../types";

type AdminHomepageContentSectionPreview = {
	section: HomepageSectionKey;
	content: HomepageContent;
};

export const AdminHomepageContentSectionPreview = ({
	section,
	content,
}: AdminHomepageContentSectionPreview) => {
	switch (section) {
		case "hero":
			return <div>{JSON.stringify(content.hero)}</div>;
		case "about":
			return <div>{JSON.stringify(content.about)}</div>;
		case "villa":
			return <div>{JSON.stringify(content.villa)}</div>;
		case "experience":
			return <div>{JSON.stringify(content.experience)}</div>;
		case "gallery":
			return <div>{JSON.stringify(content.gallery)}</div>;
		default:
			return null;
	}
};
