(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{134:function(e,t,n){"use strict";var a=n(8),c=n.n(a),r=n(47),i=n.n(r),s=n(0),o=n.n(s),l=n(135),f=n.n(l).a.sortBy(["#000000","#ffffff","#c600ff","#4fe3c1","#25d3ff","#f5c7c7","#c191e5","#4890e4","#e2013a"]),u=function(e){var t=e.setBgColor,n=f.map(function(e){return o.a.createElement("li",{className:"list-inline-item p-4 rounded",style:{backgroundColor:e},onClick:function(n){return t(e)}})});return o.a.createElement("ul",{className:"list-inline py-2 m-0"},n)},g={x:0,y:0},m=[0,0],d=[0,0],A=i()({},g),p=1;var h="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";t.a=function(e){var t=e.url,n=e.dzRef,a=e.setDZProps,r=Object(s.useRef)(null),l=Object(s.useState)(i()({},g)),f=c()(l,2),v=f[0],E=f[1],b=Object(s.useState)(i()({},g)),w=c()(b,2),y=w[0],x=w[1],O=Object(s.useState)(1),S=c()(O,2),j=S[0],B=S[1],C=Object(s.useState)([]),R=c()(C,2),k=R[0],N=R[1],P=Object(s.useState)("#ffffff"),J=c()(P,2),L=J[0],z=J[1];Object(s.useEffect)(function(){var e=i()({},g),t=1;if(r.current&&k.length){var n=r.current.getBoundingClientRect();m=[.5*n.width,.5*n.height],d=[.5*k[0],.5*k[1]];var a=[m[0]-d[0],m[1]-d[1]];e.x=a[0],e.y=a[1];var c=k[0]>n.width||k[1]>n.height,s=k[0]>=k[1];c&&(t=s?n.width/k[0]:n.height/k[1])}E(i()({},e)),x(i()({},g)),B(t),A=i()({},e),p=t},[t,k]),Object(s.useEffect)(function(){a({imgSize:k,scale:j,bgColor:L})},[k,j,v,t,r,L]),Object(s.useEffect)(function(){return function(e,t){var n=e.current,a=t.setPos,c=t.setOffset,r=t.setScale,s=t.setLog;if(n){console.log("initPan");var o=new Hammer(n);o.get("pinch").set({enable:!0}),o.on("pinch pinchend",function(e){var t=e.scale,n=(e.isFinal,e.type),a=p*t;"pinchend"===n?p=a:"pinch"===n&&r(a),s({LAST_SCALE:p,scale:t,s:a,type:n})}),o.on("pan",function(e){var t=e.deltaX,n=e.deltaY,r=e.isFinal;c({x:t,y:n}),r&&(A.x=t+A.x,A.y=n+A.y,a(i()({},A)),c(i()({},g)))})}}(r,{setPos:E,setOffset:x,setScale:B,setLog:console.log})},[r]);var F=y.x+v.x,Q=y.y+v.y,U="img-preview "+(y.y||y.x?"dragging":""),D={transform:"translate3d(".concat(F,"px, ").concat(Q,"px, 0) scale3d(").concat(j,", ").concat(j,", ").concat(j,")")};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"img-wrap mx-auto",ref:n,style:{backgroundColor:L}},o.a.createElement("img",{onLoad:function(e){return function(e,t){var n=e.target;t([n.width,n.height])}(e,N)},className:U,src:t||h,style:D,alt:"Preview"}),o.a.createElement("div",{id:"pan-zone",ref:r})),o.a.createElement(u,{setBgColor:z}))}},51:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(134);t.default=function(){return c.a.createElement("div",{className:"p-3"},c.a.createElement(r.a,{url:"https://reactjsexample.com/content/images/2017/08/Beautiful-accessible-drag-and-drop-for-lists-with-React.gif"}))}}}]);