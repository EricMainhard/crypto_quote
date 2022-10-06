import styled from "@emotion/styled";
import {useSelectCurrency} from "../hooks/useSelectCurrency";
import { currencies } from '../currencies';
import { useEffect, useState } from "react";

const InputSubmit = styled.input`
    background-color: #88c8ec;
    border: none;
    outline: none;
    width: 100%;
    padding: 1rem;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2rem;
    border-radius: .5rem;
    cursor: pointer;
    transition: background-color .3s ease;
    margin-top: .5rem;
    &:hover{
        background-color: #77c3f0;
    }
`

const Error = styled.span`
    color: #f96c6c;
    font-size: 1.5rem;
    display: block;
    text-align: center;
`

export const Form = ({setFormCurrencies}) => {
    
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(false);
    const [stateCurrency, SelectCurrency] = useSelectCurrency('Select currency', currencies);
    const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency('Select crypto', cryptos);
  
    useEffect(()=>{
        let url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        
        const callApi = async () => {
            let data = await fetch(url);
            let res = await data.json();
            let cryptoArray = res.Data.map((crypto)=>{
            let cryptoObj = {
                    id: crypto.CoinInfo.Name, 
                    name: crypto.CoinInfo.FullName
                }
            return cryptoObj
            });
            setCryptos(cryptoArray);
        }
        callApi();
        
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        let quoteObj = {
            stateCurrency,
            cryptoCurrency
        };
        Object.values(quoteObj).includes('') ? setError(true) : setFormCurrencies(quoteObj);
    }

    return (
    <form onSubmit={handleSubmit}>
        <SelectCurrency/>
        <SelectCryptoCurrency/>
        <InputSubmit type="submit" value="Quote"/>
        {error && <Error>Both selects are required</Error>}
    </form>
  )
}
