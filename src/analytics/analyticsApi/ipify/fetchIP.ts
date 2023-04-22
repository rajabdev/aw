export async function fetchIP() {
	try {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return { ip: data.ip, status: 'success' };
	} catch (error) {
		return { error, status: 'error' };
	}
}
