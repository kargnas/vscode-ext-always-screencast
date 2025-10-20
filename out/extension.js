'use strict';

const vscode = require('vscode');

/**
 * Ensures Screencast Mode is turned on via global settings so that it persists across windows.
 * @returns {Promise<void>}
 */
async function ensureScreencastModeEnabled() {
	const config = vscode.workspace.getConfiguration();
	const current = config.get('screencastMode.enabled');

	if (current === true) {
		return;
	}

	try {
		await config.update('screencastMode.enabled', true, vscode.ConfigurationTarget.Global);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[always-screencast] Failed to enable Screencast Mode automatically: ${message}`);
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	void ensureScreencastModeEnabled();
}

function deactivate() {
	// nothing to clean up
}

module.exports = {
	activate,
	deactivate,
};
