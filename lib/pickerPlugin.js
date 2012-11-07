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

var picked, url, w, deferred;

function fun(){
	if (w.closed){
		//check youtube or image
		if(url.indexOf("http://www.youtube.com/watch?v") == -1) {
			//check public-domain-image
			if(url.indexOf("http://www.public-domain-image.com") != -1) {
				var u = url.replace("full-image", "public-domain-images-pictures-free-stock-photos");
				var t = u.indexOf(".jpg");
				url = u.slice(0, t+4);
			}
			//check flickr
			if(url.indexOf("http://www.fotopedia.com/") != -1) {
				var u = url.replace("http://www.fotopedia.com/items/flickr-", "http://images.cdn.fotopedia.com/flickr-");
				url = u.concat("-hd.jpg");
			}
		}
		deferred.resolve(url);
		return;
	}

	setTimeout(function(){
		fun();
	}, 1000);  
}

function createPicker(text) {
	deferred = new orion.Deferred();
	url = '';
	picked = false;
    w = window.open('picker.html', 'color_popup', 'width=800, height=600,scrollbars=0');
	w.focus();
	fun();
	return deferred;
}

window.onload = function() {

	// create the plugin
	var headers = {
		name: "Google Picker for Orion Editor",
		version: "0.2",
		description: "Plugin that provides Google image Picker"
	};
	
	var provider = new orion.PluginProvider(headers);

	// service impl
	var serviceImpl = {
		run: function(selectedText, text, selection) {
			return createPicker(selectedText);
		}
	};
	
	// service props
	var serviceProps = {
		name: "Google Picker",
		key: ["p", true, true]
	};
	
	provider.registerServiceProvider("orion.edit.command", serviceImpl, serviceProps);

	provider.connect();
};