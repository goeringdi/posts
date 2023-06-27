import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Offcanvas, Container } from 'react-bootstrap';

function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <div className="ms-auto">
            <Button variant="outline-success" onClick={handleToggle}>Меню</Button>
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={isMenuOpen} onHide={handleToggle} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="me-auto flex-column">
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', marginBottom: '20px', backgroundColor: 'gray' }}></div>
            <p>Диана</p>
            <p>diana@example.com</p>
            <Nav.Link as={Link} to="/">Список постов</Nav.Link>
            <Nav.Link as={Link} to="/about-me">Обо мне</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomNavbar;
