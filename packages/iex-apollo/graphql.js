const gql = require('graphql-tag')
const { makeExecutableSchema } = require('graphql-tools')
import {
	_quote,
	_marketcap,
	_peRatio,
} from './lib'
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
//@formatter:off
export const typeDefs = gql`
	type Query {
		_quote(ticker: String): Quote
		_marketcap(ticker: String): Float
		_peRatio(ticker: String): Float
	}
	${type__Quote}
`
//@formatter:on
export const resolvers = {
	Query: {
		async _quote(_, { ticker }) {
			return _quote({ ticker })
		},
		async _marketcap(_, { ticker }) {
			return _marketcap({ ticker })
		},
		async _peRatio(_, { ticker }) {
			return _peRatio({ ticker })
		},
	},
}
export const schema = makeExecutableSchema({ typeDefs, resolvers })
