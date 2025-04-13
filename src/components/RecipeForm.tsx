'use client';

import React, {
	useRef,
	useEffect,
	Dispatch,
	SetStateAction,
	useTransition,
	FormEvent,
} from 'react';
import { useFormStatus } from 'react-dom';
import { Box, TextField } from '@mui/material';
import GetRecipeButton from './GetRecipeButton';
import { scrapeData } from '../app/actions/scrapeData';

interface RecipeFormProps {
	url: string;
	setUrl: Dispatch<SetStateAction<string>>;
	setData: Dispatch<SetStateAction<any>>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ url, setUrl, setData }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isPending, startTransition] = useTransition();
	const { pending } = useFormStatus();
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleScrape = (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('url', url);

		startTransition(async () => {
			try {
				const data = await scrapeData(formData);
				setData(data); // ✅ sets data for page display
			} catch (err) {
				console.error('Scrape failed:', err);
			}
		});
	};

	return (
		<form onSubmit={handleScrape}>
			<Box
				display='flex'
				flexDirection='column'
				gap={2}
				maxWidth='500px'
				mx='auto'>
				<TextField
					inputRef={inputRef}
					type='text'
					label='Paste Recipe URL'
					variant='outlined'
					value={url}
					name='url'
					onChange={(e) => setUrl(e.target.value)}
					fullWidth
				/>
				<GetRecipeButton isDisabled={isPending || !url} isPending={isPending} />
			</Box>
		</form>
	);
};

export default RecipeForm;
