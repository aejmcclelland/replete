'use client';

import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import jsPDF from 'jspdf';

import PrintButton from './PrintButton';
import GetAnotherRecipe from './GetAnotherRecipe';

interface ButtonToolbarProps {
	title: string;
	ingredients: string[];
	method: string[];
	setUrl: (url: string) => void;
	setData: (data: any) => void;
}

const ButtonToolbar: React.FC<ButtonToolbarProps> = ({
	title,
	ingredients,
	method,
	setUrl,
	setData,
}) => {
	const handleExportPDF = () => {
		const doc = new jsPDF();

		doc.setFontSize(16);
		doc.text(title, 10, 20);

		doc.setFontSize(12);
		doc.text('Ingredients:', 10, 30);
		ingredients.forEach((item, index) => {
			doc.text(`- ${item}`, 10, 40 + index * 8);
		});

		let methodStartY = 40 + ingredients.length * 8 + 10;
		doc.text('Method:', 10, methodStartY);
		method.forEach((step, index) => {
			doc.text(`${index + 1}. ${step}`, 10, methodStartY + 10 + index * 8);
		});

		doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
	};

	return (
	<Box
		className='no-print'
		sx={{
			position: 'fixed',
			bottom: 20,
			left: '50%',
			transform: 'translateX(-50%)',
			backgroundColor: 'rgba(255, 255, 255, 0.85)',
			borderRadius: 50,
			padding: '0.5rem 1.5rem',
			display: 'flex',
			gap: 2,
			zIndex: 10,
			boxShadow: 3,
		}}>
		<Tooltip title='Export to PDF'>
			<IconButton
				onClick={handleExportPDF}
				sx={{
					backgroundColor: '#f5f5f5',
					borderRadius: '50%',
					width: 56,
					height: 56,
					'&:hover': { backgroundColor: '#e0e0e0' },
				}}>
				<PictureAsPdfIcon fontSize='medium' />
			</IconButton>
		</Tooltip>
        		<Tooltip title='Print Recipe'>
			<IconButton
				onClick={() => window.print()}
				sx={{
					backgroundColor: '#f5f5f5',
					borderRadius: '50%',
					width: 56,
					height: 56,
					'&:hover': { backgroundColor: '#e0e0e0' },
				}}>
				<PrintIcon fontSize='medium' />
			</IconButton>
		</Tooltip>
        		<Tooltip title='Get Another Recipe'>
			<IconButton
				onClick={() => {
					setUrl('');
					setData(null);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				sx={{
					backgroundColor: '#f5f5f5',
					borderRadius: '50%',
					width: 56,
					height: 56,
					'&:hover': { backgroundColor: '#e0e0e0' },
				}}>
				<AutorenewIcon fontSize='medium' />
			</IconButton>
		</Tooltip>
	</Box>
	);
};

export default ButtonToolbar;