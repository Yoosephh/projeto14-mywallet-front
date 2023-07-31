import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton/CustomButton"
import S from './SignUpStyles' 

export default function SignUp() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  function handleSubmit(e) {
    e.preventDefault();

    if (newUser.confirmPassword !== newUser.password) {
      return alert("As senhas precisam ser idênticas!")
    }

    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, newUser)
      .then(res => {
        console.log(res.data)
        navigate("/")})
      .catch(err => {
        if (err.response.status === 422) {
          return alert(err.response.data)
        }
        if (err.response.status === 409) {
          return alert("Usuário já cadastrado no sistema!")
        }
      })
  }

  return(
    <S.Background>
      <S.Content>
        <S.CustomForm onSubmit={handleSubmit}>
          <S.Title>MyWallet</S.Title>
          <S.FieldName>
            <CustomInput 
              id={"nome"}
              name={"nome"}
              placeholder={"Nome completo"}
              type={"text"} 
              data_test={"name"} 
              onChangeValue={(name) => {
                setNewUser(prevState =>( {
                ...prevState,
                name
              } ))}}/> 
          </S.FieldName>
          <div className="email">
            <CustomInput 
            id={"email"}
            name={"email"}
            placeholder={"E-mail"}
            type={"email"} 
            data_test={"email"} 
            onChangeValue={(email) => setNewUser(prevState =>( {
              ...prevState,
              email
            } ))}/> 
          </div>
          <div className="password">
          <CustomInput 
            id={"password"}
            name={"password"}
            placeholder={"Senha"}
            type={"password"} 
            data_test={"password"} 
            onChangeValue={(password) => setNewUser(prevState =>( {
              ...prevState,
              password
            } ))}/> 
          </div>
          <div className="confirmPassword">
          <CustomInput 
            id={"confirmPassword"}
            name={"confirmPassword"}
            placeholder={"Confirme a senha"}
            type={"password"} 
            data_test={"conf-password"} 
            onChangeValue={(confirmPassword) => setNewUser(prevState =>( {
              ...prevState,
              confirmPassword
            } ))}/> 
          </div>
          <div className="signInButton">
            <CustomButton
            data_test={"sign-up-submit"}
            id={"entrar"}
            name={"entrar"}
            message={"Cadastrar"}
            onClick={handleSubmit}>
            </CustomButton>
          </div>
        </S.CustomForm>
        <button className="signin" onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</button>
      </S.Content>
    </S.Background>
  )}
