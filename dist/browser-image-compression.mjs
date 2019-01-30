function getDataUrlFromFile(e){return new Promise(function(t,n){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){t(r.result)},r.onerror=n})}function getFilefromDataUrl(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise(function(r){for(var i,a=e.split(","),o=a[0].match(/:(.*?);/)[1],s=atob(a[1]),c=s.length,m=new Uint8Array(c);c--;)m[c]=s.charCodeAt(c);try{i=new File([m],t,{type:o})}catch(e){(i=new Blob([m],{type:o})).name=t,i.lastModified=n}r(i)})}function loadImage(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})}function drawImageInCanvas(e){var t;return(t="function"==typeof OffscreenCanvas?new OffscreenCanvas(e.width,e.height):document.createElement("canvas")).getContext("2d").drawImage(e,0,0,t.width,t.height),t}function drawFileInCanvas(e){return new Promise(function(t,n){var r,i,a=function $Try_2_Post(){try{return i=drawImageInCanvas(r),t([r,i])}catch(e){return n(e)}},o=function $Try_2_Catch(t){try{return getDataUrlFromFile(e).then(function(e){try{return loadImage(e).then(function(e){try{return r=e,a()}catch(e){return n(e)}},n)}catch(e){return n(e)}},n)}catch(e){return n(e)}};try{return createImageBitmap(e).then(function(e){try{return r=e,a()}catch(e){return o()}},o)}catch(e){o()}})}function canvasToFile(e,t,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise(function(a,o){var s;return e instanceof OffscreenCanvas?e.convertToBlob({type:t,quality:i}).then(function(e){try{return(s=e).name=n,s.lastModified=r,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o):getFilefromDataUrl(e.toDataURL(t,i),n,r).then(function(e){try{return s=e,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o);function $If_4(){return a(s)}})}function getExifOrientation(e){return new Promise(function(t){var n=new FileReader;n.onload=function(e){var n=new DataView(e.target.result);if(65496!=n.getUint16(0,!1))return t(-2);for(var r=n.byteLength,i=2;i<r;){if(n.getUint16(i+2,!1)<=8)return t(-1);var a=n.getUint16(i,!1);if(i+=2,65505==a){if(1165519206!=n.getUint32(i+=2,!1))return t(-1);var o=18761==n.getUint16(i+=6,!1);i+=n.getUint32(i+4,o);var s=n.getUint16(i,o);i+=2;for(var c=0;c<s;c++)if(274==n.getUint16(i+12*c,o))return t(n.getUint16(i+12*c+8,o))}else{if(65280!=(65280&a))break;i+=n.getUint16(i,!1)}}return t(-1)},n.readAsArrayBuffer(e)})}function handleMaxWidthOrHeight(e,t,n){var r=t.getContext("2d"),i=n.maxWidthOrHeight,a=Number.isInteger(i)&&(e.width>i||e.height>i);return a?e.width>e.height?(t.width=i,t.height=e.height/e.width*i):(t.width=e.width/e.height*i,t.height=i):(t.width=e.width,t.height=e.height),r.drawImage(e,0,0,t.width,t.height),[t,a]}function followExifOrientation(e,t,n){var r=t.getContext("2d"),i=e.width,a=e.height;switch(4<n&&n<9?(t.width=a,t.height=i):(t.width=i,t.height=a),n){case 2:r.transform(-1,0,0,1,i,0);break;case 3:r.transform(-1,0,0,-1,i,a);break;case 4:r.transform(1,0,0,-1,0,a);break;case 5:r.transform(0,1,1,0,0,0);break;case 6:r.transform(0,1,-1,0,a,0);break;case 7:r.transform(0,-1,-1,0,a,i);break;case 8:r.transform(0,-1,1,0,0,i)}return r.drawImage(e,0,0),t}function compress(e,t){return new Promise(function(n,r){var i,a,o,s,c,m,f,u,l;return i=t.maxIteration||10,a=1024*t.maxSizeMB*1024,e.size<=a&&void 0===t.maxWidthOrHeight?n(e):drawFileInCanvas(e).then(function(h){try{return o=(m=h)[0],s=m[1],f=handleMaxWidthOrHeight(o,s,t),s=f[0],c=f[1],e.size<=a&&!c?n(e):new Promise(function(n,r){var i;if(!(i=t.exifOrientation))return getExifOrientation(e).then(function(e){try{return i=e,$If_2.call(this)}catch(e){return r(e)}}.bind(this),r);function $If_2(){return n(i)}return $If_2.call(this)}).then(function(c){try{return t.exifOrientation=c,s=followExifOrientation(o,s,t.exifOrientation),u=1,canvasToFile(s,e.type,e.name,e.lastModified,u).then(function(t){try{var c=function $If_3(){return n(l)};if(l=t,"image/png"===e.type){var m,f=function $Loop_4(){return i--&&l.size>a?(s.width*=.9,s.height*=.9,s.getContext("2d").drawImage(o,0,0,s.width,s.height),canvasToFile(s,e.type,e.name,e.lastModified,u).then(function(e){try{return l=e,$Loop_4}catch(e){return r(e)}},r)):[1]},h=function $Loop_4_exit(){return c.call(this)};return(m=function(e){for(;e;){if(e.then)return void e.then(m,r);try{if(e.pop){if(e.length)return e.pop()?h.call(this):e;e=f}else e=e.call(this)}catch(e){return r(e)}}}.bind(this))(f)}var g,d=function $Loop_6(){return i--&&l.size>a?(s.width*=.9,s.height*=.9,s.getContext("2d").drawImage(o,0,0,s.width,s.height),u*=.9,canvasToFile(s,e.type,e.name,e.lastModified,u).then(function(e){try{return l=e,$Loop_6}catch(e){return r(e)}},r)):[1]},p=function $Loop_6_exit(){return c.call(this)};return(g=function(e){for(;e;){if(e.then)return void e.then(g,r);try{if(e.pop){if(e.length)return e.pop()?p.call(this):e;e=d}else e=e.call(this)}catch(e){return r(e)}}}.bind(this))(d)}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)})}var e,t=0;var n=function createWorker(e){return new Worker(URL.createObjectURL(new Blob(["(".concat(e,")()")])))}(function(){self.addEventListener("message",function(e){return new Promise(function(t,n){var r,i,a,o,s=e.data;r=s.file,i=s.id,a=s.imageCompressionLibUrl,o=s.options;var c=function $Try_1_Post(){try{return t()}catch(e){return n(e)}},m=function $Try_1_Catch(e){try{return self.postMessage({error:e.message,id:i}),c()}catch(e){return n(e)}};try{var f;return importScripts(a),imageCompression(r,o).then(function(e){try{return f=e,self.postMessage({file:f,id:i}),c()}catch(e){return m(e)}},m)}catch(e){m(e)}})})});function compressOnWebWorker(r,i){return new Promise(function(a,o){return new Promise(function(s,c){e||(e=function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    function imageCompression (){return (".concat(imageCompression,").apply(null, arguments)}\n    \n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile,"\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl,"\n    imageCompression.loadImage = ").concat(imageCompression.loadImage,"\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas,"\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas,"\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile,"\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation,"\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight,"\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation,"\n    \n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    ")));var m=t++;return n.addEventListener("message",function handler(e){e.data.id===m&&(n.removeEventListener("message",handler),e.data.error&&o(e.data.error),a(e.data.file))}),n.postMessage({file:r,id:m,imageCompressionLibUrl:e,options:i}),s()})})}function imageCompression(e,t){return new Promise(function(n,r){var i,a;if(t.maxSizeMB=t.maxSizeMB||Number.POSITIVE_INFINITY,t.useWebWorker="boolean"!=typeof t.useWebWorker||t.useWebWorker,!(e instanceof Blob||e instanceof File))return r(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return r(new Error("The file given is not an image"));if(a="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!t.useWebWorker||"function"!=typeof Worker||a)return compress(e,t).then(function(e){try{return i=e,$If_3.call(this)}catch(e){return r(e)}}.bind(this),r);var o=function(){try{return $If_3.call(this)}catch(e){return r(e)}}.bind(this),s=function $Try_1_Catch(n){try{return console.error("run compression in web worker failed",n),compress(e,t).then(function(e){try{return i=e,o()}catch(e){return r(e)}},r)}catch(e){return r(e)}};try{return compressOnWebWorker(e,t).then(function(e){try{return i=e,o()}catch(e){return s(e)}},s)}catch(e){s(e)}function $If_3(){try{i.name=e.name,i.lastModified=e.lastModified}catch(e){}return n(i)}})}imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation;export default imageCompression;
//# sourceMappingURL=browser-image-compression.mjs.map
