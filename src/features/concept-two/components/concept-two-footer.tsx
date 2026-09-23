import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";

export const ConceptTwoFooter = () => {
	return (
		<footer
			id="contact"
			className="relative w-full overflow-hidden py-16 text-white"
		>
			{/* background */}
			<div className="absolute inset-0 h-full w-full opacity-40">
				<img
					src="/images/about/about-bg.jpg"
					alt=""
					className="h-full w-full object-cover"
				/>
			</div>

			<motion.div
				className="relative mx-auto flex max-w-6xl flex-col items-start justify-start gap-8 px-4"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				<motion.div
					className="flex w-full flex-col gap-8 rounded-[8px] border border-brand-light bg-brand p-4"
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								delayChildren: 0.1,
								staggerChildren: 0.1,
							},
						},
					}}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{/* top */}
					<motion.div
						className="flex flex-col items-center gap-8 md:flex-row"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
					>
						<div>
							<img
								alt="Seaview Private Villas"
								src="/images/logo.png"
								className="h-26.5 w-full max-w-75 object-contain"
							/>
						</div>
						<div className="w-full border-brand-light border-b" />
						<p className="whitespace-nowrap text-xs">
							Created by{" "}
							<span className="font-bold">
								Seaview Private Villas Team, 2026
							</span>
						</p>
					</motion.div>

					{/* bottom */}
					<motion.div
						className="flex flex-col items-start justify-between gap-8 md:flex-row"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ delayChildren: 0.2, staggerChildren: 0.08 }}
					>
						<motion.div
							className="flex w-full shrink-0 flex-col items-center gap-8 md:w-77.5 md:items-start"
							variants={{
								hidden: { opacity: 0, x: -20 },
								visible: { opacity: 1, x: 0 },
							}}
						>
							<p className="text-center font-bold font-heading text-2xl leading-8 md:text-left">
								Let's craft a stay worth remembering
							</p>
							<p className="text-center text-base leading-6.5 md:text-left">
								From your first arrival to your fond farewell, every moment is
								designed with care, comfort, and you in mind.
							</p>
							<div>
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
								>
									<Button variant="paper" size="lg" className="rounded-[8px]">
										Save Your Stay Now
										<ArrowRightIcon className="size-6" />
									</Button>
								</motion.div>
							</div>
						</motion.div>

						<motion.div
							className="flex w-fit flex-col items-start gap-8 md:flex-row"
							variants={{
								hidden: { opacity: 0, x: 20 },
								visible: { opacity: 1, x: 0 },
							}}
						>
							<div className="w-full shrink-0 md:w-43.75">
								<div className="flex w-full flex-col items-center gap-4 md:items-start">
									<p className="font-bold font-heading text-2xl leading-8">
										Navigation
									</p>
									<ul className="flex flex-col items-center gap-4 md:items-start">
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
							<div className="w-full shrink-0 md:w-63.75">
								<div className="flex w-full flex-col items-center gap-8 md:items-start">
									<p className="font-bold font-heading text-2xl leading-8">
										Contacts & Socials
									</p>
									<ul className="flex flex-col items-center gap-4 md:items-start">
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
									<p className="text-center text-xs leading-5 md:text-left">
										From your first arrival to your fond farewell, every moment
										is designed with care, comfort, and you in mind.
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</footer>
	);
};
