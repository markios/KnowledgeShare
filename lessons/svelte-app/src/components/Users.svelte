<script>
  import { onMount, onDestroy } from 'svelte';
  import { getUsers, users } from '../store/UserStore.js';
  
  let fetchingUsers;
  
  onMount(async () => {
    fetchingUsers = getUsers();
  });

  $: count = $users.results.length;

</script>

<div class="users">
  {#await fetchingUsers}
    <p class="users__loading">Loading</p>
  {:then}
    <p>Total: {count}</p>
    {#each $users.results as user}
      <div key={user.id} class="users__user">
        <a class="users__user__a" data-target={user.id} href='#'>{user.name.title} {user.name.first} {user.name.last}</a>
      </div>
    {/each}
  {:catch error}
    <p class="users__failed">{error}</p>
  {/await}
</div>

<style>
.users {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 50vh;
  padding-top: 2rem;
}

.users__loading {
  display: block;
  height: 100%;
}

.users__user {
  width: 100%;
}

.users__user__a {
  display: block;
  padding: 1rem;
}

.users__total {
  text-align: right;
  width: 100%;
}

.users__failed {
  font-size: 3.125rem;
}

.users__user__a:hover {
  background-color: var(--hover-color);
}

.users__user:nth-of-type(odd) {
  background-color: var(--highlight-color);
}
</style>