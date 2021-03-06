/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var VERSION='2.5.0';
var PLAT = /Android/.exec(navigator.userAgent) ? 'android' : 'ios';

var scripts = document.getElementsByTagName('script');
var currentPath = scripts[scripts.length - 1].src;
var platformCordovaPath = currentPath.replace("cordova.js", "cordova." + PLAT + ".js");
var versionCordovaPath = currentPath.replace("cordova.js", "cordova-" + VERSION + ".js");
var cordovaPath = versionCordovaPath;

(function() {
    // XHR to local file is an error on some platforms, windowsphone for one 
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", platformCordovaPath, false);
        xhr.onreadystatechange = function() {
            if (this.readyState == this.DONE && this.responseText.length > 0) {
                cordovaPath = platformCordovaPath;
            }
        };
        xhr.send(null);
    }
    catch(e){} // access denied!
})();

if (!window._doNotWriteCordovaScript) {
    document.write('<script type="text/javascript" charset="utf-8" src="' + cordovaPath + '"></script>');
}

function backHome() {
	if (window.device && device.platform && device.platform.toLowerCase() == 'android') {
            navigator.app.backHistory();
	}
	else {
	    window.history.go(-1);
	}
}
