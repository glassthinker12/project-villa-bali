import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";

export function useLiveChange<TFieldValues extends Record<string, unknown>>(
	form: UseFormReturn<TFieldValues>,
	onChange: (values: TFieldValues) => void,
) {
	const onChangeRef = useRef(onChange);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		const subscription = form.watch((values) => {
			onChangeRef.current(values as TFieldValues);
		});

		return () => subscription.unsubscribe();
	}, [form]);
}
