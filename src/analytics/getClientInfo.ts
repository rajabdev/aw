// import { analyticsApi } from './analyticsApi';
import { getBrowser } from './getBrowser';
import { getMobile } from './getMobile';

export interface ClientInfo {
	ip: string;
	time: string;
	timezone: number;
	language: string;
	languages: string[];
	mobile: string | null;
	page: string;
	referrer: string;
	browser: {
		name: string;
		version: string;
	};
	screenWidth: number;
	screenHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

export async function getClientInfo(): Promise<ClientInfo> {
	// const ipResponse = await analyticsApi.ipify.fetchIP();

	return {
		ip: 'DEV',
		// ip: ipResponse.status === 'success' ? ipResponse.ip : '',
		time: new Date().toString(),
		timezone: (new Date()).getTimezoneOffset() / 60,
		language: window.navigator.language,
		languages: [...window.navigator.languages],
		mobile: getMobile() || '',
		page: window.location.pathname,
		referrer: document.referrer,
		browser: getBrowser(),
		screenWidth: window.screen.width,
		screenHeight: window.screen.height,
		viewportWidth: window.innerWidth,
		viewportHeight: window.innerHeight,
	};
}
