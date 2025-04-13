'use client';

import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

type Props = {
	title: string;
	ingredients: string[];
	method: string[];
	sourceUrl: string;
};

const ScrapeResultPreview: React.FC<Props> = ({
	title,
	ingredients,
	method,
	sourceUrl,
}) => {
	return (
		<Box mt={4}>
			<Typography variant='h4' gutterBottom>
				{title}
			</Typography>

			<Typography variant='subtitle1' gutterBottom>
				Source:{' '}
				<a href={sourceUrl} target='_blank' rel='noopener noreferrer'>
					{sourceUrl}
				</a>
			</Typography>

			<Divider sx={{ my: 2 }} />

			<Typography variant='h6'>Ingredients:</Typography>
			<List>
				{ingredients.map((item, index) => (
					<ListItem key={index} sx={{ pl: 0 }}>
						• {item}
					</ListItem>
				))}
			</List>

			<Divider sx={{ my: 2 }} />

			<Typography variant='h6'>Method:</Typography>
			<List>
				{method.map((step, index) => (
					<ListItem key={index} sx={{ pl: 0 }}>
						{index + 1}. {step}
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default ScrapeResultPreview;
