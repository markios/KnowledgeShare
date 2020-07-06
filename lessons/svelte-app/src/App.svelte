<script>
	import Users from './components/Users.svelte';
	let name = 'mark';
</script>

<main>
	<div class="App">
		<header class="App-header">
			Welcome to the svelte app
		</header>
		<section class="container">
			<Users />
		</section>
	</div>
</main>

<style>
  .App-header {
		font-family: Helvetica Neue;
		background-color: #282c34;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: calc(10px + 2vmin);
		color: white;
	}

	.App-link {
		color: #09d3ac;
	}

	.container {
		width: 100%;
		max-width: 43.75rem;
		min-height: 100%;
		margin: 0 auto;
		padding: 0.5rem  1.75rem;
	}

</style>