import AWS from 'aws-sdk'
import { _medium } from '@ctx-core/instagram/fetch'
import { _arr__pathname__medium } from './fetch'
import { _created_time } from './lib'
AWS.config.update({
	region: 'us-east-1'
})
const __DocumentClient = new AWS.DynamoDB.DocumentClient()
const TableName = 'media__instagram__mudhoe'
export async function put_all_media() {
	const arr__pathname__medium__current = _arr__pathname__medium()
	const array__promise = []
	for (let i = 0; i < arr__pathname__medium__current.length; i++) {
		const pathname = arr__pathname__medium__current[i]
		const Item = await _Item(pathname)
		array__promise.push(put(pathname, Item))
	}
	return await Promise.all(array__promise)
	async function put(pathname, Item) {
		try {
			await __DocumentClient.put({
				TableName,
				Item,
				ConditionExpression: 'attribute_not_exists(pathname)'
			}).promise()
			console.debug('success!', Item)
		} catch (e) {
			if (e.code != 'ConditionalCheckFailedException') {
				throw e
			}
		}
	}
}
export async function _Item(pathname) {
	const medium = await _medium(pathname)
	const created_time = _created_time(medium)
	const info = {}
	copy('title')
	copy('thumbnail_url')
	copy('thumbnail_width')
	copy('thumbnail_height')
	return {
		pathname,
		created_time,
		info
	}
	function copy(key) {
		if (medium[key]) info[key] = medium[key]
	}
}