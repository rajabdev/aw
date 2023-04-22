// credit to Timothy Huang for this regex test:
// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
export function getMobile() {
	if (/Android/i.test(navigator.userAgent)) return 'Android';
	if (/webOS/i.test(navigator.userAgent)) return 'webOS';
	if (/iPhone/i.test(navigator.userAgent)) return 'iPhone';
	if (/iPad/i.test(navigator.userAgent)) return 'iPad';
	if (/iPod/i.test(navigator.userAgent)) return 'iPod';
	if (/BlackBerry/i.test(navigator.userAgent)) return 'BlackBerry';
	if (/IEMobile/i.test(navigator.userAgent)) return 'IEMobile';
	if (/Opera Mini/i.test(navigator.userAgent)) return 'Opera Mini';
	return null;
}
