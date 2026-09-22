import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

export const ConceptOneFooter = () => {
	return (
		<footer
			id="contact"
			className="relative w-full overflow-hidden py-16 bg-brand text-white"
		>
			<div className="relative flex flex-col items-start justify-start gap-8 max-w-6xl mx-auto px-4">
				<div className="border border-brand-light w-full p-4 flex flex-col gap-8">
					{/* top */}
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div>
							<img
								alt="Seaview Private Villas"
								src="/images/logo.png"
								className="h-26.5 w-full max-w-75 object-contain"
							/>
						</div>
						<div className="w-full border-b border-brand-light" />
						<p className="whitespace-nowrap text-xs">
							Created by{" "}
							<span className="font-bold">
								Seaview Private Villas Team, 2026
							</span>
						</p>
					</div>

					{/* bottom */}
					<div className="flex flex-col md:flex-row gap-8 items-start justify-between">
						<div className="shrink-0 w-full md:w-77.5 flex flex-col items-center md:items-start gap-8">
							<p className="font-heading font-bold text-2xl leading-8 text-center md:text-left">
								Let's craft a stay worth remembering
							</p>
							<p className="text-base leading-6.5 text-center md:text-left">
								From your first arrival to your fond farewell, every moment is
								designed with care, comfort, and you in mind.
							</p>
							<div>
								<Button variant="paper" size="lg">
									Save Your Stay Now
									<ArrowRightIcon className="size-6" />
								</Button>
							</div>
						</div>

						<div className="w-fit flex flex-col md:flex-row items-start gap-8">
							<div className="shrink-0 w-full md:w-43.75">
								<div className="flex flex-col items-center md:items-start gap-4 w-full">
									<p className="font-heading font-bold text-2xl leading-8">
										Navigation
									</p>
									<ul className="flex flex-col gap-4 items-center md:items-start">
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												Home
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												About Us
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												Villas Highlight
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												The Cave Highlights
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												Experiences/Local Guide
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												Gallery
											</Link>
										</li>
										<li>
											<Link
												to="/concept/$conceptId"
												params={{ conceptId: "1" }}
												className="hover:underline"
											>
												Contact Us
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="shrink-0 w-full md:w-63.75">
								<div className="flex flex-col items-center md:items-start gap-8 w-full">
									<p className="font-heading font-bold text-2xl leading-8">
										Contacts & Socials
									</p>
									<ul className="flex flex-col gap-4 items-center md:items-start">
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="facebook"
												src="/images/social/envelope.svg"
												className="size-4 shrink-0"
											/>
											info@seaviewprivatevillas.com
										</li>
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="facebook"
												src="/images/social/instagram.svg"
												className="size-4 shrink-0"
											/>
											Seaview Private Villas
										</li>
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="facebook"
												src="/images/social/facebook.svg"
												className="size-4 shrink-0"
											/>
											Seaview Private Villas
										</li>
									</ul>
									<p className="text-xs leading-5 text-center md:text-left">
										From your first arrival to your fond farewell, every moment
										is designed with care, comfort, and you in mind.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
