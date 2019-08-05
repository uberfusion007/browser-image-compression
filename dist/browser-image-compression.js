/**
 * Browser Image Compression
 * v1.0.6
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).imageCompression=n()}(this,function(){"use strict";function _slicedToArray(e,n){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArrayLimit(e,n){var r=[],t=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(t=(o=s.next()).done)&&(r.push(o.value),!n||r.length!==n);t=!0);}catch(e){i=!0,a=e}finally{try{t||null==s.return||s.return()}finally{if(i)throw a}}return r}(e,n)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var e="undefined"!=typeof window&&window.cordova&&window.cordova.require("cordova/modulemapper"),CustomFile=e&&e.getOriginalSymbol(window,"File")||File,CustomFileReader=e&&e.getOriginalSymbol(window,"FileReader")||FileReader;function getDataUrlFromFile(e){return new Promise(function(n,r){var t=new CustomFileReader;t.onload=function(){return n(t.result)},t.onerror=function(e){return r(e)},t.readAsDataURL(e)})}function getFilefromDataUrl(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise(function(t){for(var i=e.split(","),a=i[0].match(/:(.*?);/)[1],o=atob(i[1]),s=o.length,c=new Uint8Array(s);s--;)c[s]=o.charCodeAt(s);var u=new Blob([c],{type:a});u.name=n,u.lastModified=r,t(u)})}function loadImage(e){return new Promise(function(n,r){var t=new Image;t.onload=function(){return n(t)},t.onerror=function(e){return r(e)},t.src=e})}function drawImageInCanvas(e){var n=_slicedToArray(getNewCanvasAndCtx(e.width,e.height),2),r=n[0];return n[1].drawImage(e,0,0,r.width,r.height),r}function drawFileInCanvas(e){return new Promise(function(n,r){var t,i,a=function $Try_1_Post(){try{return i=drawImageInCanvas(t),n([t,i])}catch(e){return r(e)}},o=function $Try_1_Catch(n){try{return getDataUrlFromFile(e).then(function(e){try{return loadImage(e).then(function(e){try{return t=e,a()}catch(e){return r(e)}},r)}catch(e){return r(e)}},r)}catch(e){return r(e)}};try{return createImageBitmap(e).then(function(e){try{return t=e,a()}catch(e){return o()}},o)}catch(e){o()}})}function canvasToFile(e,n,r,t){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise(function(a,o){var s;return"function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas?e.convertToBlob({type:n,quality:i}).then(function(e){try{return(s=e).name=r,s.lastModified=t,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o):getFilefromDataUrl(e.toDataURL(n,i),r,t).then(function(e){try{return s=e,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o);function $If_4(){return a(s)}})}function getExifOrientation(e){return new Promise(function(n,r){var t=new CustomFileReader;t.onload=function(e){var r=new DataView(e.target.result);if(65496!=r.getUint16(0,!1))return n(-2);for(var t=r.byteLength,i=2;i<t;){if(r.getUint16(i+2,!1)<=8)return n(-1);var a=r.getUint16(i,!1);if(i+=2,65505==a){if(1165519206!=r.getUint32(i+=2,!1))return n(-1);var o=18761==r.getUint16(i+=6,!1);i+=r.getUint32(i+4,o);var s=r.getUint16(i,o);i+=2;for(var c=0;c<s;c++)if(274==r.getUint16(i+12*c,o))return n(r.getUint16(i+12*c+8,o))}else{if(65280!=(65280&a))break;i+=r.getUint16(i,!1)}}return n(-1)},t.onerror=function(e){return r(e)},t.readAsArrayBuffer(e)})}function handleMaxWidthOrHeight(e,n){var r,t=e.width,i=e.height,a=n.maxWidthOrHeight,o=e;if(Number.isInteger(a)&&(t>a||i>a)){var s=_slicedToArray(getNewCanvasAndCtx(t,i),2);o=s[0],r=s[1],t>i?(o.width=a,o.height=i/t*a):(o.width=t/i*a,o.height=a),r.drawImage(e,0,0,o.width,o.height)}return o}function followExifOrientation(e,n){var r=e.width,t=e.height,i=_slicedToArray(getNewCanvasAndCtx(r,t),2),a=i[0],o=i[1];switch(4<n&&n<9?(a.width=t,a.height=r):(a.width=r,a.height=t),n){case 2:o.transform(-1,0,0,1,r,0);break;case 3:o.transform(-1,0,0,-1,r,t);break;case 4:o.transform(1,0,0,-1,0,t);break;case 5:o.transform(0,1,1,0,0,0);break;case 6:o.transform(0,1,-1,0,t,0);break;case 7:o.transform(0,-1,-1,0,t,r);break;case 8:o.transform(0,-1,1,0,0,r)}return o.drawImage(e,0,0,r,t),a}function getNewCanvasAndCtx(e,n){var r,t;try{t=(r=new OffscreenCanvas(e,n)).getContext("2d")}catch(e){t=(r=document.createElement("canvas")).getContext("2d")}return r.width=e,r.height=n,[r,t]}function compress(e,n){return new Promise(function(r,t){var i,a,o,s,c,u;return i=n.maxIteration||10,a=1024*n.maxSizeMB*1024,drawFileInCanvas(e).then(function(f){try{var m=_slicedToArray(f,2);return m[0],o=handleMaxWidthOrHeight(o=m[1],n),new Promise(function(r,t){var i;if(!(i=n.exifOrientation))return getExifOrientation(e).then(function(e){try{return i=e,$If_2.call(this)}catch(e){return t(e)}}.bind(this),t);function $If_2(){return r(i)}return $If_2.call(this)}).then(function(f){try{return n.exifOrientation=f,o=followExifOrientation(o,n.exifOrientation),s=1,canvasToFile(o,n.fileType||e.type,e.name,e.lastModified,s).then(function(f){try{var m,l=function $Loop_3(){if(i--&&u.size>a){var r,c,f,m=_slicedToArray(getNewCanvasAndCtx(r=.9*o.width,c=.9*o.height),2);return f=m[0],m[1].drawImage(o,0,0,r,c),"image/jpeg"===e.type&&(s*=.9),canvasToFile(f,n.fileType||e.type,e.name,e.lastModified,s).then(function(e){try{return u=e,o=f,$Loop_3}catch(e){return t(e)}},t)}return[1]},g=function $Loop_3_exit(){return r(u)};return(c=f).size<=a?r(c):(u=c,(m=function(e){for(;e;){if(e.then)return void e.then(m,t);try{if(e.pop){if(e.length)return e.pop()?g.call(this):e;e=l}else e=e.call(this)}catch(e){return t(e)}}}.bind(this))(l))}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)})}var n,r=0;var t=function createWorker(e){return new Worker(URL.createObjectURL(new Blob(["(".concat(e,")()")])))}(function(){var e=!1;self.addEventListener("message",function(n){return new Promise(function(r,t){var i,a,o,s,c=n.data;i=c.file,a=c.id,o=c.imageCompressionLibUrl,s=c.options;var u=function $Try_1_Post(){try{return r()}catch(e){return t(e)}},f=function $Try_1_Catch(e){try{return self.postMessage({error:e.message+"\n"+e.stack,id:a}),u()}catch(e){return t(e)}};try{var m;return e||(importScripts(o),e=!0),imageCompression(i,s).then(function(e){try{return m=e,self.postMessage({file:m,id:a}),u()}catch(e){return f(e)}},f)}catch(e){f(e)}})})});function compressOnWebWorker(e,i){return new Promise(function(a,o){return new Promise(function(s,c){n||(n=function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    function imageCompression (){return (".concat(imageCompression,").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile,"\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl,"\n    imageCompression.loadImage = ").concat(imageCompression.loadImage,"\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas,"\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas,"\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile,"\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation,"\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight,"\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation,"\n\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n\n    getNewCanvasAndCtx = ").concat(getNewCanvasAndCtx,"\n    \n    CustomFileReader = FileReader\n    \n    CustomFile = File\n    \n    function _slicedToArray(arr, n) { return arr }\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    ")));var u=r++;return t.addEventListener("message",function handler(e){e.data.id===u&&(t.removeEventListener("message",handler),e.data.error&&o(new Error(e.data.error)),a(e.data.file))}),t.postMessage({file:e,id:u,imageCompressionLibUrl:n,options:i}),s()})})}function imageCompression(e,n){return new Promise(function(r,t){var i,a;if(n.maxSizeMB=n.maxSizeMB||Number.POSITIVE_INFINITY,n.useWebWorker="boolean"!=typeof n.useWebWorker||n.useWebWorker,!(e instanceof Blob||e instanceof CustomFile))return t(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return t(new Error("The file given is not an image"));if(a="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!n.useWebWorker||"function"!=typeof Worker||a)return compress(e,n).then(function(e){try{return i=e,$If_3.call(this)}catch(e){return t(e)}}.bind(this),t);var o=function(){try{return $If_3.call(this)}catch(e){return t(e)}}.bind(this),s=function $Try_1_Catch(r){try{return console.warn("Run compression in web worker failed:",r,", fall back to main thread"),compress(e,n).then(function(e){try{return i=e,o()}catch(e){return t(e)}},t)}catch(e){return t(e)}};try{return compressOnWebWorker(e,n).then(function(e){try{return i=e,o()}catch(e){return s(e)}},s)}catch(e){s(e)}function $If_3(){try{i.name=e.name,i.lastModified=e.lastModified}catch(e){}return r(i)}})}return imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression});
//# sourceMappingURL=browser-image-compression.js.map
