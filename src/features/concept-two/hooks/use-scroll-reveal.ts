import { useInView } from "motion/react";
import { useRef } from "react";

export function useScrollReveal(options?: {
	threshold?: number;
	once?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, {
		threshold: options?.threshold ?? 0.15,
		once: options?.once ?? true,
	});

	return { ref, isInView };
}
