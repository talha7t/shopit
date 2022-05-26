import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useAlert } from "react-alert";

//importing bootstrap 5 css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../App.css";

function Header() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());

    alert.success("Logged out successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand font-weight-bold d-block">
          SHOP IT
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item dropdown megamenu">
              <a
                id="megamneu"
                href="/"
                // id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle font-weight-bold text-uppercase dropdown-toggle"
              >
                Women
              </a>
              <div
                aria-labelledby="dropdownMenuButton1"
                className="dropdown-menu border-0 p-0 m-0"
              >
                <div className="container">
                  <div className="row bg-white rounded-0 m-0 shadow-sm">
                    <div className="col-lg-7 col-xl-8">
                      <div className="p-4">
                        <div className="row">
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Women
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0"
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Women
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Women
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-xl-4 px-0 d-none d-lg-block megaimaga"></div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown megamenu">
              <a
                id="megamneu"
                href="/"
                // id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="nav-link dropdown-toggle font-weight-bold text-uppercase dropdown-toggle"
              >
                Men
              </a>
              <div
                aria-labelledby="dropdownMenuButton1"
                className="dropdown-menu border-0 p-0 m-0"
              >
                <div className="container">
                  <div className="row bg-white rounded-0 m-0 shadow-sm">
                    <div className="col-lg-7 col-xl-8">
                      <div className="p-4">
                        <div className="row">
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Men
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0"
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Men
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Men
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Unique Features
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Image Responsive
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Auto Carousel
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link text-small pb-0 "
                                >
                                  Newsletter Form
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-xl-4 px-0 d-none d-lg-block megaimaga"></div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link font-weight-bold text-uppercase">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link font-weight-bold text-uppercase">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link font-weight-bold text-uppercase">
                Contact
              </a>
            </li>

            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link font-weight-bold text-uppercase"
              >
                Cart({cartItems.length})
              </Link>
            </li>

            <li className="nav-item">
              {/* if user is logged in display their name and dropdown else display login button*/}
              {user ? (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn dropdown-toggle ps-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user && user.userName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {user && user.userRole !== "admin" ? (
                        <Link className="dropdown-item" to="/orders/me">
                          Orders
                        </Link>
                      ) : (
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      )}
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/me">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-danger"
                        to="/"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                !loading && (
                  <Link
                    to="/login"
                    data-toggle="collapse"
                    className="nav-link font-weight-bold text-uppercase"
                  >
                    Login
                  </Link>
                )
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
