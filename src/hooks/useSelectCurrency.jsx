import styled from "@emotion/styled";
import { useState } from "react";

const Label = styled.label`
    font-size: 2rem;
    color: white;
    display: block;
    font-size: 2.5rem;
    font-weight: 400;
    margin: .5rem 0;
`

const Select = styled.select`
    width: 100%;
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 1.8rem;
    color: white;
    font-weight: 300;
    option{
        font-size: 1.5rem;
    }
`

export const useSelectCurrency = (label, options) => {
    const [state, setState] = useState('');
    const SelectCurrency = () => (
        <>
            <Label>{label}</Label>
            <Select 
            value={state}
            onChange={ e => setState(e.target.value)}>
            <option value="">
                Pick a currency
            </option>
            {options.map((opt)=>(
                <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
            </Select>
        </> 
    
    )
    return [state, SelectCurrency]
}