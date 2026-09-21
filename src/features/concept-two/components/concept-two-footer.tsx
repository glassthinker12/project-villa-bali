import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

export const ConceptTwoFooter = () => {
	return (
		<footer
			id="contact"
			className="relative flex w-full items-center justify-center bg-white px-4 pt-16 pb-4"
		>
			{/* background */}
			<div className="absolute h-full w-full inset-0">
				<img
					src="/images/about/about-bg.jpg"
					alt=""
					className="h-full object-cover"
				/>
			</div>

			<div className="relative flex w-full flex-col items-center gap-8 border border-brand-light bg-brand p-4 rounded-[8px]">
				<img
					alt="Seaview Private Villas"
					src="/images/logo.png"
					className="h-26.5 w-full max-w-75 object-contain"
				/>

				<div className="flex w-full flex-col gap-8">
					<h2 className="w-full text-center font-bold font-heading text-2xl text-paper leading-8">
						Let&apos;s craft a stay worth remembering
					</h2>
					<Button variant="paper" size="xl" className="rounded-[8px]">
						Book Now
						<ArrowRightIcon className="size-6" />
					</Button>
				</div>

				<nav
					aria-label="Footer navigation"
					className="flex flex-col items-center gap-4 text-center text-white"
				>
					<h2 className="font-bold font-heading text-2xl leading-8">
						Navigation
					</h2>
					<ul className="flex flex-col items-center gap-4 font-medium text-base leading-6.5">
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								Villas Highlight
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								The Cave Highlights
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								Experiences/Local Guide
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								Gallery
							</Link>
						</li>
						<li>
							<Link
								to="/concept/$conceptId"
								params={{ conceptId: "2" }}
								className="hover:underline"
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</nav>

				<p className="w-full text-center text-white text-xs leading-5">
					Tamarind Road, Jungutbatu, Kec. Nusa Penida, Kabupaten Klungkung,
					Bali, Indonesia
				</p>

				<div className="w-full border-brand-soft border-b-2" />

				<div className="flex w-full flex-col items-center gap-4">
					<div className="flex w-full items-center justify-center gap-2 px-2 py-1">
						<img
							alt="envelope"
							src="/images/social/envelope.svg"
							className="size-5 shrink-0"
						/>
						<a
							href="mailto:info@seaviewprivatevillas.com"
							className="break-all text-center text-paper text-xs leading-5 hover:underline sm:break-normal"
						>
							info@seaviewprivatevillas.com
						</a>
					</div>
					<div className="flex w-full items-center justify-center gap-2 px-2 py-1">
						<img
							alt="instagram"
							src="/images/social/instagram.svg"
							className="size-5 shrink-0"
						/>
						<a
							href="https://instagram.com/SeaviewPrivateVillas"
							target="_blank"
							rel="noopener noreferrer"
							className="break-all text-center text-paper text-xs leading-5 hover:underline sm:break-normal"
						>
							Seaview Private Villas
						</a>
					</div>
					<div className="flex w-full items-center justify-center gap-2 px-2 py-1">
						<img
							alt="facebook"
							src="/images/social/facebook.svg"
							className="size-5 shrink-0"
						/>
						<a
							href="https://facebook.com/SeaviewPrivateVillas"
							target="_blank"
							rel="noopener noreferrer"
							className="break-all text-center text-paper text-xs leading-5 hover:underline sm:break-normal"
						>
							Seaview Private Villas
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
