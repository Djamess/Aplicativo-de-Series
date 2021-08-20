import React from 'react'
import { Text, View, Button, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

import FormRow from '../components/FormRow'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyAfqtfwW4J9Dz8dfROgOkKberkpV2w-nWQ",
            authDomain: "aplicativo-series.firebaseapp.com",
            projectId: "aplicativo-series",
            storageBucket: "aplicativo-series.appspot.com",
            messagingSenderId: "270848913729",
            appId: "1:270848913729:web:f3d1a481a3fda8716ab1c0"
        };
        //Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        })
    }

    tryLogin() {
        this.setState({ isLoading: true })
        const { mail, password } = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(user => {
                this.setState({ message: "Login efetuado com sucesso!" })
            })
            .catch(error => {
                this.setState({
                    message: this.getMessageByErrorCode(error.code)
                })
            })
            .then(() => this.setState({ isLoading: false }))
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta'
            case 'auth/invalid-email':
                return 'Usuário não encontrado'
            default:
                return 'Erro desconhecido'
        }
    }

    renderMessage() {
        const { message } = this.state
        if (!message)
            return null
        else
            return (
                <View>
                    <Text>
                        {message}
                    </Text>
                </View>
            )
    }
    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />
        return (
            <Button
                title="Entrar"
                onPress={() => this.tryLogin()}
            />
        )
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <FormRow first>
                    <TextInput
                        placeholder="E-mail: "
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>

                <FormRow last>
                    <TextInput
                        placeholder="Senha: "
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                {this.renderButton()}
                {this.renderMessage()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
})