import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface LogInSuccessModal {
	onClose: () => void;
}

export function LogInSuccessModal({ onClose }: LogInSuccessModal) {
	return (
		<Modal
			onClose={onClose}
			type="success"
			size="medium"
			title="Вітаю!"
		>
			<Typography component="p1" className="center">
				Ви успішно увійшли на сайт!
			</Typography>
		</Modal>
	);
}
