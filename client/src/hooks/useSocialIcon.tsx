import { BsGithub, BsLinkedin, BsInstagram, BsTwitter, BsFacebook } from 'react-icons/bs';

export const useSocialIcons = (name: string, size?: string) => {
	let Icon;
	switch (name) {
		case 'Twitter':
			Icon = <BsTwitter size={size ? size : '18'} />;
			break;
		case 'Facebook':
			Icon = <BsFacebook size={size ? size : '18'} />;
			break;
		case 'Linkedin':
			Icon = <BsLinkedin size={size ? size : '18'} />;
			break;
		case 'Github':
			Icon = <BsGithub size={size ? size : '18'} />;
			break;
		case 'Instagram':
			Icon = <BsInstagram size={size ? size : '18'} />;
			break;
		default:
			Icon = null;
	}
	return Icon as React.ReactNode;
};
