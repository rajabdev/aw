import { useEffect, useState } from 'react';

function setViewportHeightVariable(vh: number | null) {
	if (vh) document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export function useViewportHeight() {
	const hasWindow = typeof window !== 'undefined';

	function getViewportHeightVariable() {
		const vh = hasWindow ? window.innerHeight : null;
		return vh;
	}

	const [viewportHeight, setViewportHeight] = useState(getViewportHeightVariable());

	useEffect(() => {
		setViewportHeightVariable(viewportHeight);
	}, [viewportHeight]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('resize', () => setViewportHeight(getViewportHeightVariable()));
		return () => window.addEventListener('resize', () => setViewportHeight(getViewportHeightVariable()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('orientationchange', () => setViewportHeight(getViewportHeightVariable()));
		return () => window.addEventListener('orientationchange', () => setViewportHeight(getViewportHeightVariable()));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	return { viewportHeight };
}
