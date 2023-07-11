import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

export default function MainScreen() {
  const { user } = useContext(UserContext);
  const token = user ? user.token : "";

  const name = user ? user.name : "";

  const config = {headers: { Authorization: `Bearer ${token}` }};
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  
  let total = 0;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/home`, config)
      .then((res) => {
        console.log(token)
        if (res.data) {
          setTransactions(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <Background>
      <Page>
        <Toping>
          <h1 data-test="user-name">Olá, {name}</h1>
          <button onClick={logOut} data-test="logout">
            <ion-icon name="exit-outline"></ion-icon>
          </button>
        </Toping>
        <Content>
          {transactions.length === 0 ? (
            <div className="MainText">
              Não há registros de entrada ou saída
            </div>
          ) : (
            <div className="transaction">
              {transactions.map((transaction) => {
                if (transaction.type === "entrada") total += transaction.value;
                else total -= transaction.value;
                return (
                  <ul key={transaction.time}>
                    <li>
                      <div className="time">
                        {dayjs(transaction.time).format("DD/MM")}
                      </div>
                      <div className="description">{transaction.description}</div>
                      <div className={transaction.type}>
                        {transaction.value.toFixed(2).toString().replace(".", ",")}
                      </div>
                    </li>
                  </ul>
                );
              })}
              <div className="foot">
                <div className="saldo"><strong>SALDO</strong></div>
                <div className={Number(total) >0 ? "entrada" : "saida"} data-test="total-amount">
                  {total.toFixed(2).replace(".", ",")}
                </div>
              </div>
            </div>
          )}
        </Content>
        <Buttons>
          <button
            onClick={() => navigate("/nova-transacao/entrada")}
            data-test="new-income"
            className="new entry"
          >
            <div className="icon">
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div className="text">
              <h1>Nova</h1> <h1>Entrada</h1>
            </div>
          </button>
  
          <button
            data-test="new-expense"
            onClick={() => navigate("/nova-transacao/saida")}
            className="new exit"
          >
            <div className="icon">
              <ion-icon name="remove-circle-outline"></ion-icon>
            </div>
            <div className="text">
              <h1>Nova</h1> <h1>Saída</h1>
            </div>
          </button>
        </Buttons>
      </Page>
    </Background>
  );
}

const Background = styled.div`
  background: #8c11be;
  height: 100vh;
`;
const Toping = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  h1 {
    color: #fff;
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
  ion-icon {
    color: #ffff;
    height: 30px;
    width: 30px;
  }
`;
const Content = styled.div`
  border-radius: 5px;
  background: #fff;
  height: 67vh;
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
  .transaction{
    display: flex;
    flex-direction: column;
  }
  .foot {
    position: absolute;
    bottom: 2%;
    left: 2%;
    display: flex;
    justify-content: space-between;
  }
  ul {
    height: 100%;
  }
  .MainText {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #868686;
    text-align: center;
    font-size: 20px;
    height: 100%;
  }
  .time {
    color: #c6c6c6;
  }
  .description {
    color: #000;
  }
  .entrada {
    color: #03AC00;
  }
  .saida {
    color: #C70000;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 15px;
  button {
    height: 115px;
    border-radius: 5px;
    background: #a328d6;
    border: none;
    color: #fff;
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
`;

const Page = styled.div`
  width: calc(100vw - 5%);
  margin: 0 auto;
  padding: 2% 0 2% 0;
`;
