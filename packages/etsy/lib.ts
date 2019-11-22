import { format__currency } from '@ctx-core/currency'
export function _url__570xN(images__listing__etsy__s3) {
	return images__listing__etsy__s3 && images__listing__etsy__s3.url_570xN
}
export function _src__img(images__listing__etsy__s3) {
	return _url__570xN(images__listing__etsy__s3)
}
export function _title(listing__etsy__s3) {
	return listing__etsy__s3 && listing__etsy__s3.title
}
export function _price(listing__etsy__s3) {
	return listing__etsy__s3 && format__currency(listing__etsy__s3.price, listing__etsy__s3)
}
export function _description(listing__etsy__s3) {
	return listing__etsy__s3 && listing__etsy__s3.description
}
export function _url(listing__etsy__s3) {
	return listing__etsy__s3 && listing__etsy__s3.url
}
