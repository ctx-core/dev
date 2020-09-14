import fs from 'fs';
import yaml from 'js-yaml';
import glob from 'glob';
import { promisify } from 'util';
export async function _projects_json() {
    const projects_json = [];
    const workspace_yaml_buffer = await fs.promises.readFile('./pnpm-workspace.yaml');
    const doc = yaml.safeLoad(workspace_yaml_buffer);
    const glob_async = promisify(glob);
    for (const doc_package of doc.packages) {
        const dirs = await glob_async(doc_package);
        const package_projects_json = await Promise.all(dirs.map(package_path => _project_json(package_path, 'production')));
        projects_json.push(...package_projects_json);
    }
    return projects_json;
}
async function _project_json(projectFolder, reviewCategory) {
    const package_json_buffer = await fs.promises.readFile(`${projectFolder}/package.json`);
    const package_json_str = package_json_buffer.toString();
    const package_json = JSON.parse(package_json_str);
    const packageName = package_json.name;
    return {
        packageName,
        projectFolder,
        reviewCategory
    };
}
