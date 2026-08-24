/// <reference types="vite/client" />

// App.vue uses a plain <script> block, so vue-tsc cannot infer a type for it
// when main.ts imports it. This shim gives every SFC a component type.
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
	export default component;
}
