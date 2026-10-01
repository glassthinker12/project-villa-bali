import { type UseInViewOptions, useInView } from "motion/react";
import { useRef } from "react";

export interface ScrollRevealOptions {
	/**
	 * @deprecated Use `amount` instead (aligned with Motion's `useInView`).
	 */
	threshold?: UseInViewOptions["amount"];
	amount?: UseInViewOptions["amount"];
	once?: boolean;
}

export function useScrollReveal(options?: ScrollRevealOptions) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, {
		amount: options?.amount ?? options?.threshold ?? 0.15,
		once: options?.once ?? true,
	});

	return { ref, isInView };
}
