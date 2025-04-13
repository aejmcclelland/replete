'use client';
import { useFormStatus } from 'react-dom';
import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface GetRecipeButtonProps {
	isPending: boolean;
	isDisabled: boolean;
}

const GetRecipeButton: React.FC<GetRecipeButtonProps> = ({
	isPending,
	isDisabled,
}) => {
	return (
		<Button
			variant='contained'
			color='secondary'
			type='submit'
			disabled={isPending || isDisabled}
			fullWidth
			sx={{
				paddingY: 1.5,
				fontSize: '1.1rem',
				fontWeight: 600,
				fontFamily: 'Roboto',
			}}>
			{isPending ? (
				<CircularProgress size={24} color='inherit' />
			) : (
				'Get Recipe'
			)}
		</Button>
	);
};

export default GetRecipeButton;
