import { type rebuildjs_metafile_T } from 'rebuildjs/server'
export const browser__metafile0 = Object.freeze({
	inputs: {
		'../input/path0': {
			'bytes': 224,
			'imports': [],
			'format': 'esm'
		},
	},
	outputs: {
		'dist/browser--dev/index.browser-BRS0BRS0.js.map': {
			'imports': [],
			'exports': [],
			'inputs': {},
			'bytes': 323
		},
		'dist/browser--dev/index.browser-BRS0BRS0.js': {
			'imports': [],
			'exports': [],
			'entryPoint': 'src/app/index.browser.ts',
			'inputs': {
				'../input/path0': {
					'bytesInOutput': 98
				},
			},
			'bytes': 98
		}
	},
	"build_id": "1703841142372-Vl85Mji6Shymq77xc+DZnA",
	"rebuildjs_target": "browser",
}) as rebuildjs_metafile_T
export const server__metafile0 = Object.freeze({
	inputs: {
		'../input/path0': {
			'bytes': 224,
			'imports': [],
			'format': 'esm'
		},
	},
	outputs: {
		'dist/server--dev/index.server-SVR0SVR0.js.map': {
			'imports': [],
			'exports': [],
			'inputs': {},
			'bytes': 323
		},
		'dist/server--dev/index.server-SVR0SVR0.js': {
			'imports': [],
			'exports': [],
			'entryPoint': 'src/app/index.server.ts',
			'cssBundle': 'dist/server--dev/index.server-SVR0SVR0.css',
			'inputs': {
				'../input/path0': {
					'bytesInOutput': 98
				},
			},
			'bytes': 98
		},
		"dist/dev-server/index-OUBLL3JD.js.map": {
			"imports": [],
			"exports": [],
			"inputs": {},
			"bytes": 2000
		},
		"dist/dev-server/index-OUBLL3JD.js": {
			"imports": [],
			"exports": [
				"config__init",
				"default"
			],
			"entryPoint": "src/app/index.ts",
			"inputs": {
				"src/app/index.ts": {
					"bytesInOutput": 811
				}
			},
			"bytes": 811
		},
	},
	"build_id": "1703841142372-Vl85Mji6Shymq77xc+DZnA",
	"rebuildjs_target": "server",
}) as rebuildjs_metafile_T
