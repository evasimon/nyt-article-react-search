import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";


class Saved extends Component {
    state = {
        articles: []
    }
    componentDidMount() {
        this.loadSavedArticles();
        // this.searchArticles("Donald Trump");
    }

    loadSavedArticles = () => {
        console.log("get articles")

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
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>My Favorite Articles</h1>
                        </Jumbotron>
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
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Saved;