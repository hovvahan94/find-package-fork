import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getForks } from '../../reducers/forks/forksSlice';
import { selectForksStatus } from '../../reducers/forks/forksSlice';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';



function SearchField() {
    const history = useHistory();
    const dispatch = useDispatch();
    const status = useSelector(selectForksStatus);
    const [searchValue, setSearchValue] = useState('');
    const { search } = useLocation();


    const validate = (arr, owner, repoName) => {
        // regex validation


        if (arr.length === 2 && owner !== "" && repoName !== "") {
            const regex = /:\w+\/:\w+/g;
            return regex.test(searchValue)
        }

        return false
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            if (status !== 'pending') { // ste pending@ ira missian chi katarum
                const arr = searchValue.split('/')
                const owner = arr[0] && arr[0].trim();
                const repoName = arr[1] && arr[1].trim();

                if (validate(arr, owner, repoName)) {

                    dispatch(getForks({ owner: owner.slice(1), repoName: repoName.slice(1) })).then(() => {
                        history.push('/search')
                    })

                }
                else {
                    alert('Input is not valid')
                }
            }
        }
    }

    useEffect(() => {
        const { page, owner, repository } = queryString.parse(search)

        

        if (page && owner && repository)
        {
            console.log(page, owner, repository)
            dispatch(getForks({ owner, repoName: repository, page }))
            
        }

    }, []);

    return (
        <Box display="flex" justifyContent="center" marginBottom={10}>
            <TextField
                fullWidth
                size='small'
                id="outlined-search"
                label="Search field"
                type="search"
                variant="outlined"
                placeholder=':owner/:repositoryName'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown} />
        </Box>
    )
}

export default SearchField
