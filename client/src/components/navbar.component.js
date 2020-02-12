import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../logo.png";

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            errors: {}
        }
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.setState({ loggedIn: true })
            console.log('true')
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({ loggedIn: true })
            console.log('true')
        } else {
            this.setState({ loggedIn: false })
            console.log('false')
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div className="container.fluid" >

                <div className="mx-auto col-xl-11 justify-content-center align-items-center">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="" target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="30" height="30" alt="Team Liquid" />
                        </a>
                        <Link to="/" className="navbar-brand">GeoVid</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                {(this.state.loggedIn && <li className="navbar-item">
                                    <Link to="/upload" className="nav-link">Upload Video</Link>
                                </li>)}
                            </ul>
                            <div>
                            <ul className="navbar-nav mr-auto">
                                    <li className="navbar-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <br />
            </div>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(Navbar);