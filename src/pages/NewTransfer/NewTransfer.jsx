
import { styled } from "styled-components";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function NewTransfer() {
  const {user} = useContext(UserContext)
  const location = useLocation();
  const {tipo} = useParams();

  const [userCurrency, setUserCurrency] = useState({description:"", value:"", type: tipo})
  function handleChange(event) {

      const cleanedValue = event.target.value.replace(/\./g, "").replace(",", ".");
      const numericValue = parseFloat(cleanedValue);
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericValue)
      setUserCurrency(prevState =>( {
        ...prevState,
        value: formattedValue
      } ))
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // const cleanedValue = userCurrency.value.replace(/\./g, "");

    // // Replace comma separator with a dot
    // const dotValue = cleanedValue.replace(",", ".");

    // // Parse the dot-separated value as a floating-point number
    // const numericValue = parseFloat(dotValue);

    // // Check if the parsed value is a valid number
    // if (!isNaN(numericValue)) {
    //   // Format the numeric value as currency with decimal places
    //   const formatter = new Intl.NumberFormat("pt-BR", {
    //     style: "currency",
    //     currency: "BRL",
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   });

    //   const formattedValue = formatter.format(numericValue);

      console.log(userCurrency); // Output: R$ 1.234,56

      // axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, {...userCurrency, value: numericValue}, user.token)
    // } else {
    //   console.log("Invalid input value");
    // }
  }

  return (
    <Background>
      <Page>
        <Toping>
              <h1>Nova {tipo}</h1>
        </Toping>
        <Form onSubmit={handleSubmit}>
        <div className="Value">
          <input
          type={"text"} 
          name={"currency-field"} 
          id={"currency-field"}
          placeholder={"Valor"}
          onChange={handleChange}/>
        </div>
        <div className="Description">
          <CustomInput 
            id={"Description"}
            name={"Description"}
            placeholder={"Descrição"}
            type={"text"} 
            data_test={"email"} 
            onChangeValue={(description) => setUserCurrency(prevState =>( {
              ...prevState,
              description
            } ))}/>
        </div>
        <CustomButton 
          message={`Salvar ${tipo}`}
          data_test={"sign-in-submit"}
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
  
`