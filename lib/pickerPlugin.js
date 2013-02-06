/*******************************************************************************
 * @license
 * Copyright (c) 2012, 2013 Jakub Kramarz, Marcin Bicz
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: Jakub Kramarz, Marcin Bicz
 * Special thanks: Szymon Brandys from IBM Eclipse Orion Team
 ******************************************************************************/

function getPickerURL(query) {
	var nonHash = window.location.href.split('#')[0]; //$NON-NLS-0$
	var hostName = (nonHash.indexOf("/index.html") != -1 ? nonHash.substring(0, nonHash.indexOf("/index.html")) : nonHash);
	return hostName + "/picker.html?query=" + query; //$NON-NLS-0$
}

window.onload = function() {

	// create the plugin
	var headers = {
		name: "Google Picker for Orion Editor",
		version: "0.3",
		description: "Plugin that provides Google image Picker"
	};
	
	var provider = new orion.PluginProvider(headers);
	
	var serviceImpl = {
		run : function(text, fullText, selection, fileName) {
			return {uriTemplate: getPickerURL(text), width: "600px", height: "400px"};
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
