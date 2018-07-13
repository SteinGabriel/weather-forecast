import styled from 'styled-components'

export const PageWrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InputWrapper = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

export const SearchInput = styled.input`
  width: 150px;
  height: 20px;
  border-radius: 5px;
`

export const ResultList = styled.div`
  width: 300px;
  heght: auto;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ResultMessage = styled.div`
  width: 250px;
  height: auto;
`

export const ForecastContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const ForecastCard = styled.div`
  width: 100px;
  height: 95%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin-right: 10px;
  border: 1px solid gray;
`

export const CardPrimary = styled.h2`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`
export const CardSecundary = styled.h4`
  width: 100%;
  height: 15px;
  display: flex;
  color: lightgray;
  justify-content: center;
  margin-bottom: 20px;
`

export const WeatherStateRow = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Icon = styled.div`
  height: 18px;
  width: 18px;
`
