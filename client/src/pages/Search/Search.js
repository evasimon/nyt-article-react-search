import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import openSocket from 'socket.io-client';
const socket = openSocket();

class Search extends Component {
    state = {
        topic: "",
        startYear: "",
        endYear: "",
        result: []
    }

    componentDidMount() {
        socket.on('article', function (title) {
            // console.log('article title saved: ' + title);
            alert('Article title saved: ' + title);
        });
    }

    searchArticles = event => {
        event.preventDefault();
        API.search(this.state.topic, this.state.startYear, this.state.endYear)
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
        }).then(() => {
            socket.emit('articleSaved', title);
        }).catch(err => console.log(err));
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
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h2 className="mb-3">Search for New Article</h2>
                            <form>
                                <Input name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="Topic (required)" required />
                                <Input name="startYear" value={this.state.startYear} onChange={this.handleInputChange} placeholder="Start Year" />
                                <Input name="endYear" value={this.state.endYear} onChange={this.handleInputChange} placeholder="End Year" />
                                <FormBtn onClick={this.searchArticles}>Search Article</FormBtn>
                            </form>
                        </Jumbotron>
                    </Col>
                    <Col size="md-12">
                        <Jumbotron>
                            <h2>Search Result</h2>

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
                                    <p>No Results to Display</p>
                                )}
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search;