"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
// Load in the generated settings file
const pnpmfileSettings = require('./pnpmfileSettings.json');
// We will require semver from this path on disk, since this is the version of semver shipping with Rush
const semver = require(pnpmfileSettings.semverPath);
// Only require the client pnpmfile if requested
const clientPnpmfile = pnpmfileSettings.useClientPnpmfile
    ? require('./clientPnpmfile')
    : undefined;
// Set the preferred versions on the dependency map. If the version on the map is an allowedAlternativeVersion
// then skip it. Otherwise, check to ensure that the common version is a subset of the specified version. If
// it is, then replace the specified version with the preferredVersion
function setPreferredVersions(dependencies) {
    for (const name of Object.keys(dependencies || {})) {
        if (pnpmfileSettings.allPreferredVersions.hasOwnProperty(name)) {
            const preferredVersion = pnpmfileSettings.allPreferredVersions[name];
            const version = dependencies[name];
            if (pnpmfileSettings.allowedAlternativeVersions.hasOwnProperty(name)) {
                const allowedAlternatives = pnpmfileSettings.allowedAlternativeVersions[name];
                if (allowedAlternatives && allowedAlternatives.indexOf(version) > -1) {
                    continue;
                }
            }
            let isValidRange = false;
            try {
                isValidRange = !!semver.validRange(preferredVersion) && !!semver.validRange(version);
            }
            catch (_a) {
                // Swallow invalid range errors
            }
            if (isValidRange && semver.subset(preferredVersion, version)) {
                dependencies[name] = preferredVersion;
            }
        }
    }
}
const pnpmfileShim = {
    hooks: {
        // Call the original pnpmfile (if it exists)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterAllResolved: (lockfile, context) => {
            return clientPnpmfile && clientPnpmfile.hooks && clientPnpmfile.hooks.afterAllResolved
                ? clientPnpmfile.hooks.afterAllResolved(lockfile, context)
                : lockfile;
        },
        // Set the preferred versions in the package, then call the original pnpmfile (if it exists)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        readPackage: (pkg, context) => {
            setPreferredVersions(pkg.dependencies);
            setPreferredVersions(pkg.devDependencies);
            setPreferredVersions(pkg.optionalDependencies);
            return clientPnpmfile && clientPnpmfile.hooks && clientPnpmfile.hooks.readPackage
                ? clientPnpmfile.hooks.readPackage(pkg, context)
                : pkg;
        }
    }
};
module.exports = pnpmfileShim;
//# sourceMappingURL=PnpmfileShim.js.map