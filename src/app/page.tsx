'use client';
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import PrintButton from '../components/PrintButton';
import RecipeForm from '../components/RecipeForm';
import GetAnotherRecipe from '../components/GetAnotherRecipe';
import ButtonToolbar from '../components/ButtonToolbar';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { jsPDF } from 'jspdf';

export default function Page() {
	const [url, setUrl] = useState('');
	const [data, setData] = useState<any>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch('/api/scrape', {
			method: 'POST',
			body: JSON.stringify({ url }),
			headers: { 'Content-Type': 'application/json' },
		});

		const result = await res.json();
		setData(result);
	};

	const handleExportPDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text(data.title, 10, 20);

		doc.setFontSize(12);
		doc.text('Ingredients:', 10, 30);
		data.ingredients.forEach((item: string, index: number) => {
			doc.text(`- ${item}`, 10, 40 + index * 8);
		});

		let methodStartY = 40 + data.ingredients.length * 8 + 10;
		doc.text('Method:', 10, methodStartY);
		data.method.forEach((step: string, index: number) => {
			doc.text(`${index + 1}. ${step}`, 10, methodStartY + 10 + index * 8);
		});

		doc.save(`${data.title.replace(/\s+/g, '_')}.pdf`);
	};

	return (
		<div style={{ padding: '2rem' }}>
			<div className='no-print'>
				<Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
					Replete
				</Typography>
				<Typography
					variant='subtitle1'
					gutterBottom
					sx={{ textAlign: 'center', color: 'gray' }}>
					Your recipe collection, full and flavourful.
				</Typography>

				<RecipeForm url={url} setUrl={setUrl} setData={setData} />
			</div>

			{/* Show this during print */}
			<div className='print-content'>
				{data && (
					<div style={{ marginTop: '2rem' }}>
						<Typography variant='h5' gutterBottom>
							{data.title}
						</Typography>
						<Typography variant='h6' gutterBottom>
							Ingredients
						</Typography>
						{data.ingredients?.map((ing: string, idx: number) => (
							<Typography key={idx} variant='body1'>
								• {ing}
							</Typography>
						))}
						<Typography variant='h6' gutterBottom>
							Method
						</Typography>
						<Box mb={4}>
							{data.method?.map((step: string, idx: number) => (
								<Typography key={idx} variant='body2' paragraph>{`${
									idx + 1
								}. ${step}`}</Typography>
							))}
						</Box>
					</div>
				)}
			</div>

			{data && (
				<ButtonToolbar
					title={data.title}
					ingredients={data.ingredients}
					method={data.method}
					setUrl={setUrl}
					setData={setData}
				/>
			)}
		</div>
	);
}
