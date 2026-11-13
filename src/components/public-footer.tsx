import { Link } from "@tanstack/react-router";
import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import type { FooterContent } from "@/features/footer/types";
import {
	formatSocialLabel,
	normalizeSocialUrl,
} from "@/features/general-settings/utils/social-links";
import { buttonVariants } from "./ui/button";

type PublicFooterProps = {
	data: FooterContent;
};

export function PublicFooter({ data }: PublicFooterProps) {
	return (
		<footer
			id="footer"
			className="relative w-full overflow-hidden bg-[#f9f3ec] py-16 text-white"
		>
			{/* background */}
			<div className="absolute inset-0 h-full w-full opacity-40">
				<img
					src="/images/footer-bg.png"
					alt=""
					className="h-full w-full object-cover"
				/>
			</div>

			{/* content */}
			<motion.div
				className="relative mx-auto flex max-w-6xl flex-col items-start justify-start gap-8 px-2"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				<motion.div
					className="flex w-full flex-col gap-8 rounded-[8px] border border-brand-light bg-brand p-8"
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
								src="/images/logo-big-white.png"
								className="h-26.5 w-full max-w-75 object-contain"
							/>
						</div>
						<div className="w-full border-brand-light border-b" />
						<p className="whitespace-nowrap text-xs">
							<span className="text-white/80">by </span>
							<span className="font-bold">
								Seaview Private Villas Team, {new Date().getFullYear()}
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
								{data.title}
							</p>
							<p className="text-center text-base leading-6.5 md:text-left">
								{data.body}
							</p>
							<div>
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
								>
									<Link
										to={data.cta.url}
										className={cn(
											buttonVariants({ variant: "paper", size: "lg" }),
											"rounded-[8px]",
										)}
									>
										{data.cta.label}
										<ArrowRightIcon className="size-6" />
									</Link>
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
										{data.navigationTitle}
									</p>
									<ul className="flex flex-col items-center gap-4 md:items-start">
										{data.navs.map((item) => (
											<li key={item.url}>
												<Link to={item.url} className="hover:underline">
													{item.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="w-full shrink-0 md:w-63.75">
								<div className="flex w-full flex-col items-center gap-8 md:items-start">
									<p className="font-bold font-heading text-2xl leading-8">
										{data.socialMediaTitle}
									</p>
									<ul className="flex flex-col items-center gap-4 md:items-start">
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="envelope"
												src="/svg/envelope.svg"
												className="size-4 shrink-0"
											/>
											<a
												href={normalizeSocialUrl(data.socials.email)}
												className="hover:underline"
											>
												{formatSocialLabel(data.socials.email)}
											</a>
										</li>
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="instagram"
												src="/svg/instagram.svg"
												className="size-4 shrink-0"
											/>
											<a
												href={normalizeSocialUrl(data.socials.instagram)}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
											>
												{formatSocialLabel(data.socials.instagram)}
											</a>
										</li>
										<li className="flex items-center gap-2 text-xs">
											<img
												alt="facebook"
												src="/svg/facebook.svg"
												className="size-4 shrink-0"
											/>
											<a
												href={normalizeSocialUrl(data.socials.facebook)}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
											>
												{formatSocialLabel(data.socials.facebook)}
											</a>
										</li>
									</ul>
									<a
										href={data.mapsUrl}
										target="_blank"
										rel="noreferrer"
										className="text-center text-xs leading-5 hover:underline md:text-left"
									>
										{data.address}
									</a>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</footer>
	);
}
