import { useRef, useState, useEffect } from "react";

export function ImageUploadInput({ name, accept = "image/png, image/jpeg, image/webp", alt, defaultUrl }) {
	const inputRef = useRef(null);
	const [image, setImage] = useState(null);
	const imageUrl = image ?? defaultUrl;

	useEffect(() => {
		return () => { URL.revokeObjectURL(image); };
	}, [image]);

	/**
	 * TODO: Perhaps the image shall be removed on image cancellation, but
	 * React still doesn't support onCancel
	 *
	 * TODO: image gets out of sync with file input when form is cleared, as
	 * change is not fired in that case. All other ways to determine this seem
	 * abysmal to do
	 */
	function change(event) {
		setImage(URL.createObjectURL(event.target.files[0]));
	}

	return (
		<div className="ImageUploadInput">
			<button type="button" onClick={() => inputRef.current.click()}>
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
