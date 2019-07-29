import React, { Component } from 'react';

class Pagination extends Component {

    getNumberOfPages() {
        return Math.floor(this.props.numberOfPosts / 16);
    }

    generatePagination() {
        var array = [];
        for (var i = 0; i <= this.getNumberOfPages(); i++) {
            array.push(<li key={i} value={i + 1} className={`page-item ${this.props.currentPage === i + 1 ? "active" : ""}`}><a onClick={(e) => { this.props.setPage(e) }} className="page-link" href="/">{i + 1}</a></li>);
        }
        return array;
    }

    render() {
        return (
            <div className={'pagination text-center'} >
                <ul className="pagination" style={{ margin: '0 auto' }}>
                    {this.generatePagination()}
                </ul>
            </div >
        );
    }
}

export default Pagination;