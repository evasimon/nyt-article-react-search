import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import openSocket from 'socket.io-client';


class Saved extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        const socket = openSocket();
        this.loadSavedArticles();
        const self = this;
        socket.on('article', function (title) {
            // console.log('article title saved: ' + title);
            alert('article title saved: ' + title);
            self.loadSavedArticles();
        });
    }

    loadSavedArticles = () => {
        API.getArticles()
            .then(res => {
                this.setState({
                    articles: res.data
                })
            })
            .catch(err => console.log(err))
    }

    deleteArticle = (id) => {
        API.deleteArticle(id)
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <p className="App-intro">
                                Title Saved: {this.state.title}
                            </p>
                            <h2>My Favorite Articles</h2>
                            {this.state.articles.length ? (
                                <List>
                                    {this.state.articles.map(article => (
                                        <ListItem key={article._id}>
                                            <a href={article.url}>
                                                <strong>
                                                    {article.title}
                                                </strong>
                                            </a>
                                            <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;