
import { styled } from "styled-components";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function NewTransfer() {
  const {user} = useContext(UserContext)
  const {tipo} = useParams();
  const navigate = useNavigate();
  const [userCurrency, setUserCurrency] = useState({description:"", value:0 , type: tipo})

  function handleSubmit(e) {
    e.preventDefault();
    const token = user ? user.token : "";

    const config = {headers: { Authorization: `Bearer ${token}` }};

    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, userCurrency, config)
    .then(() => navigate("/home"))
    .catch(err => console.log(err.message))
  }

  return (
    <Background>
      <Page>
        <Toping>
              <h1>Nova {tipo}</h1>
        </Toping>
        <Form onSubmit={handleSubmit}>
        <div className="Value">
          <CustomInput
          data_test={"registry-amount-input"}
          type={"text"} 
          name={"currency-field"} 
          id={"currency-field"}
          placeholder={"Valor"}
          onChangeValue={(value) => setUserCurrency(prevState =>({
            ...prevState,
            value
          } ))} />

        </div>
        <div className="Description">
          <CustomInput 
            data_test={"registry-name-input"}
            id={"Description"}
            name={"Description"}
            placeholder={"Descrição"}
            type={"text"}
            onChangeValue={(description) => setUserCurrency(prevState =>( {
              ...prevState,
              description
            } ))}/>

        </div>
        <CustomButton 
          message={`Salvar ${tipo}`}
          data_test={"registry-save"}
          id={"entrar"}
          name={"entrar"} onClick={handleSubmit}>
        </CustomButton>
        </Form>
      </Page>
    </Background>

  )
}

const Toping = styled.div`
  h1{
    margin-top: 10px;
    margin-bottom: 15px;
    color: #FFF;
    font-family: Raleway;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
const Background = styled.div`
  background: #8C11BE;
  height: 100vh;
`
const Page = styled.div`
  width: calc(100vw - 5%);
  margin: 0 auto;
  padding: 2% 0 2% 0;
`
const Form = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  input {
    width: 95%;
  }
  .button{
    width: 95%;
  }
`