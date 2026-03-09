export class HTTPError extends Error {
	constructor(status, message) {
		super(`HTTP ${status}: ${message}`);
	}
};

export class HTTPUnauthorisedError extends HTTPError {

};

export class API {
	static ORIGIN = "http://localhost:1234/api/v1";
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
			options.headers["Authorization"] = `Bearer ${this.#token}`;
		}

		const response = await fetch(this.constructor.ORIGIN + path, {
			...options,
			method,
			headers: {
				"Accept": "application/json",
				...options.headers
			}
		});

		if (response.status === 401)
			throw new HTTPUnauthorisedError(response.status, response.statusText);

		if (!response.ok)
			throw new HTTPError(response.status, response.statusText);

		if (response.headers.get("Content-Type") === "application/json")
			return await response.json();

		return await response.text();
	}

	authenticated() {
		return this.#token !== null;
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

	async getUserCourses(id) { // query parameter to omit modules?
		return this.#fetch(`/users/${id}/courses`, "GET");
	}

	async getUserCourse(id, courseId) { // query parameter to omit modules?
		return this.#fetch(`/users/${id}/courses/${courseId}`, "GET");
	}

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
};
