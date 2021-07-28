import {render} from "@testing-library/react";
import React from "react";
import {listArticles} from "../../services/articles";
import ArticleList from "./ArticleList";
import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

jest.mock("../../services/articles")
const articles = [
    {title: 'Article title', author: {firstName: 'John', lastName: 'Doe'}}
]

describe('ArticleList', () => {
    it('should have an author column', () => {
        listArticles.mockReturnValueOnce(articles)
        act(() => {
            const component = render(<ArticleList/>, { wrapper: BrowserRouter })
            const author = component.getByText('Author');
            expect(author).toBeInTheDocument();
        })
    });

    // I don't find a workaround for waiting the useEffect to finish without creating a Loader

    // it('should display authors name for each article', () => {
    //     listArticles.mockReturnValueOnce(articles)
    //     act(() => {
    //         const component = render(<ArticleList/>, { wrapper: BrowserRouter })
    //         articles.forEach((article) => {
    //             const author = component.getByText(getAuthorFullName(article.author));
    //             expect(author).toBeInTheDocument();
    //         })
    //     })
    // })
})