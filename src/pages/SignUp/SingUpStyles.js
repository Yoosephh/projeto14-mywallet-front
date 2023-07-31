
import { styled } from "styled-components"

const ROOT_HEIGHT = 150

export const Background = styled.div`
  background: #8C11BE;
  height: var(--ROOT_HEIGHT)
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const FieldName = styled.div`
  background: none;
  border: none;
  color: #FFF;
  text-align: center;
`

export const CustomForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`

const BaseTextStyles = styled.span`
  color: #FFF;
  font-style: normal;
  line-height: normal;
`

export const Title = styled(BaseTextStyles)`
  font-size: 32px;
  font-family: Saira Stencil One;
  font-weight: 400;
  margin: 10px;
`

export const SubTitle = styled(BaseTextStyles)`
  font-size: 15px;
  font-family: Raleway;
  font-weight: 700;
  margin: 20px;
`
