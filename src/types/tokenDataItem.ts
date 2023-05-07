interface MetricAggregationItem {
    "1d": number,
    "7d": number,
    "30d": number,
    "90d": number,
    "180d": number,
    "365d": number,
}
interface MetricAggregation {
    sums: any;
    trends: MetricAggregationItem,
    values: {
        "ath": number,
        "atl": number,
        "max": number,
        "latest": number,
    },
    changes: MetricAggregationItem,
    averages: MetricAggregationItem,
}

interface TokenDataItemMetricAggregations {
    price: MetricAggregation;
    tvl: MetricAggregation;
    token_trading_volume: MetricAggregation;
}

export interface TokenDataItem {
    name: string;
    project_id: string;
    logo: string;
    categories: string[];
    metric_aggregations: TokenDataItemMetricAggregations;

}