import React from "react";
import '@testing-library/react';
import AuthorDropdown from "./AuthorDropdown";
import {fireEvent, render} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {prettyDOM, waitForElement} from "@testing-library/dom";
import {listAuthors} from "../../services/authors";
import {getAuthorFullName} from "../../utils/author";
import {NO_AUTHOR_ITEM} from "../../constants";

jest.mock("../../services/authors")

const author = {id: 1, firstName: 'John', lastName: 'Doe'}
const authors = [
    author,
    {id: 2, firstName: 'Alba', lastName: 'Smith'},
]

describe('AuthorDropdown', () => {

    const renderAuthorDropdown = async (component) => {
        const dropdown = component.container.querySelector('.AuthorDropdown').firstChild.firstChild
        await waitForElement(() => {
            fireEvent.click(dropdown)
            return component.getByText(getAuthorFullName(author))
        })
    }

    it('should display all authors full name', async () => {
        listAuthors.mockReturnValueOnce(authors)
        await act(async () => {
            const component = render(<AuthorDropdown/>)
            await renderAuthorDropdown(component)
            expect(component.container).toHaveTextContent(getAuthorFullName(authors[0]))
            expect(component.container).toHaveTextContent(getAuthorFullName(authors[1]))
        })
    })

    it('should display an item for "No author"', async () => {
        listAuthors.mockReturnValueOnce(authors)
        await act(async () => {
            const component = render(<AuthorDropdown/>)
            await renderAuthorDropdown(component)
            expect(component.container).toHaveTextContent(getAuthorFullName(NO_AUTHOR_ITEM))
        })
    })
})