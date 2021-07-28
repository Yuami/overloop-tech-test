import React from "react";
import '@testing-library/react';
import ArticleCreate from "./ArticleCreate";
import {render} from "@testing-library/react";
import {listAuthors} from "../../services/authors";

jest.mock("../../services/authors")
const authors = []

describe('ArticleCreate', () => {
    it('should have an author input', () => {
        listAuthors.mockReturnValueOnce(authors)
        const component = render(<ArticleCreate/>)
        const author = component.getByLabelText('Author');
        expect(author).toBeInTheDocument();
    });
})