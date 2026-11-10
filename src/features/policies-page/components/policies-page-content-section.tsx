import { motion } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PolicyCategory =
	| "Terms & Conditions"
	| "Cancellation Policy"
	| "Privacy Policy";

const POLICY_CATEGORIES: PolicyCategory[] = [
	"Terms & Conditions",
	"Cancellation Policy",
	"Privacy Policy",
];

export function PoliciesPageContentSection() {
	const [activeCategory, setActiveCategory] =
		useState<PolicyCategory>("Terms & Conditions");

	return (
		<section className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24">
			<div className="flex w-full max-w-6xl flex-col gap-8 md:gap-12">
				<Tabs
					value={activeCategory}
					onValueChange={(value) => setActiveCategory(value as PolicyCategory)}
					className="flex items-center justify-center"
				>
					<motion.div
						layoutScroll
						className="no-scrollbar w-full overflow-x-auto"
					>
						<TabsList
							variant="line"
							className="mx-auto flex w-fit min-w-full justify-center border-brand/50 border-b p-0"
						>
							{POLICY_CATEGORIES.map((category) => (
								<TabsTrigger
									key={category}
									value={category}
									className="after:hidden hover:text-brand data-active:text-brand"
								>
									{category === activeCategory && (
										<motion.span
											layoutId="policies-tab-indicator"
											className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand"
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 40,
											}}
										/>
									)}
									<span className="relative z-10">{category}</span>
								</TabsTrigger>
							))}
						</TabsList>
					</motion.div>
				</Tabs>

				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							Reservations & Payment
						</h2>
						<p className="text-base text-mist leading-5.5">
							All bookings are confirmed upon receipt of a confirmation email.
							Payment is required at the time of booking via credit card or
							other accepted methods. Rates are subject to availability and
							applicable taxes.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							Check-In & Check-Out
						</h2>
						<p className="text-base text-mist leading-5.5">
							Check-in: 3:00 PM Check-out: 11:00 AM Valid photo ID and credit
							card required at check-in Guests must be 18 years or older
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							Guest Responsibilities
						</h2>
						<p className="text-base text-mist leading-5.5">
							Guests agree to respect other visitors and hotel property. Smoking
							is prohibited indoors. Any damages to rooms or facilities will be
							charged to the guest's account. Pets are allowed only in
							designated pet-friendly rooms.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							Liability
						</h2>
						<p className="text-base text-mist leading-5.5">
							The hotel is not responsible for lost or stolen personal
							belongings. We recommend using in-room safes for valuables. Our
							liability is limited to the total booking amount.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
