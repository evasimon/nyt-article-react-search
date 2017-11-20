import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Search extends Component {
    state = {
        topic: "",
        result: []
    }

    searchArticles = event => {
        event.preventDefault();
        API.search(this.state.topic)
            .then(res => this.setState({
                result: res.data.response.docs,
                topic: ""
            }, console.log(res.data.response.docs)))
            .catch(err => console.log(err));
    };

    saveArticle = (title, url) => {
        API.saveArticle({
            title: title,
            url: url
        }).then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        // sets the state and rerenders the element
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search for New Article</h1>
                        </Jumbotron>
                        <form>
                            <Input name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="Topic (required)" />
                            <FormBtn onClick={this.searchArticles}>Search Article</FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search Result</h1>
                        </Jumbotron>
                        {this.state.result.length ? (
                            <List>
                                {this.state.result.map(article => (
                                    <ListItem key={article._id}>
                                        <a href={article.web_url}>
                                            <strong>
                                                {article.headline.main}
                                            </strong>
                                        </a>
                                        <SaveBtn onClick={() => this.saveArticle(article.headline.main, article.web_url)} />
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

export default Search;