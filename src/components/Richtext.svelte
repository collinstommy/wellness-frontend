<script>
	import { onMount } from 'svelte';

	let editor;
	$: contents = null;

	const update = (delta) => {
		contents = delta;
	};

	const save = () => {
		console.log(contents);
	};

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');
		const { default: QuillMarkdown } = await import('quilljs-markdown');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
		const quillMarkdown = new QuillMarkdown(quill, {});
		quill.on('text-change', update);
	});
</script>

<div class="editor-wrapper">
	<div bind:this={editor} />
	<button on:click={save}>Save</button>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
