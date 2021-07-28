import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {NO_AUTHOR_ITEM, ROUTE_ARTICLE_LIST} from '../../constants';
import { getArticle, editArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";
import {getAuthor} from "../../services/authors";

function ArticleEdit(props) {
    const history = useHistory();
    const { articleId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [regions, setRegions] = useState([]);
    const [author, setAuthor] = useState(NO_AUTHOR_ITEM);

    useEffect(() => {
        const fetchArticle = async () => {
            const data = await getArticle(articleId);
            setTitle(data.title);
            setContent(data.content);
            setRegions(data.regions);
            if (data.authorId) {
                const author = await getAuthor(data.authorId)
                setAuthor(author);
            }
        };

        fetchArticle();
    }, [articleId]);

    const handleSave = async () => {
        const payload = { title, content, regions, authorId: author.id };
        await editArticle(articleId, payload);
        history.push(ROUTE_ARTICLE_LIST);
    };

    return (
        <div className="ArticleEdit">
            <h1>Edit Article</h1>
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

export default ArticleEdit;
