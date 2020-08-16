import React, { useState, Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    formWrap: {
        display: 'inline-block',
        padding: '20px 16px',
    },
    submitBtn: {
        marginTop: theme.spacing(2),
    }
}));



const Auth = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [haveAccount, setHaveAccount] = useState(true)
    const [token, setToken] = useState(null)
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const classes = useStyles();

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        // テキストボックスの値を変更する度に、変数に値が格納される
        if (name == 'email') {
            setEmail(value)
        } else if (name == 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = (event) => {
        // 後半のパートでemailとpasswordをfirebaseに登録する処理を追加
        Auth();
        event.preventDefault()
    }
    const handleHaveAccount = () => {
        setHaveAccount(t => !t)
    }
    const Auth = () => {
        //認証データ
        console.log('submit')
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log(authData)
        //Sign in ようのAPIキー
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo'
        if (!haveAccount) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo'
        }
        axios.post(url, authData)
            .then(response => {
                //帰ってきたトークンをローカルストレージに格納する
                localStorage.setItem('token', response.data.idToken)
                setError(null)
                setIsLogin(true)
            })
            .catch(error => {
                console.log('ERROR!!!!!')
                //firebaseで用意されているエラ〜メッセージが格納される
                setError(error.response.data.error.message)
                console.log(error.response.data.error.message)
            })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsLogin(false)
    }

    if (localStorage.getItem('token')) {
    }

    const formWrap = <form method="post" onSubmit={handleSubmit}>
        <div>
            <TextField fullWidth onChange={handleChange} type="text" name='email' label="Email Address" /><br />
            <TextField fullWidth onChange={handleChange} type="password" name='password' label="Password" />
        </div>
        <div>{error}</div>
        <Button fullWidth className={classes.submitBtn} variant="contained" type='submit' color='primary'>
            {haveAccount ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </Button><br />
        <Button color='primary' onClick={handleHaveAccount} size='small'>
            {haveAccount ? 'want to create an account?' : 'have an account already?'}
        </Button>
    </form>;

    return (
        <div>
            {isLogin ?
                <Button variant='contained' onClick={logout}>Logout</Button> :
                <Paper className={classes.formWrap}>{formWrap}</Paper>
            }
        </div>
    )
}

// class Auth extends Component {
//     constructor(props) {
//         super(props)
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
//     handleChange(event) {
//         // テキストボックスの値を変更する度に、変数に値が格納される
//         this.setState({ [event.target.name]: event.target.value })
//     }
//     handleSubmit(event) {
//         // 後半のパートでemailとpasswordをfirebaseに登録する処理を追加
//         event.preventDefault()
//     }

//     render() {
//         return (
//             <div>
//                 <form method="post" onSubmit={this.handleSubmit}>
//                     <div>
//                         <input type="text" name="email" onChange={this.handleChange} /><br />
//                         <input type="password" name="password" onChange={this.handleChange} />
//                     </div>
//                     <button>SUBMIT</button>
//                 </form>
//             </div>
//         )
//     }
// }

export default Auth


// import React, { Component } from 'react'
// import axios from 'axios'

// class Auth extends Component {
//     constructor(props) {
//         super(props)
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.state = {
//             isSignUp: true,
//             token: null,
//             error: ''
//         }
//     }

//     handleChange(event) {
//         this.setState({ [event.target.name]: event.target.value })
//     }

//     handleSubmit(event) {
//         this.auth()
//         event.preventDefault()
//     }

//     switchAuthModeHandler = () => {
//         this.setState({ isSignUp: !this.state.isSignUp })
//     }

//     auth = () => {
//         const authDate = {
//             email: this.state.email,
//             password: this.state.password,
//             returnSecureToken: true
//         }
//         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo'
//         if (this.state.isSignUp) {
//             url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo'
//         }
//         axios.post(url, authDate)
//             .then(response => {
//                 localStorage.setItem('token', response.data.idToken)
//             })
//             .catch(error => {
//                 this.setState({ error: error.response.data.error.message })
//                 console.log(error.response.data.error.message)
//             })
//     }

//     logout = () => {
//         // トークンの削除
//         localStorage.removeItem('token')
//     }

//     render() {
//         return (
//             <div>
//                 <form method="post" onSubmit={this.handleSubmit}>
//                     <div>
//                         <input type="text" name="email" onChange={this.handleChange} /><br />
//                         <input type="password" name="password" onChange={this.handleChange} />
//                     </div>
//                     <div>
//                         {this.state.error}
//                     </div>
//                     <button>SUBMIT</button>
//                 </form>
//                 <button onClick={this.switchAuthModeHandler}>
//                     SWITCH TO {this.state.isSignUp ? 'SignIn' : 'SignUp'}
//                 </button><br />
//                 {/* ログインしている場合だけログアウトボタンが表示される */}
//                 {localStorage.getItem('token') &&
//                     <button onClick={this.logout}>LOGOUT</button>}
//             </div>
//         )
//     }
// }

// export default Auth