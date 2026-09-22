import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";

export const ConceptOneNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-[linear-gradient(180deg,#2365b0cc_0%,#2365b000_100%)]" : "bg-transparent"}`}
		>
			<div className="flex justify-between max-w-6xl mx-auto p-4">
				<img
					alt="Seaview Private Villas"
					src="/images/logo.png"
					className="h-12 w-34 object-contain"
					loading="eager"
				/>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer hover:bg-muted/10"
					aria-label="Open navigation menu"
				>
					<MenuIcon className="size-6 text-white" />
				</Button>
			</div>
		</nav>
	);
};
