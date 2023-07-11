import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"

export default function MainScreen() {
  const {user} = useContext(UserContext)
  const token = user ? user.token : ""
  const name = user ? user.name : ""
  const config = {headers: {Authentication: `Bearer ${token}`}}
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  let total = 0;
  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_API_URL}/home`,"", config)
    .then(res => {
      if(res.data){
        setTransactions(res.data)
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function logOut(){
    localStorage.removeItem("token")
    navigate("/")
  }

  return(
    <Background>
      <Page>
        <Toping>
          <h1 data-test="user-name">Olá, {name}</h1>
          <button onClick={logOut} data-test="logout"><ion-icon name="exit-outline"></ion-icon></button>
        </Toping>
        <Content>
        <ul>
        {transactions.length === 0 ? <div className="MainText">Não há registros de entrada ou saída</div> : transactions.map(transaction => {
          if(transaction.type === "entrada") total += transaction.value
          else total -= transaction.value
          return (
            <li key={transaction.time}>
              <div className="time">{dayjs(transaction.time).format("DD/MM")}</div>
              <div className="description">{transaction.description}</div>
              <div className="value"> {transaction.value.replace(".", ",")}</div>
            </li>
          )
        })}
        </ul>
        </Content>
        <Buttons>

        <button onClick={() => navigate("/nova-transacao/entrada")} data-test="new-income" className="new entry">
          <div className="icon"><ion-icon name="add-circle-outline"></ion-icon></div>
          <div className="text"><h1>Nova</h1> <h1>Entrada</h1></div></button>

        <button data-test="new-expense" onClick={() => navigate("/nova-transacao/saida", {
          state:{tipo: "saída"}
        })} className="new exit">
          <div className="icon"><ion-icon name="remove-circle-outline"></ion-icon></div>
          <div className="text"><h1>Nova</h1> <h1>Saída</h1></div></button>

        </Buttons>
      </Page>
    </Background>
  )
}

const Background = styled.div`
  background: #8C11BE;
  height: 100vh;
`
const Toping = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  h1{
    color: #FFF;
    font-family: Raleway;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  button {
    border: none;
    background: none;
  }
  ion-icon{
    color: #FFFF;
    height: 30px;
    width: 30px;
  }
`
const Content = styled.div`
  border-radius: 5px;
  background: #FFF;
  height: 67vh;
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  ul {
    height: 100%;
  }
  .MainText{
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #868686;
    text-align: center;
    font-size: 20px;
    height: 100%;
  }
  .time {
    color: #C6C6C6;
  }
  .description{
    color: #000;
  }
  .value {
    color: ${(props) => (props.color === "entrada" ? "#03AC00" : "#C70000")};
  }
`
const Buttons = styled.div`
  display: flex;
  gap: 15px;
  button {
    height: 115px;
    border-radius: 5px;
    background: #A328D6;
    border: none;
    color: #FFF;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    justify-content: space-between;
    width: 200px;
    padding: 10px;
    margin-top: 15px;
  }
  .new {
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: left;
  }
`

const Page = styled.div`
  width: calc(100vw - 5%);
  margin: 0 auto;
  padding: 2% 0 2% 0;
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "#03AC00" : "#C70000")};
`;