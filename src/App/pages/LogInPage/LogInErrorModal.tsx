import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface LogInErrorModal {
	onClose: () => void;
}

export function LogInErrorModal({ onClose }: LogInErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			title="Невірні дані!"
		>
			<>
				<Typography component="p1" className="center">
					Невірно вказана електронна адреса чи пароль.
				</Typography>
				<Typography component="p1" className="center">
					Перевірте, будь ласка, дані та спробуйте ще раз!
				</Typography>
			</>
		</Modal>
	);
}
