import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import SearchField from '../../components/search/SearchField';
import TableOfResults from '../../components/table/TableOfResults';


function Search() {
    return (
        <Container maxWidth='md'>
            <SearchField/>
            <TableOfResults />
        </Container>
    )
}

export default Search
