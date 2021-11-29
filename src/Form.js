import React  from "react";

const FormContext = React.createContext();

export class Form extends React.Component {
    state = {values: {}};

    handleSubmit = () => {
        if (this.props.onSubmit) this.props.onSubmit(this.state.values);
    }

    handleChange = (name, value) => {
        this.setState(state => ({
            values: {
                ...state.values,
                [name]: value
            }
        }));
    }

    handleReset = () => {
        this.setState({values: {}});
    }

    render() {
        return <FormContext.Provider value={{
            values: this.state.values,
            onSubmit: this.handleSubmit,
            changeValue: this.handleChange,
            clearValues: this.handleReset
        }}>
            <div>{this.props.children}</div>
        </FormContext.Provider>
    }
}

export class ResetButton extends React.Component {
    render() {
        return <FormContext.Consumer>
            {(formContext) => {
                return <button onClick={formContext.clearValues}>{this.props.children}</button>
            }}
        </FormContext.Consumer>;
    }
}

export class SubmitButton extends React.Component {
    render() {
        return <FormContext.Consumer>
            {(formContext) => {
                return <button onClick={formContext.onSubmit}>{this.props.children}</button>
            }}
        </FormContext.Consumer>;
    }
}


export class TextInput extends React.Component {
    onKeyPress = (event, callback) => {
        if (event.charCode === 13) {
            callback();
        }
    }

    handleChange = (event, callback) => {
        callback(this.props.name, event.target.value)
    }

    render() {
        return <FormContext.Consumer>
            {formContext => (
                <input
                    onKeyPress={(event) => this.onKeyPress(event, formContext.onSubmit)}
                    onChange={ (event) => this.handleChange(event, formContext.changeValue)}
                    value={formContext.values[this.props.name] || ""}
                    placeholder={this.props.placeholder}
                    type="text"
                    name={this.props.name}
                />
            )}
        </FormContext.Consumer>;
    }
}