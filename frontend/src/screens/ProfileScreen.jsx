import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [ message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails;
console.log(user)
    const userLogin = useSelector((state)=> state.userLogin)
    const userUpdateProfile = useSelector((state)=> state.userUpdateProfile)
    const { success } = userUpdateProfile
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                console.log(user.name)
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, history, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        // Dispatch Update Profile
        }

    }

    return (
       <Row>
           <Col md={3}>
           <h1> Sign Up</h1>
            {message & <Message variant='danger'>{message}</Message>}
            { error && <Message variant='danger'>{error}</Message>}
            { success && <Message variant='success'>Profile Updated</Message>}

            <Form onSubmit={submitHandler}>
            <Form.Group controllerId='name'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controllerId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controllerId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controllerId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
            </Form>
           </Col>
           <Col md={9}>
<h2>My Orders</h2>
           </Col>
       </Row>
    )
}

export default ProfileScreen;
