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

	async getUser(id) {
		return this.#fetch(`/users/${id}`);
	}

	async getUserCourses(id) {
		return this.#fetch(`/users/${id}/courses`);
	}

	async getUserCourse(id, courseId) {
		return this.#fetch(`/users/${id}/courses/${courseId}`);
	}

	async getUserActivity(id) {
		return this.#fetch(`/users/${id}/activity`);
	}
};
