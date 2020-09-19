# Setting up a new project

https://pnpm.js.org/en/workspaces

## Troubleshooting

### Cannot find shrinkwrap entry dependency

``` 
ERROR: Internal Error: Cannot find shrinkwrap entry dependency "package-name" for workspace project: workspace-name
You have encountered a software defect. Please consider reporting the issue to the maintainers of this application.
```

or

```
  Missing dependency "package" (^1.0.6) required by "workspace"
```

```
rush purge
rush update
```

### ERROR Cannot resolve package from workspace because opts.workspacePackages is not defined

https://github.com/pnpm/pnpm/issues/2874

### ERROR No matching version found for package@* inside the workspace

```
rm pnpm-lock.yaml
```
