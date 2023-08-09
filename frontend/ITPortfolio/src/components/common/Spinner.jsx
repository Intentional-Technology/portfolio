import { Component } from "react";
import { Spinner as ReactSpinner } from "react-bootstrap";

class Spinner extends Component {
	render() {
		return (
			<ReactSpinner animation="border" size={this.props.size || undefined}>
				<span style={{ display: "none" }}>Loading...</span>
				{/* for accessability */}
			</ReactSpinner>
		);
	}
}

export default Spinner;
