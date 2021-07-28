import React from "react";
import {render} from "@testing-library/react";
import AuthorList from "./AuthorList";
import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils"
import {waitForElement} from "@testing-library/dom";
import {listAuthors} from "../../services/authors";

jest.mock("../../services/authors")

const authors = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Alba', lastName: 'Smith'},
    {id: 3, firstName: 'Joan', lastName: 'Fornes'},
]

describe('AuthorList', () => {
    it('should have a title', async () => {
        listAuthors.mockReturnValueOnce(authors)
        await act(async () => {
            const component = render(<AuthorList/>, {wrapper: BrowserRouter})
            await waitForElement(() => component.getByText(authors[0].firstName))
            expect(component.container).toHaveTextContent('Authors')
        })
    })

    it('should display Authors first name and last name', async () => {
        listAuthors.mockReturnValueOnce(authors)
        await act(async () => {
            const component = render(<AuthorList/>, {wrapper: BrowserRouter})
            await waitForElement(() => component.getByText(authors[0].firstName))
            authors.forEach(({firstName, lastName}) => {
                expect(component.container).toHaveTextContent(firstName)
                expect(component.container).toHaveTextContent(lastName)
            })
        })
    });
})