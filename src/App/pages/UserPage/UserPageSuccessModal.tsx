import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface UserPageSuccessModal {
	onClose: () => void;
}

export function UserPageSuccessModal({ onClose }: UserPageSuccessModal) {
	return (
		<Modal
			onClose={onClose}
			type="success"
			size="medium"
			title="Чудово!"
		>
			<Typography component="p1" className="center">
				Дані успішно оновлені!
			</Typography>
		</Modal>
	);
}
