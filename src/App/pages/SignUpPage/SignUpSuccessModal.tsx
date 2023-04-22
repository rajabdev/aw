import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface SignUpSuccessModal {
	onClose: () => void;
}

export function SignUpSuccessModal({ onClose }: SignUpSuccessModal) {
	return (
		<Modal
			onClose={onClose}
			type="success"
			size="medium"
			title="Вітаю!"
		>
			<Typography component="p1" className="center">
				Ви успішно зареєструвалися на сайті! Лишився ще один крок😉
			</Typography>
		</Modal>
	);
}
