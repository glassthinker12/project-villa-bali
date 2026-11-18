import * as React from "react";

export function useMediaQuery(query: string): boolean | undefined {
	const subscribe = React.useCallback(
		(onStoreChange: () => void) => {
			const mediaQueryList = window.matchMedia(query);
			mediaQueryList.addEventListener("change", onStoreChange);

			return () => mediaQueryList.removeEventListener("change", onStoreChange);
		},
		[query],
	);

	const getSnapshot = React.useCallback(
		() => window.matchMedia(query).matches,
		[query],
	);

	return React.useSyncExternalStore<boolean | undefined>(
		subscribe,
		getSnapshot,
		() => undefined,
	);
}
