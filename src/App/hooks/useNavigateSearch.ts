import { createSearchParams, useNavigate } from 'react-router-dom';

export function useNavigateSearch() {
	const navigate = useNavigate();
	return function getSearchPath(pathname: string, params: Record<string, string>) {
		return navigate({ pathname, search: `?${createSearchParams(params)}` });
	};
}
