/*******************************************************************************
 * @license
 * Copyright (c) 2012 Jakub Kramarz, Marcin Bicz
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: Jakub Kramarz, Marcin Bicz
 * Special thanks: Szymon Brandys from IBM Eclipse Orion Team
 ******************************************************************************/

function getPickerURL() {
	var nonHash = window.location.href.split('#')[0]; //$NON-NLS-0$
	var hostName = nonHash.substring(0, nonHash.length - window.location.pathname.length);
	return hostName + "/GPicker4OEdtr/picker.html";
}

window.onload = function() {

	// create the plugin
	var headers = {
		name: "Google Picker for Orion Editor",
		version: "0.2",
		description: "Plugin that provides Google image Picker"
	};
	
	var provider = new orion.PluginProvider(headers);
	
	var serviceImpl = {
		run : function(text, fullText, selection, fileName) {
			return {uriTemplate: getPickerURL(), width: "600px", height: "400px"};
		}
	};
	
	// service props
	var serviceProps = {
		id: "googlePicker",
		name: "Google Picker",
		key: ["p", true, true]
	};
	
	provider.registerServiceProvider("orion.edit.command", serviceImpl, serviceProps);

	provider.connect();
};