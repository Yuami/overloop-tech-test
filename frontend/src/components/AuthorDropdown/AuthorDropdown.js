import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'

import {listAuthors} from "../../services/authors";
import {getAuthorFullName} from "../../utils/author";
import {NO_AUTHOR_ITEM} from "../../constants";

function AuthorDropdown({ value, onChange, ...props }) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            setAuthors([NO_AUTHOR_ITEM, ...data]);
        };

        fetchAuthors();
    }, []);

    return (
        <div className="AuthorDropdown" {...props}>
            <DropdownList
                value={ value }
                data={ authors }
                dataKey="id"
                textField={ (item) => getAuthorFullName(item) }
                onChange={ onChange }
            />
        </div>
    );
}

export default AuthorDropdown;
