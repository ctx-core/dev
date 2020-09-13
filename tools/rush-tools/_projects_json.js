import glob from 'glob';
import { promisify } from 'util';
import { basename } from 'path';
export async function _projects_json() {
    const projects_json = [];
    projects_json.push(...(await promisify(glob)('packages/*')).map(package_path => _project_json(package_path, 'packages', 'production')));
    projects_json.push(...(await promisify(glob)('tools/*')).map(package_path => _project_json(package_path, 'tools', 'production')));
    return projects_json;
}
function _project_json(package_path, dir, reviewCategory) {
    const package_basename = basename(package_path);
    const packageName = `@ctx-core/${package_basename}`;
    const projectFolder = `${dir}/${package_basename}`;
    return {
        packageName,
        projectFolder,
        reviewCategory
    };
}
