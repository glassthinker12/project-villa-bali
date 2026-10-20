import { motion } from "motion/react";
import { defaultTransition, fadeUp } from "../lib/animation-variants";

type AuthCardProps = {
	children: React.ReactNode;
	className?: string;
};

export const AuthCard = ({ children, className = "" }: AuthCardProps) => {
	return (
		<motion.div
			variants={fadeUp}
			transition={defaultTransition}
			className={`relative w-full max-w-md bg-white p-8 shadow-xl ${className}`}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
		>
			{children}
		</motion.div>
	);
};
