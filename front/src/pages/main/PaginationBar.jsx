import React from 'react';
import { Pagination } from "antd";


const PaginationBar = ({ total, currentPage, pageSize, paginate }) => (
    <Pagination
        total={total}
        responsive
        current={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 50, 100]}
        showSizeChanger
        onChange={paginate}
        style={{ padding: '40px' }}
    />
);

export default PaginationBar;