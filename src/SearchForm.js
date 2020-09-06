import React, { Component } from 'react';
import { Form, Col, Row, Button} from 'react-bootstrap';
import axios from 'axios';

class SearchForm extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            name: "",
            searchByInput: "",
            searchOption: "phoneNumber",
            nameError:"",
            searchByInputError: "",
            submitSuccessMsg : ""
        };
    }

    validateName = () => {
        let nameError = "";

        const regexName = /^[a-zA-Z ]*$/;

        if(!this.state.name)
        {
            nameError = "Name is required!";
        }    
        else if(!regexName.test(this.state.name))
        {
            nameError = "Please enter a valid full name!";
        }

        return nameError;
    };

    validatePhoneNumber = () => {
        let searchByInputError = "";

        if(!this.state.searchByInput)
        {
            searchByInputError = "Phone number is required!";
        }
        else if(this.state.searchByInput.match(/\d/g).length!==10)
        {
            searchByInputError = "Phone number must of 10 digits!";
        }
        return searchByInputError;
    }

    validateEmail = () => {
        let searchByInputError = "";

        // Regex for invalid emails
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!this.state.searchByInput)
        {
            searchByInputError = "Email address is required!";
        }
        else if(!regexEmail.test(this.state.searchByInput.toLowerCase()))
        {
            searchByInputError = "Please enter a valid email address!";
        }
        return searchByInputError;
    }

    resetError = () => {
        this.setState({ nameError: "", searchByInputError: ""});
    }

    resetFormFields = () => {
        this.setState({
            'name': "",
            'searchByInput': "",
            'searchOption': "phoneNumber"
        });
    }

    resetForm = () => {
        this.setState({
            'name': "",
            'searchByInput': "",
            'searchOption': "phoneNumber",
            'nameError' :"",
            'searchByInputError' : "",
            'submitSuccessMsg' : ""
        });
    }

    validate = () => {
        this.resetError();

        let nameError = this.validateName();
        let searchByInputError = (this.state.searchOption === "phoneNumber" ? this.validatePhoneNumber() : this.validateEmail());
        
        if(nameError||searchByInputError)
        {
            this.setState({nameError, searchByInputError});
            return false;
        }
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid) {
            console.log(this.state);
            let data = {
                "name": this.state.name,
                "searchByInput": this.state.searchByInput,
                "searchOption": this.state.searchOption
            };
            axios.post('https://reqres.in/api/users', data)
            .then(response => {
                console.log(response);    
                let submitSuccessMsg = "Form submitted successfully!";
                this.setState({submitSuccessMsg});
                this.resetFormFields();
            })
            .catch(error => {
                console.log(error);
                alert("Oops! Could not submit form data: 505 error");
            });         
        }  
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <section className="margin-5-10">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="name">
                        <Form.Label column sm={2}>
                        Name
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control   
                            type="text"
                            name="name"
                            placeholder="Firstname Lastname"
                            value={this.state.name} 
                            onChange={this.handleChange} 
                            />
                        <span className="text-danger">{this.state.nameError}</span>
                        </Col>
                    </Form.Group>

                    <fieldset>
                        <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Search By
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                            type="radio"
                            label="Phone Number"
                            name="searchOption"
                            id="formSearchByPhoneNumberRadio"
                            value="phoneNumber"
                            checked={this.state.searchOption === "phoneNumber"}
                            onChange={this.handleChange}
                            />
                            <Form.Check
                            type="radio"
                            label="Email Address"
                            name="searchOption"
                            id="formSearchByEmailRadio"
                            value="email"
                            checked={this.state.searchOption === "email"}
                            onChange={this.handleChange}
                            />
                        </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row} controlId="formSearchByInput">
                        <Form.Label column sm={2}>
                        Enter Search By Input
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                            type="text"
                            name="searchByInput"
                            placeholder = {this.state.searchOption === "phoneNumber" ? "9876543210":"name@gmail.com"}
                            value={this.state.searchByInput}
                            onChange={this.handleChange} 
                            />
                        <span className="text-danger">{this.state.searchByInputError}</span>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 2, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                        </Col>
                        <Col sm={2}>
                        <Button onClick={this.resetForm}>Reset</Button>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <span className="text-success">{this.state.submitSuccessMsg}</span>
                        </Col>
                    </Row>
                </Form>
            </section>
        )
    }
}

export default SearchForm;
