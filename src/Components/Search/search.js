import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '../Icons';
import { useRef, useState } from 'react';



function Search() {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    const handleChange = (e) => setSearchValue(e.target.value);
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    return (
        <div className='search'>
            <input ref={inputRef} value={searchValue} spellCheck={false} placeholder="Tìm kiếm..." onChange={handleChange} />
            {!!searchValue && (
                <button className='clear' onClick={handleClear}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}

            <button className='search-btn'>
                <SearchIcon />
            </button>
        </div>
    );
}

export default Search;
