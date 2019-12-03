import {
	_quote as _quote__fetch,
	_marketcap as _marketcap__fetch,
	_peRatio as _peRatio__fetch,
} from '@ctx-core/iex/fetch'
export async function _quote({ ticker }) {
  return _quote__fetch({ ticker })
}
export async function _marketcap({ ticker }) {
  return _marketcap__fetch({ ticker })
}
export async function _peRatio({ ticker }) {
  return _peRatio__fetch({ ticker })
}
