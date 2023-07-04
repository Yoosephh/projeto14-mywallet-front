import { styled } from "styled-components"
import CustomInput from "../../components/CustomInput/CustomInput"
import { useState } from "react"
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"

export default function SignUp() {

  const [newUser, setNewUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/home")
  }

  return(
  <BackGround>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <h1>MyWallet</h1>
        <div className="nome">
          <CustomInput 
            id={"nome"}
            name={"nome"}
            placeholder={"Nome completo"}
            type={"text"} 
            data_test={"name"} 
            onChangeValue={(name) => setNewUser(prevState =>( {
              ...prevState,
              name
            } ))}/> 
        </div>
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
          message={"Cadastrar"}>
          </CustomButton>
        </div>
      </form>
      <button className="signin" onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</button>
    </div>
  </BackGround>
  )}

const BackGround = styled.div`
  background: #8C11BE;
  .content{
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .signin {
      background: none;
      border: none;
      color: #FFF;
      text-align: center;
    }
    form {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
    }
  }
  h1{
    color: #FFF;
    font-size: 32px;
    font-family: Saira Stencil One;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 10px;
  }
  h2{
    color: #FFF;
    font-size: 15px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 20px;
  }
`