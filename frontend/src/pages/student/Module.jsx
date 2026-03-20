import { useTitle, useApi } from "#/hooks";
import { useParams } from "react-router";
import style from "./Module.module.scss";

export default function Module() {
	const {courseID, moduleID} = useParams();
	const [module, req] = useApi(api => api.getCourseModule(courseID, moduleID));

	useTitle(() => module?.title ?? "Module", [module]);

	if (req.pending) return;
	if (req.error) throw req.error;

	return (
		<div className={style.Module}>
			<iframe src={module.content_url} style={{background: "gray"}}></iframe>
		</div>
	);
}
