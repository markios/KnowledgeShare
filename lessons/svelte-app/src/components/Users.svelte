<script>
  import { onMount, onDestroy } from 'svelte';
  import { getUsers, users } from '../store/UserStore.js';
  import Dialog from './Dialog.svelte';
  
  let fetchingUsers;
  
  onMount(async () => {
    fetchingUsers = getUsers();
  });

  let showModal = false;
  let selectedUser = null;
  $: count = $users.results.length;

  const onUserClick = (event) => {
    const target = Number(event.target.dataset.target);
    selectedUser = $users.results.find(user => user.id === target);
    showModal = true;
  }

  const onDialogClose = () => {
    showModal = false;
    selectedUser = null;
  }

  let newuser = '';

</script>

<div class="users">
  {#await fetchingUsers}
    <p class="users__loading">Loading</p>
  {:then}
    <p>Total: {count}</p>
    {#each $users.results as user}
      <div key={user.id} class="users__user">
        <a class="users__user__a" on:click={onUserClick} data-target={user.id} href='#'>{user.name.title} {user.name.first} {user.name.last}</a>
      </div>
    {/each}
    {#if showModal}
       <Dialog onClose={onDialogClose}>
         <h3>{selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}</h3>
         <p><strong>Age: </strong> {selectedUser.dob.age}</p>
         <p><strong>City: </strong>{selectedUser.location.city}</p>
         <p><strong>Country: </strong>{selectedUser.location.country}</p>
       </Dialog>
    {/if}
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