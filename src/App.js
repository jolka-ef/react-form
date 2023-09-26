import React from "react";

import {Form, TextInput, SubmitButton, ResetButton } from "./Form";

export class App extends React.Component {
    handleSubmit = (values) => {
        console.log(values);
        alert('Form values: ' + JSON.stringify(values))
    };

    render() {
        return (
            <div>
                <h1>
                    React form
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <p>
                        <TextInput name="firstName" placeholder="First Name" />{" "}
                        <TextInput name="lastName" placeholder="Last Name" />
                    </p>
                    <p>
                        <SubmitButton>Submit</SubmitButton>
                        <ResetButton>Clear</ResetButton>
                    </p>
                </Form>
            </div>
        );
    }
}