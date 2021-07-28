import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {ROUTE_AUTHOR_LIST} from '../../constants';
import {editAuthor, getAuthor} from "../../services/authors";

function AuthorEdit(props) {
    const history = useHistory();
    const { authorId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await getAuthor(authorId);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        };

        fetchAuthor();
    }, [authorId]);

    const handleSave = async () => {
        const payload = { firstName, lastName };
        await editAuthor(authorId, payload);
        history.push(ROUTE_AUTHOR_LIST);
    };

    return (
        <div className="AuthorEdit">
            <h1>Edit Author</h1>
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
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={ handleSave }>
                    Save Author
                </Button>
            </Form>
        </div>
    );
}

export default AuthorEdit;
