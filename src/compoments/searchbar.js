import React, { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (!query.trim()) {
            alert('Vui lòng nhập từ khóa tìm kiếm');
            return;
        }
        setLoading(true);
        window.location.href = `/timkiem?q=${query}`;

        fetch(`http://localhost:3000/admin/timkiem/${query}`)
            .then(res => res.json())
            .then(data => {
                console.log(data); 
            })
            .catch(error => {
                console.error('Error searching:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (

            <div className="right-top-content-search">
                    <input type="text" value={query} onChange={handleInputChange} placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm. . ." />
                    <button onClick={handleSearch} disabled={loading}>
                    {loading ? <i className='bx bx-loader-alt bx-spin'></i> : <i className='bx bx-search-alt'></i>}
                </button>
                </div>
          
    );
}

export default SearchBar;
