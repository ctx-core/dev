#!/usr/bin/env node
const { _projects_json } = require('../_projects_json')(async () => {
    console.info(await _projects_json());
})();
