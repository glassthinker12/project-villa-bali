import { Link } from "@tanstack/react-router";
import { MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";

const MENUS = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "All Villas",
		url: "/",
	},
	{
		title: "The Cave",
		url: "/",
	},
	{
		title: "Gallery",
		url: "/",
	},
	{
		title: "About Us",
		url: "/",
	},
	{
		title: "Contact Us",
		url: "/",
	},
];

export const ConceptTwoNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<motion.nav
			className={`sticky top-0 z-20 transition-all duration-300 ${isScrolled ? "bg-[linear-gradient(180deg,#2365b0cc_0%,#2365b000_100%)]" : "bg-transparent"}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="mx-auto flex max-w-6xl justify-between p-4">
				<Link to="/concept/$conceptId" params={{ conceptId: "1" }}>
					<img
						alt="Seaview Private Villas"
						src="/images/logo.png"
						className="h-12 w-34 object-contain"
						loading="eager"
					/>
				</Link>

				<div className="hidden items-center gap-6 md:flex">
					{MENUS.map((menu) => (
						<Link
							key={menu.title}
							to="/concept/$conceptId"
							params={{ conceptId: "1" }}
							className="font-bold font-heading text-lg text-white underline-offset-2 hover:underline"
						>
							{menu.title}
						</Link>
					))}
				</div>

				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="block md:hidden"
				>
					<Button
						variant="ghost"
						size="icon"
						className="cursor-pointer hover:bg-muted/10"
						aria-label="Open navigation menu"
						aria-expanded={isOpen}
						aria-controls="mobile-navigation-menu"
						onClick={() => setIsOpen(true)}
					>
						<MenuIcon className="size-6 text-white" />
					</Button>
				</motion.div>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							id="mobile-navigation-menu"
							className="fixed inset-0 z-50 h-dvh w-full bg-brand md:hidden"
							initial={{ opacity: 0, y: "-100%" }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: "-100%" }}
							transition={{ duration: 0.35, ease: "easeOut" }}
						>
							<div className="h-full w-full bg-[url('/images/about/about-bg.webp')] bg-center bg-cover before:absolute before:inset-0 before:bg-brand/50">
								<div className="relative z-10 flex h-full flex-col">
									<div className="flex items-center justify-between p-4">
										<Link
											to="/concept/$conceptId"
											params={{ conceptId: "1" }}
											onClick={() => setIsOpen(false)}
										>
											<img
												alt="Seaview Private Villas"
												src="/images/logo.png"
												className="h-12 w-34 object-contain"
												loading="eager"
											/>
										</Link>
										<Button
											variant="ghost"
											size="icon"
											className="cursor-pointer hover:bg-muted/10"
											aria-label="Close navigation menu"
											onClick={() => setIsOpen(false)}
										>
											<XIcon className="size-6 text-white" />
										</Button>
									</div>

									<div className="flex flex-col items-center gap-6 p-4">
										{MENUS.map((menu) => (
											<Link
												key={menu.title}
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												onClick={() => setIsOpen(false)}
												className="font-bold font-heading text-3xl text-white underline-offset-2 hover:underline"
											>
												{menu.title}
											</Link>
										))}
									</div>

									<div className="mt-auto mb-16 p-4">
										<p className="text-center text-white text-xs">
											Follow us on
										</p>
										<div className="mt-4 flex items-center justify-center gap-6">
											<div className="grid size-10.5 place-items-center rounded-full border">
												<img
													alt="envelope"
													src="/images/social/envelope.svg"
													className="size-5 shrink-0"
												/>
											</div>
											<div className="grid size-10.5 place-items-center rounded-full border">
												<img
													alt="instagram"
													src="/images/social/instagram.svg"
													className="size-5 shrink-0"
												/>
											</div>
											<div className="grid size-10.5 place-items-center rounded-full border">
												<img
													alt="facebook"
													src="/images/social/facebook.svg"
													className="size-5 shrink-0"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};
