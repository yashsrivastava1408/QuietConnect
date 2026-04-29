"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "proxy";
exports.ids = ["proxy"];
exports.modules = {

/***/ "(middleware)/../ExamOracle/node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next%2Fproxy.ts&page=%2Fproxy&rootDir=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next&matchers=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../ExamOracle/node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next%2Fproxy.ts&page=%2Fproxy&rootDir=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next&matchers=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/globals */ \"(middleware)/../ExamOracle/node_modules/next/dist/server/web/globals.js\");\n/* harmony import */ var next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/web/adapter */ \"(middleware)/../ExamOracle/node_modules/next/dist/server/web/adapter.js\");\n/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _proxy_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./proxy.ts */ \"(middleware)/./proxy.ts\");\n/* harmony import */ var next_dist_client_components_is_next_router_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/components/is-next-router-error */ \"(middleware)/../ExamOracle/node_modules/next/dist/client/components/is-next-router-error.js\");\n/* harmony import */ var next_dist_client_components_is_next_router_error__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_is_next_router_error__WEBPACK_IMPORTED_MODULE_3__);\n\n\n// Import the userland code.\n\n\n\nconst mod = {\n    ..._proxy_ts__WEBPACK_IMPORTED_MODULE_2__\n};\nconst page = \"/proxy\";\nconst isProxy = page === '/proxy' || page === '/src/proxy';\nconst handlerUserland = (isProxy ? mod.proxy : mod.middleware) || mod.default;\nclass ProxyMissingExportError extends Error {\n    constructor(message){\n        super(message);\n        // Stack isn't useful here, remove it considering it spams logs during development.\n        this.stack = '';\n    }\n}\n// TODO: This spams logs during development. Find a better way to handle this.\n// Removing this will spam \"fn is not a function\" logs which is worse.\nif (typeof handlerUserland !== 'function') {\n    throw new ProxyMissingExportError(`The ${isProxy ? 'Proxy' : 'Middleware'} file \"${page}\" must export a function named \\`${isProxy ? 'proxy' : 'middleware'}\\` or a default function.`);\n}\n// Proxy will only sent out the FetchEvent to next server,\n// so load instrumentation module here and track the error inside proxy module.\nfunction errorHandledHandler(fn) {\n    return async (...args)=>{\n        try {\n            return await fn(...args);\n        } catch (err) {\n            // In development, error the navigation API usage in runtime,\n            // since it's not allowed to be used in proxy as it's outside of react component tree.\n            if (true) {\n                if ((0,next_dist_client_components_is_next_router_error__WEBPACK_IMPORTED_MODULE_3__.isNextRouterError)(err)) {\n                    err.message = `Next.js navigation API is not allowed to be used in ${isProxy ? 'Proxy' : 'Middleware'}.`;\n                    throw err;\n                }\n            }\n            const req = args[0];\n            const url = new URL(req.url);\n            const resource = url.pathname + url.search;\n            await (0,next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__.edgeInstrumentationOnRequestError)(err, {\n                path: resource,\n                method: req.method,\n                headers: Object.fromEntries(req.headers.entries())\n            }, {\n                routerKind: 'Pages Router',\n                routePath: '/proxy',\n                routeType: 'proxy',\n                revalidateReason: undefined\n            });\n            throw err;\n        }\n    };\n}\nconst handler = (opts)=>{\n    return (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__.adapter)({\n        ...opts,\n        page,\n        handler: errorHandledHandler(handlerUserland)\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n//# sourceMappingURL=middleware.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4uL0V4YW1PcmFjbGUvbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1taWRkbGV3YXJlLWxvYWRlci5qcz9hYnNvbHV0ZVBhZ2VQYXRoPSUyRlVzZXJzJTJGeWFzaHNyaXZhc3RhdmEzMiUyRkRlc2t0b3AlMkZ0YXNrLWJvYXJkLW5leHQlMkZwcm94eS50cyZwYWdlPSUyRnByb3h5JnJvb3REaXI9JTJGVXNlcnMlMkZ5YXNoc3JpdmFzdGF2YTMyJTJGRGVza3RvcCUyRnRhc2stYm9hcmQtbmV4dCZtYXRjaGVycz0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0M7QUFDaUI7QUFDdkQ7QUFDbUM7QUFDOEM7QUFDSTtBQUNyRjtBQUNBLE9BQU8sc0NBQUk7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtDQUFrQyxRQUFRLEtBQUssbUNBQW1DLGlDQUFpQztBQUNoSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsZ0JBQWdCLElBQXFDO0FBQ3JELG9CQUFvQixtR0FBaUI7QUFDckMseUZBQXlGLGlDQUFpQztBQUMxSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0ZBQWlDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxPQUFPLEVBQUM7O0FBRXZCIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwibmV4dC9kaXN0L3NlcnZlci93ZWIvZ2xvYmFsc1wiO1xuaW1wb3J0IHsgYWRhcHRlciB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi9hZGFwdGVyXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyBfbW9kIGZyb20gXCIuL3Byb3h5LnRzXCI7XG5pbXBvcnQgeyBlZGdlSW5zdHJ1bWVudGF0aW9uT25SZXF1ZXN0RXJyb3IgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvZ2xvYmFsc1wiO1xuaW1wb3J0IHsgaXNOZXh0Um91dGVyRXJyb3IgfSBmcm9tIFwibmV4dC9kaXN0L2NsaWVudC9jb21wb25lbnRzL2lzLW5leHQtcm91dGVyLWVycm9yXCI7XG5jb25zdCBtb2QgPSB7XG4gICAgLi4uX21vZFxufTtcbmNvbnN0IHBhZ2UgPSBcIi9wcm94eVwiO1xuY29uc3QgaXNQcm94eSA9IHBhZ2UgPT09ICcvcHJveHknIHx8IHBhZ2UgPT09ICcvc3JjL3Byb3h5JztcbmNvbnN0IGhhbmRsZXJVc2VybGFuZCA9IChpc1Byb3h5ID8gbW9kLnByb3h5IDogbW9kLm1pZGRsZXdhcmUpIHx8IG1vZC5kZWZhdWx0O1xuY2xhc3MgUHJveHlNaXNzaW5nRXhwb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSl7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICAvLyBTdGFjayBpc24ndCB1c2VmdWwgaGVyZSwgcmVtb3ZlIGl0IGNvbnNpZGVyaW5nIGl0IHNwYW1zIGxvZ3MgZHVyaW5nIGRldmVsb3BtZW50LlxuICAgICAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgfVxufVxuLy8gVE9ETzogVGhpcyBzcGFtcyBsb2dzIGR1cmluZyBkZXZlbG9wbWVudC4gRmluZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuXG4vLyBSZW1vdmluZyB0aGlzIHdpbGwgc3BhbSBcImZuIGlzIG5vdCBhIGZ1bmN0aW9uXCIgbG9ncyB3aGljaCBpcyB3b3JzZS5cbmlmICh0eXBlb2YgaGFuZGxlclVzZXJsYW5kICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFByb3h5TWlzc2luZ0V4cG9ydEVycm9yKGBUaGUgJHtpc1Byb3h5ID8gJ1Byb3h5JyA6ICdNaWRkbGV3YXJlJ30gZmlsZSBcIiR7cGFnZX1cIiBtdXN0IGV4cG9ydCBhIGZ1bmN0aW9uIG5hbWVkIFxcYCR7aXNQcm94eSA/ICdwcm94eScgOiAnbWlkZGxld2FyZSd9XFxgIG9yIGEgZGVmYXVsdCBmdW5jdGlvbi5gKTtcbn1cbi8vIFByb3h5IHdpbGwgb25seSBzZW50IG91dCB0aGUgRmV0Y2hFdmVudCB0byBuZXh0IHNlcnZlcixcbi8vIHNvIGxvYWQgaW5zdHJ1bWVudGF0aW9uIG1vZHVsZSBoZXJlIGFuZCB0cmFjayB0aGUgZXJyb3IgaW5zaWRlIHByb3h5IG1vZHVsZS5cbmZ1bmN0aW9uIGVycm9ySGFuZGxlZEhhbmRsZXIoZm4pIHtcbiAgICByZXR1cm4gYXN5bmMgKC4uLmFyZ3MpPT57XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oLi4uYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gSW4gZGV2ZWxvcG1lbnQsIGVycm9yIHRoZSBuYXZpZ2F0aW9uIEFQSSB1c2FnZSBpbiBydW50aW1lLFxuICAgICAgICAgICAgLy8gc2luY2UgaXQncyBub3QgYWxsb3dlZCB0byBiZSB1c2VkIGluIHByb3h5IGFzIGl0J3Mgb3V0c2lkZSBvZiByZWFjdCBjb21wb25lbnQgdHJlZS5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmV4dFJvdXRlckVycm9yKGVycikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBgTmV4dC5qcyBuYXZpZ2F0aW9uIEFQSSBpcyBub3QgYWxsb3dlZCB0byBiZSB1c2VkIGluICR7aXNQcm94eSA/ICdQcm94eScgOiAnTWlkZGxld2FyZSd9LmA7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXEgPSBhcmdzWzBdO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaDtcbiAgICAgICAgICAgIGF3YWl0IGVkZ2VJbnN0cnVtZW50YXRpb25PblJlcXVlc3RFcnJvcihlcnIsIHtcbiAgICAgICAgICAgICAgICBwYXRoOiByZXNvdXJjZSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogT2JqZWN0LmZyb21FbnRyaWVzKHJlcS5oZWFkZXJzLmVudHJpZXMoKSlcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZXJLaW5kOiAnUGFnZXMgUm91dGVyJyxcbiAgICAgICAgICAgICAgICByb3V0ZVBhdGg6ICcvcHJveHknLFxuICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3Byb3h5JyxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmNvbnN0IGhhbmRsZXIgPSAob3B0cyk9PntcbiAgICByZXR1cm4gYWRhcHRlcih7XG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGhhbmRsZXI6IGVycm9ySGFuZGxlZEhhbmRsZXIoaGFuZGxlclVzZXJsYW5kKVxuICAgIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pZGRsZXdhcmUuanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/../ExamOracle/node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next%2Fproxy.ts&page=%2Fproxy&rootDir=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next&matchers=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(middleware)/./lib/session.ts":
/*!************************!*\
  !*** ./lib/session.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SESSION_COOKIE: () => (/* binding */ SESSION_COOKIE)\n/* harmony export */ });\nconst SESSION_COOKIE = \"taskboard_session\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbGliL3Nlc3Npb24udHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU1BLGlCQUFpQixvQkFBb0IiLCJzb3VyY2VzIjpbIi9Vc2Vycy95YXNoc3JpdmFzdGF2YTMyL0Rlc2t0b3AvdGFzay1ib2FyZC1uZXh0L2xpYi9zZXNzaW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBTRVNTSU9OX0NPT0tJRSA9IFwidGFza2JvYXJkX3Nlc3Npb25cIjtcbiJdLCJuYW1lcyI6WyJTRVNTSU9OX0NPT0tJRSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./lib/session.ts\n");

/***/ }),

/***/ "(middleware)/./proxy.ts":
/*!******************!*\
  !*** ./proxy.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   proxy: () => (/* binding */ proxy)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/../ExamOracle/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/session */ \"(middleware)/./lib/session.ts\");\n\n\nconst protectedRoutes = [\n    \"/dashboard\",\n    \"/matching\",\n    \"/messaging\",\n    \"/friend-requests\",\n    \"/profile\",\n    \"/notifications\"\n];\nconst authRoutes = [\n    \"/login\",\n    \"/registration\"\n];\nfunction proxy(request) {\n    const token = request.cookies.get(_lib_session__WEBPACK_IMPORTED_MODULE_1__.SESSION_COOKIE)?.value;\n    const { pathname } = request.nextUrl;\n    const isProtected = protectedRoutes.some((route)=>pathname.startsWith(route));\n    const isAuthRoute = authRoutes.some((route)=>pathname.startsWith(route));\n    if (isProtected && !token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/login\", request.url));\n    }\n    if (isAuthRoute && token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/dashboard\", request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        \"/dashboard/:path*\",\n        \"/matching/:path*\",\n        \"/messaging/:path*\",\n        \"/friend-requests/:path*\",\n        \"/profile/:path*\",\n        \"/notifications/:path*\",\n        \"/login\",\n        \"/registration\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vcHJveHkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUVJO0FBRS9DLE1BQU1FLGtCQUFrQjtJQUN0QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRDtBQUVELE1BQU1DLGFBQWE7SUFBQztJQUFVO0NBQWdCO0FBRXZDLFNBQVNDLE1BQU1DLE9BQW9CO0lBQ3hDLE1BQU1DLFFBQVFELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUCx3REFBY0EsR0FBR1E7SUFDbkQsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR0wsUUFBUU0sT0FBTztJQUVwQyxNQUFNQyxjQUFjVixnQkFBZ0JXLElBQUksQ0FBQyxDQUFDQyxRQUFVSixTQUFTSyxVQUFVLENBQUNEO0lBQ3hFLE1BQU1FLGNBQWNiLFdBQVdVLElBQUksQ0FBQyxDQUFDQyxRQUFVSixTQUFTSyxVQUFVLENBQUNEO0lBRW5FLElBQUlGLGVBQWUsQ0FBQ04sT0FBTztRQUN6QixPQUFPTixxREFBWUEsQ0FBQ2lCLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFVBQVViLFFBQVFjLEdBQUc7SUFDNUQ7SUFFQSxJQUFJSCxlQUFlVixPQUFPO1FBQ3hCLE9BQU9OLHFEQUFZQSxDQUFDaUIsUUFBUSxDQUFDLElBQUlDLElBQUksY0FBY2IsUUFBUWMsR0FBRztJQUNoRTtJQUVBLE9BQU9uQixxREFBWUEsQ0FBQ29CLElBQUk7QUFDMUI7QUFFTyxNQUFNQyxTQUFTO0lBQ3BCQyxTQUFTO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNEO0FBQ0gsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL3lhc2hzcml2YXN0YXZhMzIvRGVza3RvcC90YXNrLWJvYXJkLW5leHQvcHJveHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBTRVNTSU9OX0NPT0tJRSB9IGZyb20gXCJAL2xpYi9zZXNzaW9uXCI7XG5cbmNvbnN0IHByb3RlY3RlZFJvdXRlcyA9IFtcbiAgXCIvZGFzaGJvYXJkXCIsXG4gIFwiL21hdGNoaW5nXCIsXG4gIFwiL21lc3NhZ2luZ1wiLFxuICBcIi9mcmllbmQtcmVxdWVzdHNcIixcbiAgXCIvcHJvZmlsZVwiLFxuICBcIi9ub3RpZmljYXRpb25zXCJcbl07XG5cbmNvbnN0IGF1dGhSb3V0ZXMgPSBbXCIvbG9naW5cIiwgXCIvcmVnaXN0cmF0aW9uXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJveHkocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KFNFU1NJT05fQ09PS0lFKT8udmFsdWU7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHJlcXVlc3QubmV4dFVybDtcblxuICBjb25zdCBpc1Byb3RlY3RlZCA9IHByb3RlY3RlZFJvdXRlcy5zb21lKChyb3V0ZSkgPT4gcGF0aG5hbWUuc3RhcnRzV2l0aChyb3V0ZSkpO1xuICBjb25zdCBpc0F1dGhSb3V0ZSA9IGF1dGhSb3V0ZXMuc29tZSgocm91dGUpID0+IHBhdGhuYW1lLnN0YXJ0c1dpdGgocm91dGUpKTtcblxuICBpZiAoaXNQcm90ZWN0ZWQgJiYgIXRva2VuKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKFwiL2xvZ2luXCIsIHJlcXVlc3QudXJsKSk7XG4gIH1cblxuICBpZiAoaXNBdXRoUm91dGUgJiYgdG9rZW4pIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoXCIvZGFzaGJvYXJkXCIsIHJlcXVlc3QudXJsKSk7XG4gIH1cblxuICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogW1xuICAgIFwiL2Rhc2hib2FyZC86cGF0aCpcIixcbiAgICBcIi9tYXRjaGluZy86cGF0aCpcIixcbiAgICBcIi9tZXNzYWdpbmcvOnBhdGgqXCIsXG4gICAgXCIvZnJpZW5kLXJlcXVlc3RzLzpwYXRoKlwiLFxuICAgIFwiL3Byb2ZpbGUvOnBhdGgqXCIsXG4gICAgXCIvbm90aWZpY2F0aW9ucy86cGF0aCpcIixcbiAgICBcIi9sb2dpblwiLFxuICAgIFwiL3JlZ2lzdHJhdGlvblwiXG4gIF1cbn07XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiU0VTU0lPTl9DT09LSUUiLCJwcm90ZWN0ZWRSb3V0ZXMiLCJhdXRoUm91dGVzIiwicHJveHkiLCJyZXF1ZXN0IiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJwYXRobmFtZSIsIm5leHRVcmwiLCJpc1Byb3RlY3RlZCIsInNvbWUiLCJyb3V0ZSIsInN0YXJ0c1dpdGgiLCJpc0F1dGhSb3V0ZSIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwibmV4dCIsImNvbmZpZyIsIm1hdGNoZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./proxy.ts\n");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "../incremental-cache/tags-manifest.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/lib/incremental-cache/tags-manifest.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/lib/incremental-cache/tags-manifest.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(middleware)/../ExamOracle/node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next%2Fproxy.ts&page=%2Fproxy&rootDir=%2FUsers%2Fyashsrivastava32%2FDesktop%2Ftask-board-next&matchers=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();