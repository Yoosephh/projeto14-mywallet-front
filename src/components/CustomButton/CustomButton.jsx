import { styled } from "styled-components"

export default function CustomButton({data_test, message, name, id}) {

  return (
    <Button
    id={id}
    name={name}
    type="submit"
    data-test={data_test}
    >{message}</Button>
  )
}

const Button = styled.button`
  border-radius: 5px;
  background: #A328D6;
  color: #FFF;
  border: none;
  width: 100%;
  height: 45px;
`