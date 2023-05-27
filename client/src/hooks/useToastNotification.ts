import { toast } from 'react-toastify';

export function showFollowNotification(senderName: string) {
	toast.success(`User ${senderName} follow you!`, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	});
}

export function showUnfollowNotification(senderName: string) {
	toast.warn(`User ${senderName} unfollow you!`, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	});
}
