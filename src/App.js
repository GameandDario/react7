import React, { Component } from 'react';
import { Container, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import './App.css'



// function App() {
//   return (

//   );
// }

// export default App;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      poster: "",
      comment: "",
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    const url = " http://campus-bordeaux.ovh:3001/api/quests/movies/";

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Your choice is added with ${res} Id !`);
        }
      }).catch(e => {
        console.error(e);
        alert(`Error when data added`);
      });
  }



  render() {

    return (
      <div>

        <Container className="main">
          <h1>What's your favorite movie ?</h1>
          <Form onSubmit={this.submitForm}>
            <FormGroup>
              <Label for="name">Title</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Give the name of your favorite one"
                onChange={this.onChange}
                value={this.state.name}>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="poster">Link to a postermovie</Label>
              <Input
                type="url"
                name="poster"
                id="poster"
                placeholder="Type the url to a poster of your movie"
                onChange={this.onChange}
                value={this.state.poster}>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="comment">Explain your choice</Label>
              <Input
                type="textarea"
                name="comment" id="comment"
                placeholder="Give us the reasons why you really like this movie..."
                onChange={this.onChange}
                value={this.state.comment}>
              </Input>
            </FormGroup>
            <Button>Send your choice !</Button>
          </Form>
        </Container>
      </div>
    )
  }

}
