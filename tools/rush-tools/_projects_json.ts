import fs from 'fs'
import yaml from 'js-yaml'
import glob from 'glob'
import { promisify } from 'util'
import { basename } from 'path'
export async function _projects_json() {
	const projects_json = []
	const workspace_yaml_buffer = await fs.promises.readFile('./pnpm-workspace.yaml')
	const doc = yaml.safeLoad(workspace_yaml_buffer)
	for (const doc_package of doc.packages) {
		projects_json.push(...(await promisify(glob)(doc_package)).map(package_path=>
			_project_json(package_path, 'production')
		))
	}
	return projects_json
}
function _project_json(projectFolder, reviewCategory) {
	const package_basename = basename(projectFolder)
	const packageName = `@ctx-core/${package_basename}`
	return {
		packageName,
		projectFolder,
		reviewCategory
	}
}
