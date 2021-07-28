import React from "react";
import '@testing-library/react';
import AuthorCreate from "./AuthorCreate";
import {fireEvent, render} from "@testing-library/react";


describe('AuthorCreate', () => {
    it('should have a title', function () {
        const component = render(<AuthorCreate/>);
        expect(component.container).toHaveTextContent('Create Author');
    });

    it('should have a form with first name, last name and a button', () => {
        const component = render(<AuthorCreate/>);
        const firstName = component.getByLabelText('First name');
        expect(firstName).toBeInTheDocument();
        const lastName = component.getByLabelText('Last name');
        expect(lastName).toBeInTheDocument();
        const button = component.getByText('Save Author');
        expect(button).toBeInTheDocument()
    });

    it('should submit the form when the button is clicked', () => {
        const mockFn = jest.fn()
        const component = render(<AuthorCreate/>);
        const submitBtn = component.getByText('Save Author')
        submitBtn.onclick = mockFn
        expect(mockFn).toBeCalledTimes(0)
        fireEvent.click(submitBtn)
        expect(mockFn).toBeCalledTimes(1)
    })
})