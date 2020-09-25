import fs from 'fs'
import yaml from 'js-yaml'
import globby from 'globby'
import { dirname, join } from 'path'
import type { project_type } from '@ctx-core/monorepo'
export async function _projects_json() {
	const workspace_yaml_buffer = await fs.promises.readFile('./pnpm-workspace.yaml')
	const doc = yaml.safeLoad(workspace_yaml_buffer)
	const package_json_globs = doc.packages.map(doc_package=>{
		return join('.', doc_package, 'package.json')
	})
	const projects_json = await Promise.all(
		(await globby(package_json_globs)).map(package_path=>{
			return _project_json(package_path)
		})
	)
	return projects_json
}
async function _project_json(package_json_path) {
	const package_json_buffer = await fs.promises.readFile(package_json_path)
	const package_json_str = package_json_buffer.toString()
	const package_json = JSON.parse(package_json_str)
	const package_name = package_json.name
	const package_version = package_json.version
	const package_dir = dirname(package_json_path)
	return {
		package_name,
		package_version,
		package_dir,
	} as project_type
}
