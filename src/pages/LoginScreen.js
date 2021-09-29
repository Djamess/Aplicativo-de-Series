import React from 'react'
import { Text, View, Button, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native'
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
                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não', onPress: () => console.log('Usuário não quer criar conta'),
                            style: 'cancel' //IOS
                        }, {
                            text: 'Sim', onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then(user => {
                                        this.setState({ message: 'Sucesso!' })
                                    })
                                    .catch(error => {
                                        this.setState({
                                            message: this.getMessageByErrorCode(error.code)
                                        })
                                    })
                            }
                        }],
                        { cancelable: false }
                    )
                }
                this.setState({
                    message: this.getMessageByErrorCode(error.code)
                })
            })
            .then(() => this.setState({ isLoading: false }))
    }

    register() {
        const { mail, password } = this.state

        firebase
            .auth()
            .createUserWithEmailAndPassword(mail, password)
            .then(user => {
                this.setState({ message: "Cadastro realizado com sucesso!" })
            })


    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta'
            case 'auth/user-not-found':
                return 'Usuário não encontrado'
            case 'auth/weak-password':
                return 'A senha é muito fraca'
            case 'auth/email-already-in-use':
                return 'E-mail já está em uso'
            case 'auth/invalid-email':
                return 'E-mail inválido'
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
                <View style={styles.mensagem}>
                    <Text>
                        {message}
                    </Text>
                </View>
            )
    }

    renderButtonRegister() {
        return (
            <View style={styles.buttonRegister}>
                <Button
                    color="black"
                    title="Cadastrar"
                    onPress={() => this.register()}
                />
            </View>
        )
    }

    renderButtonLogin() {
        if (this.state.isLoading)
            return <ActivityIndicator />
        return (
            <View style={styles.buttonLogin}>
                <Button
                    color="#1E6738"
                    title="Entrar"
                    onPress={() => this.tryLogin()}
                />
            </View>
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

                {this.renderButtonLogin()}
                {this.renderButtonRegister()}
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
    mensagem: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#1E6738',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonLogin: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#1E6738',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonRegister: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF0000'
    }

})