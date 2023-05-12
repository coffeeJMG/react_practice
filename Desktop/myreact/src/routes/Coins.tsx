import {useEffect, useState} from 'react';
import {useQueries, useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {ThemeProvider, styled} from 'styled-components';
import {fetchCoins} from '../api';
import {Helmet} from 'react-helmet';
import {darkTheme, lightTheme} from '../theme';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    background-color: ${props => props.theme.bgColor};
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    font-size: 20px;
`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;

    a {
        display: flex;
        padding: 20px;
        transition: color 0.2s ease-in;
        align-items: center;
        color: ${props => props.theme.textColor};
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 36px;
    color: ${props => props.theme.accentColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;

interface ICoin {
    id: 'string';
    name: 'string';
    symbol: 'string';
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: 'string';
}

interface ICoinsProps {
    toggleDark: () => void;
}

function Coins({toggleDark}: ICoinsProps) {
    const {isLoading, data} = useQuery<ICoin[]>('allCoins', fetchCoins);

    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('https://api.coinpaprika.com/v1/coins');
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDark}>change mode</button>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map(coin => (
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: {name: coin.name},
                                }}>
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt="text" />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;
