import { Component } from "react";

// Component imports.
import Navbar from "./Menu";

export default class Layout extends Component {
	render() {
		const { children } = this.props;
		return (
			<div>
				<Navbar />
				<div>{children}</div>
			</div>
		);
	}
}
