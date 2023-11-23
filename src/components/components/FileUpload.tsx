import React, {useEffect, useRef, useState} from 'react';
import { Button, Input } from '@mui/material';

/**
 * File Upload Component
 * @author vadim.chilinciuc
 *
 */

function FileUpload({ onChange, value }: any) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<any>(value);

	// Function to handle file selection
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setSelectedFile(file);

		if (onChange) {
			onChange(file);
		}
	};

	if(!value){
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}



	useEffect(() => {
		inputRef.current = document.querySelector("#file-input");

	}, []);



	return (
		<div>
			<Input
				type="file"
				onChange={handleFileSelect}
				style={{ border: '1px solid black' }}
				id="file-input"
			/>
		</div>
	);
}

export default FileUpload;
