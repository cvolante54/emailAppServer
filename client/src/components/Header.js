import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderHeader() {
		console.log('auth', this.props.auth);
		switch (this.props.auth) {
			case false:
				return [
					<li key={1}>
						<a href="/auth/google">Google Sign in</a>
					</li>,
					<li key={2}>
						<a href="/auth/facebook">Facebook Sign in</a>
					</li>
				];
			case null:
				return;
			default:
				return [
					<li key={1}>
						<Link to="/surveys">Surveys</Link>
					</li>,
					<li key={2}>
						<a href="/api/logout">Log out</a>
					</li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Emaily
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderHeader()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
