import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Header = styled.header`
  background-color: rgba(1, 1, 20, 0.9);
  padding: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #00bfff;
  text-transform: uppercase;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => (props.light ? '#1b1b1b' : '#121212')};
  color: #e0e0e0;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  color: #00bfff;
`;

const Subtitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #0095ff;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ServiceCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 255, 0.2);
  }
`;

const ServiceImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Footer = styled.footer`
  background-color: #1b1b1b;
  color: #e0e0e0;
  padding: 30px 0;
  text-align: center;
`;

const SocialIcons = styled.div`
  margin-top: 10px;

  a {
    color: #00bfff;
    margin: 0 10px;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: #0095ff;
    }
  }
`;

const services = [
  {
    title: 'Penetration Testing',
    description: 'Identify and fix vulnerabilities in your systems before attackers can exploit them.',
    image: '/1.png',
    link: '/penetration-testing',
  },
  {
    title: 'Vulnerability Assessments',
    description: 'Thorough assessments to discover and address potential security weaknesses.',
    image: 'https://example.com/vulnerability-assessments.jpg',
    link: '/vulnerability-assessments',
  },
  {
    title: 'Security Audits',
    description: 'Comprehensive audits to ensure your organization meets security standards and regulations.',
    image: 'https://example.com/security-audits.jpg',
    link: '/security-audits',
  },
  {
    title: 'Incident Response',
    description: 'Fast and effective response to security breaches to minimize damage and recover swiftly.',
    image: 'https://example.com/incident-response.jpg',
    link: '/incident-response',
  },
  {
    title: 'Compliance Consulting',
    description: 'Expert guidance to help you comply with industry-specific regulations and standards.',
    image: 'https://example.com/compliance-consulting.jpg',
    link: '/compliance-consulting',
  },
  {
    title: 'Security Training',
    description: 'Equip your staff with the knowledge and skills to recognize and prevent cyber threats.',
    image: 'https://example.com/security-training.jpg',
    link: '/security-training',
  },
];

function App() {
  const [token, setToken] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const sceneRef = useRef(null);

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Create a grid of cubes
    const cubes = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i - 5, j - 5, -10);
        scene.add(cube);
        cubes.push(cube);
      }
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.from('.header', { y: -100, opacity: 0, duration: 1, ease: 'power2.out' });

    gsap.utils.toArray('.section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 180%',
          end: 'top 120%',
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray('.service-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });
    });

    return () => {
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setToken(response.data.token);
      setShowLoginModal(false);
      navigate('/enumeration');
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed: ' + err.response.data.error);
    }
  };

  return (
    <>
      <div ref={sceneRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
      <Header className="header">
        <Container>
          <Navbar expand="lg" variant="dark" bg="transparent">
            <Navbar.Brand href="#">
              <Logo>CRAP</Logo>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#team">Team</Nav.Link>
                <Nav.Link href="#contact">Contact Us</Nav.Link>
                <Nav.Link href="#login" onClick={() => setShowLoginModal(true)}>
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Section id="about" className="section">
                <Container>
                  <Title>CRAP SECURITY</Title>
                  <Subtitle>Securing Your Digital Future</Subtitle>
                  <Paragraph>
                    We are a team of experienced cybersecurity experts dedicated to protecting your digital assets.
                  </Paragraph>
                </Container>
              </Section>

              <Section id="services" className="section" light>
                <Container>
                  <Row>
                    {services.map((service, index) => (
                      <Col md={4} key={index}>
                        <ServiceCard className="service-card">
                          <ServiceImage src={service.image} alt={service.title} />
                          <h4>{service.title}</h4>
                          <p>{service.description}</p>
                          <Button variant="outline-primary" href={service.link}>
                            Learn More
                          </Button>
                        </ServiceCard>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Section>

              <Section id="team" className="section">
                <Container>
                  <Title>Our Team</Title>
                  <Subtitle>Meet the Experts</Subtitle>
                  <Paragraph>We are a group of dedicated professionals in cybersecurity.</Paragraph>
                </Container>
              </Section>

              <Section id="contact" className="section" light>
                <Container>
                  <Title>Contact Us</Title>
                  <Subtitle>Get in Touch</Subtitle>
                  <Paragraph>
                    Contact us to learn more about how we can help secure your business.
                  </Paragraph>
                </Container>
              </Section>

              <Footer>
                <Container>
                  <Row>
                    <Col>
                      <p>&copy; 2023 CRAP SECURITY. All rights reserved.</p>
                      <SocialIcons>
                        <a href="https://twitter.com/yourtwitter">
                          <FaTwitter />
                        </a>
                        <a href="https://linkedin.com/yourlinkedin">
                          <FaLinkedin />
                        </a>
                        <a href="https://github.com/yourgithub">
                          <FaGithub />
                        </a>
                      </SocialIcons>
                    </Col>
                  </Row>
                </Container>
              </Footer>
            </>
          }
        />
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
