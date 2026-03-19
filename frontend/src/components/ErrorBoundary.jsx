import { Component } from "react";

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, info) {

	}

	render() {
		return this.state.hasError ? this.props.fallback : this.props.children;
	}
}
