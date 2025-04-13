import React from 'react';
import './global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from '../theme/theme';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	return (
		<html lang='en' className={roboto.variable}>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
