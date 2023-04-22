import { useLayoutEffect, useState } from 'react';

interface UseWindowScrollState {
	scrollX: number;
	scrollY: number;
}

export function useWindowScroll(): UseWindowScrollState {
	const [windowScroll, setWindowScroll] = useState<UseWindowScrollState>({
		scrollX: 0,
		scrollY: 0,
	});

	useLayoutEffect(() => {
		function updateScroll() {
			setWindowScroll({
				scrollX: window.scrollX,
				scrollY: window.scrollY,
			});
		}
		window.addEventListener('resize', updateScroll);
		updateScroll();
		return () => window.removeEventListener('resize', updateScroll);
	}, []);

	return windowScroll;
}
