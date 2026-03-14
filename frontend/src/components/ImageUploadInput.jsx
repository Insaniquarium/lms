import { useRef, useState, useEffect } from "react";

export function ImageUploadInput({ name, accept = "image/png, image/jpeg, image/webp", alt, defaultUrl }) {
	const inputRef = useRef(null);
	const [image, setImage] = useState(null);
	const imageUrl = image ?? defaultUrl;

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
				{ imageUrl ? (
					<img src={imageUrl} alt={alt}/>
				) : (
					<span>Click to upload image</span>
				)}
			</button>
			<input type="file" name={name} ref={inputRef} accept={accept} onChange={change}/>
		</div>
	);
}
