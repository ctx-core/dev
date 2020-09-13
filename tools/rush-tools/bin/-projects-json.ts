#!/usr/bin/env node
import { _projects_json } from '../_projects_json'
(async () => {
	console.info(await _projects_json())
})()
