import { useEffect, useRef, useState } from "react";

function clamp(value: number, min = 0, max = 1) {
	return Math.min(max, Math.max(min, value));
}

export function useTraverseProgress<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [progress, setProgress] = useState(0.5);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = el.getBoundingClientRect();
			const vh = window.innerHeight;
			const range = vh + rect.height;
			const p = range > 0 ? clamp((vh - rect.top) / range) : 0.5;
			setProgress(p);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return { ref, progress };
}
