import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar";
import Pagination from '../layout/Pagination';
import { Link } from "react-router-dom";
import dateFormatter from '../utilities/dates'

class Home extends Component {

    state = {
        posts: [],
        numOfPosts: 0,
        currentPage: 1,
        sidebar: { title: "Sidebar", content: "sidebar content" },
    };

    componentDidMount() {
        var urlParams = new URLSearchParams(window.location.search);
        var page = (urlParams.get('page') || 1);

        fetch(`/posts?page=${page}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts: posts.result, numOfPosts: posts.size, currentPage: page }))
    }

    setPage = (event) => {
        event.preventDefault();
        var page = event.target.innerHTML;

        fetch(`/posts?page=${event.target.innerHTML}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts: posts.result, numOfPosts: posts.size, currentPage: page }))
    }

    render() {
        return (
            <React.Fragment>
                <Header heading={"Blog Posts"} />
                <div id={"main"} style={{ textAlign: "left" }}>
                    <div className="pageWrap">
                        <div className={"row"}>
                            <div
                                className="col-md-9 col-sm-12"
                                style={{
                                    marginTop: "15px",
                                    marginBottom: "10px",
                                    columnCount: 2
                                }}
                            >
                                {this.state.posts.map(post => (
                                    <div
                                        key={post._id}
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                        className={"cardLayoutMainPage"}
                                    >
                                        <div>
                                            <Link
                                                style={{ fontSize: "14pt" }}
                                                to={`/article/${post._id}`}
                                            >
                                                <strong>{post.title}</strong>
                                            </Link>
                                            <p>{dateFormatter.format(post.date)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <Sidebar content={this.state.sidebar} />
                            </div>
                        </div>
                        <Pagination numberOfPosts={this.state.numOfPosts} setPage={this.setPage} currentPage={parseInt(this.state.currentPage)} />
                    </div>
                </div>
                <Footer />
            </React.Fragment >
        );
    }
}

export default Home;