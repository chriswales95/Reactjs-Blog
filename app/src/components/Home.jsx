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
        sidebar: { title: "Sidebar", content: "sidebar content" },
    };

    componentDidMount() {
        console.log(this.props);
        fetch("/posts")
            .then(res => res.json())
            .then(posts => this.setState({ posts: posts, numOfPosts: posts.length }))

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
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                        className={"cardLayoutMainPage"}
                                        key={this.state.posts.indexOf(post)}
                                    >
                                        <div>
                                            <Link
                                                style={{ fontSize: "14pt" }}
                                                to={`/article/${this.state.posts.indexOf(
                                                    post
                                                )}`}
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
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Home;