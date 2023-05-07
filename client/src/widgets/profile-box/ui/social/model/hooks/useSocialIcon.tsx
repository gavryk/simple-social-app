import { BsGithub, BsLinkedin, BsInstagram, BsTwitter, BsFacebook } from 'react-icons/bs';

export const useSocialIcons = (name: string) => {
	let Icon;
	switch (name) {
		case 'Twitter':
			Icon = <BsTwitter size="18" />;
			break;
		case 'Facebook':
			Icon = <BsFacebook size="18" />;
			break;
		case 'Linkedin':
			Icon = <BsLinkedin size="18" />;
			break;
		case 'Github':
			Icon = <BsGithub size="18" />;
			break;
		case 'Instagram':
			Icon = <BsInstagram size="18" />;
			break;
		default:
			Icon = null;
	}
	return Icon as React.ReactNode;
};
