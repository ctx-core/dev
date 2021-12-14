#!/usr/bin/env node
import { getInnerHTML } from 'domutils'
import { readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import { DomHandler, Parser } from 'htmlparser2'
import { resolve } from 'import-meta-resolve'
import { basename, dirname } from 'path'
import { map, sort } from '@ctx-core/array'
import { param_r_ } from '@ctx-core/cli-args'
import { assign, keys } from '@ctx-core/object'
await main()
async function main() {
	const { dir, output_dir } = await opts_()
	const svg_path_a = await globby(`${dir}/svgs/*/*.svg`)
	const component_name_r_html = {}
	await assign_component_name_r_html()
	await write_files()
	async function assign_component_name_r_html() {
		const promise_a = map(svg_path_a, async svg_path => {
			const icon_name = basename(svg_path, '.svg')
			const style = basename(dirname(svg_path)).replace('brands', 'brand')
			const component_name = `FA-${icon_name}-${style}`
			let html
			const handler = new DomHandler((error, dom) => {
				if (error) {
					throw error
				} else {
					const { attribs } = dom[0]
					const { viewbox } = attribs
					const [width, height] = viewbox.split(/ +/g).slice(2)
					assign(attribs, { width, height })
					html = `
<Icon bind:node viewBox="${viewbox}" width="${width}" height="${height}" {...$$props}>${getInnerHTML(dom[0])}</Icon>
					`.trim()
				}
			})
			const parser = new Parser(handler)
			const file_html = await readFile(svg_path)
			parser.write(file_html)
			parser.end()
			component_name_r_html[component_name] = html
		})
		await Promise.all(promise_a)
	}
	async function write_files() {
		const Icon_name_a = sort(keys(component_name_r_html))
		await Promise.all(map(Icon_name_a, Icon_name => {
			writeFile(`${output_dir}/src/${Icon_name}.svelte`, `
<script>
import Icon from './Icon.svelte'
export let node = null
</script>
${component_name_r_html[Icon_name]}
			`.trim())
		}))
	}
}
async function opts_() {
	/**
	 * @typedef refresh_font_awesome_params_r_T
	 * @property {string[]}dir
	 * @property {string[]}output_dir
	 * @property {string[]}help
	 */
	/**
	 * @type refresh_font_awesome_params_r_T
	 */
	const param_r =
		param_r_(process.argv.slice(2), {
			dir_a: '-d, --dir',
			output_dir_a: '-o, --output-dir',
			help: '-h, --help',
		})
	const { dir_a, output_dir_a, help } = param_r
	if (help) {
		console.info(help_msg_())
		process.exit(0)
	}
	const opts_error_a = opts_error_a_({ dir_a, output_dir_a })
	if (opts_error_a) {
		throw opts_error_a.join('\n')
	}
	return {
		dir: dir_a[0],
		output_dir: output_dir_a[0] || new URL(await resolve('../', import.meta.url)).pathname,
	}
}
function help_msg_() {
	return `
Usage: refresh-font-awesome.js -d <dir> -o <output-dir>

Options:

-h, --help        This help message
-d, --dir         Directory containing fontawesome files 
-o, --output-dir  Directory to output generated components to
		`.trim()
}
/**
 * @param dir_a{string[]}
 * @param output_dir_a{string[]}
 * @returns {0|*[]}
 * @private
 */
function opts_error_a_({ dir_a, output_dir_a }) {
	const error_a = []
	if (!dir_a?.length) {
		error_a.push('missing --dir <fontawesome-dir>')
	}
	if (!output_dir_a?.length) {
		error_a.push('missing --output-dir <library-dir>')
	}
	return error_a.length && error_a
}
