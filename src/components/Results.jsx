import styled from "@emotion/styled";

export const Results = ({results, loading}) => {

    const {
        PRICE, 
        FROMSYMBOL, 
        TOSYMBOL, 
        OPENDAY, 
        HIGHDAY, 
        LOWDAY, 
        CHANGE24HOUR,
        IMAGEURL
    } = results;

    const ResultsList = styled.div`
        color: white;
        padding: 1.5rem;
        border-radius: 1rem;
        margin-top: .5rem;
        display: flex;
        align-items: center;
        column-gap: 2rem;
    `

    const Paragraph = styled.p`
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: .5rem;
        &:nth-child(1){
            font-size: 2.5rem;
        }
        span {
            font-size: 1.5rem;
            font-weight: 400;
        }
    `

    const Image = styled.img`
        width: 125px;
    `

    return (
        <div>  
            <ResultsList>
                <div>
                    <Image src={`http://cryptocompare.com/${IMAGEURL}`}
                    alt={'Crypto compare'}/>
                </div>
                <div>
                    <Paragraph>Price: <span>{PRICE}</span></Paragraph>
                    <Paragraph>From: <span>{FROMSYMBOL}</span></Paragraph>
                    <Paragraph>To: <span>{TOSYMBOL}</span></Paragraph>
                    <Paragraph>Open day price: <span>{OPENDAY}</span></Paragraph>
                    <Paragraph>High day price: <span>{HIGHDAY}</span></Paragraph>
                    <Paragraph>Low day price: <span>{LOWDAY}</span></Paragraph>
                    <Paragraph>Last 24 hours price variation: <span>{CHANGE24HOUR}</span></Paragraph>
                </div>
            </ResultsList>
        </div>
    )
}