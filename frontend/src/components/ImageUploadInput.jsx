import { useRef, useState, useEffect } from "react";

const blankImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function ImageUploadInput({ name, accept }) {
	const inputRef = useRef(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		return () => { URL.revokeObjectURL(image); };
	}, [image]);

	// Perhaps the image shall be removed on image cancellation, but React still doesn't support onCancel
	function change(event) {
		setImage(URL.createObjectURL(event.target.files[0]));
	}

	return (
		<div className="ImageUploadInput">
			<button onClick={() => inputRef.current.click()}>
				<img src={image ? image : blankImage}/>
				{ !image && <span>Click to upload image</span> }
			</button>
			<input type="file" name={name} ref={inputRef} accept={accept} onChange={change}/>
		</div>
	);
}
