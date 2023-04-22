import { useEffect, useState } from 'react';

export function useFullscreen() {
	const [fullscreen, setFullscreen] = useState<boolean>();

	useEffect(() => {
		if (typeof fullscreen === 'boolean') {
			if (fullscreen === true && !document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}, [fullscreen]);

	return setFullscreen;
}
