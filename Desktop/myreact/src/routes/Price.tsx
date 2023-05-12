import {useQuery} from 'react-query';
import {fetchCoinHistory} from '../api';
import ApexChart from 'react-apexcharts';
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Price({coinId}: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
    console.log(data);
    return (
        <div>
            {isLoading ? (
                'loading...'
            ) : (
                <ApexChart
                    type="bar"
                    series={[
                        {
                            name: 'Price',
                            data: data?.map(price => Number(price.close)) ?? [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: 'dark',
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: 'transparent',
                        },
                        grid: {show: false},
                        stroke: {
                            curve: 'smooth',
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            categories: data?.map(price => price.time_close),
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {gradientToColors: ['yellow'], stops: [0, 100]},
                        },
                        colors: ['green'],
                    }}
                />
            )}
        </div>
    );
}

export default Price;
