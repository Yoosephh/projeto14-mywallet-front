import { styled } from "styled-components"
import CustomInput from "../../components/CustomInput/CustomInput"
import { useState } from "react"
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [login, setLogin] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  function handleLogin(e) {
    e.preventDefault();
    navigate("/home")
  }
  return(
  <BackGround>
    <div className="content">
      <form onSubmit={handleLogin}>
        <h1>MyWallet</h1>
        <div className="email">
          <CustomInput 
          id={"email"}
          name={"email"}
          placeholder={"E-mail"}
          type={"email"} 
          data_test={"email"} 
          onChangeValue={(email) => setLogin(prevState =>( {
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
          onChangeValue={(password) => setLogin(prevState =>( {
            ...prevState,
            password
          } ))}/> 
        </div>
        <div className="loginButton">
          <CustomButton
          message={"Entrar"}
          data_test={"sign-in-submit"}
          id={"entrar"}
          name={"entrar"}>
          </CustomButton>
        </div>
      </form>
      <button className="signin" onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se!</button>
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