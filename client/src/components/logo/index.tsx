import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './styles.module.scss';
import { LogoSvg } from './logo-svg';

interface LogoProps {
	src?: string;
	alt?: string;
	link: string;
	size?: 'sm' | 'md' | 'lg';
	onClick?: React.MouseEventHandler;
}

export const Logo: React.FC<LogoProps> = React.memo(({ src, alt, link, size = 'sm', onClick }) => {
	return (
		<div className={clsx(styles.logo, styles[size])}>
			<Link to={link} onClick={onClick}>
				{src ? <img src={src} alt={alt ? alt : 'app-logo'} /> : <LogoSvg />}
			</Link>
		</div>
	);
});
