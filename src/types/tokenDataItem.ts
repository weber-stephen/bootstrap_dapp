interface MetricAggregation {
    sums: any;
    trends: {
        "1d": number,
        "7d": number,
        "30d": number,
        "90d": number,
        "180d": number,
        "365d": number,
    };
    values: {
        "ath": number,
        "atl": number,
        "max": number,
        "latest": number,
    },
    changes: {
        "1d": number,
        "7d": number,
        "30d": number,
        "90d": number,
        "180d": number,
        "365d": number,
    },
    averages: {
        "1d": number,
        "7d": number,
        "30d": number,
        "90d": number,
        "180d": number,
        "365d": number,
    }
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