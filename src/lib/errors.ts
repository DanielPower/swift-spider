export class InvalidUsernameError extends Error {
	constructor() {
		super("Invalid username");
	}
}

export class UserAlreadyExistsError extends Error {
	constructor() {
		super("User already exists");
	}
}
