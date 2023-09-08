import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useSession } from '../middleware/ProtectedRoutes';
import '../style/userpage.css'
import MyNavBar from '../components/navbar';

function UserPage() {
    const session = useSession();
    const fileInput = useRef(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5020/user/${session.userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')?.toString()}`
            }
        })
            .then(response => response.json())
            .then(user => {
                setProfilePicture(user.profilepicture);
            })
            .catch(error => console.error(error));
    }, []);

    const handleUpload = () => {
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:5020/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')?.toString()}`
            },
            body: formData
        })
            .then(response => response.text())
            .then(imageUrl => {
                setProfilePicture(imageUrl);
                setImagePreview(null);
                setShowModal(false);
            })
            .catch(error => console.error(error));
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <>
            <MyNavBar />
            <div className='user-profile-container'>
                <Container>
                    <Row className="mt-3">
                        <Col xs={12} className="d-flex justify-content-center mb-3">
                            <Image className='propic' src={profilePicture} roundedCircle />
                            <Button className="pencil-button" onClick={() => setShowModal(true)}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <div className='username-description text-center'>
                                <h2>{session.username}</h2>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}{session.description}{' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Have a nice gaming, <cite title="Source Title">Staff</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Time for a change?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Your new propic will appear right below!</h5>
                        {imagePreview && (
                            <>
                                <div className='preview-container'>
                                    <Image className="preview-image" src={imagePreview} fluid />
                                </div>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="file" ref={fileInput} onChange={handleFileChange} />
                        <Button onClick={handleUpload}>Carica immagine</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default UserPage;
