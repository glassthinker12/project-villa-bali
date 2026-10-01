import type { Transition, Variants } from "motion/react";

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
	hidden: { opacity: 0, y: -40 },
	visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: { opacity: 1, scale: 1 },
};

export const slideLeft: Variants = {
	hidden: { opacity: 0, x: 60 },
	visible: { opacity: 1, x: 0 },
};

export const slideRight: Variants = {
	hidden: { opacity: 0, x: -60 },
	visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.15,
			staggerChildren: 0.12,
		},
	},
};

export const staggerItem: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

export const defaultTransition: Transition = {
	duration: 0.7,
	ease: [0.25, 0.46, 0.45, 0.94],
};

export const smoothTransition: Transition = {
	duration: 0.5,
	ease: "easeOut",
};

export const springTransition: Transition = {
	type: "spring",
	stiffness: 100,
	damping: 20,
};
