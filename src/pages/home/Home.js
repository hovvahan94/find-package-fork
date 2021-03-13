import React from 'react';
import { Container } from '@material-ui/core';
import SearchField from '../../components/search/SearchField';
import { Typography } from '@material-ui/core';

function Home({searchValue, setSearchValue}) {
    return (
        <Container maxWidth='xs'>
            <Typography align='center' color='primary' variant='h1'>HELLO!</Typography>
            <SearchField/>
        </Container>
    )
}

export default Home
