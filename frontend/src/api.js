export class HTTPError extends Error {
	constructor(status, statusText) {
		super(`HTTP ${status}: ${statusText}`);
		this.status = status;
		this.statusText = statusText;
	}
};

export class HTTPUnauthorisedError extends HTTPError {

};

export class API {
	static ORIGIN = "http://localhost:8000/api/v1";
	#token;

	constructor(token = null) {
		this.#token = token;
	}

	async #fetch(path, method = "GET", body = null, options = {}) {
		options.headers ??= {};

		if (body !== null) {
			options.headers["Content-Type"] = "application/json";
			options.body = JSON.stringify(body);
		}

		if (this.#token !== null) {
			options.headers["Authorization"] = `Token ${this.#token}`;
		}

		const response = await fetch(this.constructor.ORIGIN + path, {
			...options,
			method,
			headers: {
				"Accept": "application/json",
				...options.headers
			}
		});

		// TODO: Should provide response JSON/Text to exception
		if (response.status === 401)
			throw new HTTPUnauthorisedError(response.status, response.statusText);

		if (!response.ok)
			throw new HTTPError(response.status, response.statusText);

		if (response.headers.get("Content-Type") === "application/json")
			return await response.json();

		return await response.text();
	}

	token() {
		return this.#token;
	}

	async login(email, password) {
		return this.#fetch("/login", "POST", { email, password });
	}

	async getUsers() {
		return this.#fetch("/users", "GET");
	}

	async createUser(data) {
		return this.#fetch("/users", "POST", data);
	}

	async getUser(id) {
		return this.#fetch(`/users/${id}`, "GET");
	}

	async patchUser(id, data) {
		return this.#fetch(`/users/${id}`, "PATCH", data);
	}

	async deleteUser(id) {
		return this.#fetch(`/users/${id}`, "DELETE");
	}

	async getUserCourses(id) {
		return this.#fetch(`/users/${id}/courses`, "GET");
	}

	async getUserCourse(id, courseId) {
		return this.#fetch(`/users/${id}/courses/${courseId}`, "GET");
	}

	// But no /users/${id}/courses/${courseId}/modules?

	async getUserActivity(id) {
		return this.#fetch(`/users/${id}/activity`, "GET");
	}

	async getCourses() {
		return this.#fetch("/courses", "GET");
	}

	async createCourse(data) {
		return this.#fetch("/courses", "POST", data);
	}

	async getCourse(id) {
		return this.#fetch(`/courses/${id}`, "GET");
	}

	async patchCourse(id, data) {
		return this.#fetch(`/courses/${id}`, "PATCH", data);
	}

	async deleteCourse(id) {
		return this.#fetch(`/courses/${id}`, "DELETE");
	}

	async getCourseModules(id) {
		return this.#fetch(`/courses/${id}/modules`, "GET");
	}

	async createCourseModule(id, data) {
		return this.#fetch(`/courses/${id}/modules`, "POST", data);
	}

	async getCourseModule(id, moduleId) {
		return this.#fetch(`/courses/${id}/modules/${moduleId}`, "GET");
	}

	async patchCourseModule(id, moduleId, data) {
		return this.#fetch(`/courses/${id}/modules/${moduleId}`, "PATCH", data);
	}

	async deleteCourseModule(id, moduleId) {
		return this.#fetch(`/courses/${id}/modules/${moduleId}`, "DELETE");
	}

	async getCourseEnrolments(id) {
		return this.#fetch(`/courses/${id}/enrolments`, "GET");
	}

	async createCourseEnrolment(id, userId) {
		return this.#fetch(`/courses/${id}/enrolments`, "POST", { user_id: userId });
	}

	async deleteCourseEnrolment(id, userId) {
		return this.#fetch(`/courses/${id}/enrolments/${userId}`, "DELETE");
	}
};
