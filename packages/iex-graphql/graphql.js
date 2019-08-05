import { gql } from '@ctx-core/graphql'
//@formatter:off
export const type__RefDataSymbol = gql`
	type RefDataSymbol {
		symbol: String
		name: String
		date: String
		type: String
		iexId: String
		region: String
		currency: String
		isEnabled: Boolean
	}
`
export const type__Quote = gql`
	type Quote {
		symbol: String
		companyName: String
		calculationPrice: String
		open: Float
		openTime: Float
		close: Float
		closeTime: Float
		high: Float
		low: Float
		latestPrice: Float
		latestSource: String
		latestTime: String
		latestUpdate: Float
		latestVolume: Float
		iexRealtimePrice: Float
		iexRealtimeSize: Float
		iexLastUpdated: Float
		delayedPrice: Float
		delayedPriceTime: Float
		extendedPrice: Float
		extendedChange: Float
		extendedChangePercent: Float
		extendedPriceTime: Float
		previousClose: Float
		change: Float
		changePercent: Float
		iexMarketPercent: Float
		iexVolume: Float
		avgTotalVolume: Float
		iexBidPrice: Float
		iexBidSize: Float
		iexAskPrice: Float
		iexAskSize: Float
		marketCap: Float
		week52High: Float
		week52Low: Float
		ytdChange: Float
	}
`
export const typeDefs = gql`
	${type__RefDataSymbol}
	${type__Quote}
`
//@formatter:on
export const resolvers = {}
