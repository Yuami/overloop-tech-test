import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {ROUTE_AUTHOR_LIST} from '../../constants';
import {createAuthor} from "../../services/authors";

function AuthorCreate() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSave = async () => {
        const payload = { firstName, lastName };
        await createAuthor(payload);
        history.push(ROUTE_AUTHOR_LIST);
    };

    return (
        <div className="AuthorCreate">
            <h1>Create Author</h1>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="firstName">First name</Form.Label>
                    <Form.Control
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={ firstName }
                        onChange={ (event) => setFirstName(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <Form.Control
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={ lastName }
                        onChange={ (event) => setLastName(event.target.value) }
                    />
                </Form.Group>
                <Button variant="primary" onClick={ handleSave }>
                    Save Author
                </Button>
            </Form>
        </div>
    );
}

export default AuthorCreate;
