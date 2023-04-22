import type { SvgIconProps } from '~/ameliance-ui/components/SvgIcon';
import { SvgIcon } from '~/ameliance-ui/components/SvgIcon';

export function AWLogoShort(props: SvgIconProps) {
	return (
		<SvgIcon
			width="45px"
			height="28px"
			viewBox="0 0 45 28"
			stroke="none"
			{...props}
		>
			<path fillRule="evenodd" clipRule="evenodd" d="M7.48798 6L0 22.8H3.98401L5.48108 19.2H13.2687L14.76 22.8H18.84L11.328 6H7.48798ZM12.0459 16.248L9.38251 9.81833L6.70868 16.248H12.0459Z" />
			<path d="M17.205 6L22.7009 22.8H26.877L30.6852 11.4169L34.3889 22.8H38.5649L44.0609 6H40.3409L36.4266 17.8967L32.5889 6H28.989L25.0272 17.809L21.2369 6H17.205Z" />
		</SvgIcon>
	);
}
