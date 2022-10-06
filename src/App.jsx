import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import cryptoImage from './assets/crypto.jpg';
import { Form } from './components/Form';
import { Results } from './components/Results';
import BounceLoader from 'react-spinners/BounceLoader';

function App() {

  const cssOverrides = {
    margin: '2rem auto'
}

  const [formCurrencies, setFormCurrencies] = useState({});
  const [quoteResult, setQuoteResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (Object.keys(formCurrencies).length !== 0){
      setLoading(true);
      const {stateCurrency, cryptoCurrency} = formCurrencies;
      let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${stateCurrency}`;
      const quoteCrypto = async () => {
        let data = await fetch(url);
        let res = await data.json();
        setQuoteResult(res.DISPLAY[cryptoCurrency][stateCurrency]);
        setLoading(false);
      }
      quoteCrypto();
    }
  },[formCurrencies]);
  
  const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  font-size: 3rem;
  text-align: center;
  &::after{
    content: '';
    background-color: #88c8ec;
    display: block;
    width: 30%;
    height: 3px;
    margin: auto;
  }
  `

  const Container = styled.div`
    max-width: 900px;
    margin: 5rem auto 0;
    width: 90%;
    @media(min-width: 900px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
  `

  const Image = styled.img`
    width: 100%;
    object-fit: cover;
    display: block;
  `


  return (
    <Container>
      <Image 
      src={cryptoImage}
      alt="Crypto image"/>
      <div>
        <Heading>
          Quote your crypto <br/> Instantly  
        </Heading>
        <Form setFormCurrencies={setFormCurrencies}/>
        {loading ? 
          <BounceLoader color="#77c3f0" size="80" cssOverride={cssOverrides}/> 
          : quoteResult && quoteResult.PRICE && <Results results={quoteResult} loading={loading}/>
        }
      </div>
    </Container>
  )
}

export default App
