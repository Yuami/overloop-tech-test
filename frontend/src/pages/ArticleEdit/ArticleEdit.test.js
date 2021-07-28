import React from "react";
import '@testing-library/react';
import {render} from "@testing-library/react";
import {listAuthors} from "../../services/authors";
import {getArticle} from "../../services/articles";
import ArticleEdit from "./ArticleEdit";
import {BrowserRouter} from "react-router-dom";

jest.mock("../../services/authors")
jest.mock("../../services/articles")

const author = {id: 1, firstName: 'John', lastName: 'Doe'}
const article = { authorId: 1 }

describe('ArticleEdit', () => {
    it('should have an author input', () => {
        getArticle.mockReturnValueOnce(article)
        listAuthors.mockReturnValueOnce([author])
        const component = render(<ArticleEdit/>, { wrapper: BrowserRouter })
        const authorLabel = component.getByLabelText('Author');
        expect(authorLabel).toBeInTheDocument();
    });
})