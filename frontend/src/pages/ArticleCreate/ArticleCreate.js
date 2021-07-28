import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {NO_AUTHOR_ITEM, ROUTE_ARTICLE_LIST} from '../../constants';
import { createArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";

function ArticleCreate() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [regions, setRegions] = useState([]);
    const [author, setAuthor] = useState(NO_AUTHOR_ITEM);

    const handleSave = async () => {
        const payload = { title, content, regions, authorId: author.id };
        await createArticle(payload);
        history.push(ROUTE_ARTICLE_LIST);
    };

    return (
        <div className="ArticleCreate">
            <h1>Create Article</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (event) => setTitle(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Content"
                        rows="5"
                        value={ content }
                        onChange={ (event) => setContent(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Regions</Form.Label>
                    <RegionDropdown
                        value={ regions }
                        onChange={ (regions) => setRegions(regions) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="author">Author</Form.Label>
                    <AuthorDropdown
                        id="author"
                        value={ author }
                        onChange={ (author) => setAuthor(author) }
                    />
                </Form.Group>
                <Button variant="primary" onClick={ handleSave }>
                    Save Article
                </Button>
            </Form>
        </div>
    );
}

export default ArticleCreate;
