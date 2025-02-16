import React, { useState } from 'react';
import { Container, Nav, Navbar, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../Redux/Slice/productSlice';
import axios from 'axios';

function Header() {
  const cartProduct = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    checked: '',
  });

  const handleClose = () => {
    setShow(false);
    setShowSignin(false);
  };
  const handleShow = () => setShow(true);

  const handleSigninClick = (e) => {
    e.preventDefault();
    setShowSignin(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowSignin(false);
  };

  const handleCreate = async () => {
    const { email, password, confirmPassword, checked } = userDetails;
    if (checked !== 'on') {
      alert('Please agree to the privacy policy');
    } else {
      if (email && password && confirmPassword && checked) {
        if (password === confirmPassword) {
          const result = await axios.post('https://eatzzyserver.onrender.com/users', {
            email,
            password,
            confirmPassword,
            checked,
          });
          if (result.status >= 200 && result.status < 300) {
            setUserDetails({ email: '', password: '', confirmPassword: '', checked: '' });
          }
          setShowSignin(false);
        } else {
          alert("Passwords don't match");
        }
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = userDetails;
    const result = await axios.get('https://eatzzyserver.onrender.com/users');
    if (result.data.find((user) => user.email === email && user.password === password)) {
      sessionStorage.setItem('Email', JSON.stringify(email));
      handleClose();
    } else {
      alert('Incorrect email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('Email');
    setShowDropdown(false); // Close the dropdown after logout
  };

  const emailObj = JSON.parse(sessionStorage.getItem('Email'));

  return (
    <div className=''>
      <Navbar expand="lg" className="mb-4 " style={{ backgroundColor: '#ffffff' }}>
        <Container>
          <Navbar.Brand href="#home">
            <Link style={{ textDecoration: 'none' }} to={'/'}>
              <h3 className="text-dark">
                <span className="text-dark">Eat</span>
                <span className="text-danger">z</span>
                <span className="orange">z</span>y
              </h3>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="#home" className="orange hov-orange">
                Home
              </Nav.Link>
              <Nav.Link href="#home" className='hov-orange'>Menu</Nav.Link>
              <Nav.Link href="#home" className='hov-orange'>Services</Nav.Link>
              <Nav.Link href="#home " className='hov-orange'>Shop</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex justify-content-end align-items-center">
            <InputGroup className="search">
              <InputGroup.Text id="basic-addon1" className="search">
                <i className="fa-solid fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                className="search"
                onChange={(e) => dispatch(searchProducts(e.target.value))}
                placeholder="search item or restaurant "
                aria-label="search an item or restaurant"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Nav.Link className="fw-bold ps-3">
              <Link to={'/cart'} className="text-success">
                <i className="fa-solid fa-shopping-bag" style={{ fontSize: '20px' }}></i>
              </Link>
            </Nav.Link>
            <Badge className="mt-3 back-orange" style={{ fontSize: '9px' }} pill text="white">
              {cartProduct.length}
            </Badge>
            {emailObj ? (
              <div className="position-relative">
                <button
                  className="btn signin-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                {showDropdown && (
                  <div
                    className="dropdown-menu show p-2"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      zIndex: 1050,
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <p className="dropdown-item mb-2">{emailObj}</p>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn signin-btn" onClick={handleShow}>
                Sign in
              </button>
            )}
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>

      {/* Modal for Login/Signup */}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login-modal"
      >
        <Modal.Body className="p-4 m-0" style={{ borderRadius: '2.5rem' }}>
          <div className="d-flex justify-content-between align-items-center">
            <i className="p-4 fa-solid fa-x close-btn" onClick={handleClose}></i>
            <h5 className="mb-4">{showSignin ? 'Create Account' : 'Login'}</h5>
          </div>
          <div className="d-flex flex-column gap-2 mb-2">
            <input
            style={{height:"35px",outline:"none"}}
              value={userDetails.email}
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
             style={{height:"35px",outline:"none"}}
              value={userDetails.password}
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
            {showSignin && (
              <input
              style={{height:"35px",outline:"none"}}
                placeholder="Confirm Password"
                type="password"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                }
              />
            )}
            {showSignin ? (
              <button className="login-btn" onClick={handleCreate}>
                Create Account
              </button>
            ) : (
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
            )}
          </div>
          <input
            type="checkbox"
            name=""
            id="check"
            onChange={(e) =>
              setUserDetails({ ...userDetails, checked: e.target.value })
            }
          />
          <label className="d-inline ps-2" htmlFor="check">
            By continuing I agree to the terms and conditions
          </label>

          {showSignin ? (
            <p>
              Already have an account?
              <a onClick={handleLoginClick} href="" className="orange">
                Login
              </a>
            </p>
          ) : (
            <p>
              Don't have an account?
              <a onClick={handleSigninClick} href="" className="orange">
                Create
              </a>
            </p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
