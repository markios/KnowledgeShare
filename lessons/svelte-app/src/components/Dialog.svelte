<script>
  import { users } from '../store/UserStore.js';
  import { onMount } from 'svelte';

  export let onClose;

  let dialog;

  onMount(() => dialog.showModal());
  const clickHandler = (e) => {
    dialog.close();
    onClose(); 
  };
</script>

<dialog bind:this={dialog} class="dialog" id="dialog">
  <form method="dialog">
    <section class="dialog__content" id="content">
      <slot></slot>
    </section>
    <menu class="dialog__menu">
      <button id="close" on:click={clickHandler} class="dialog__menu__button" type="reset">Close</button>
    </menu>
  </form> 
</dialog>

<style>
.dialog {
  min-width: 600px;
  min-height: 200px;
  border: none;
  top: 25%;
}

.dialog__content {
  margin-bottom: 60px;
}

.dialog__menu {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: right;
  width: 100%;
  left: 0;
  padding: 0 10px;
  margin: 10px 0;
}

.dialog menu > * {
  margin-left: auto;
  box-sizing: border-box;
}

.dialog__menu__button {
  border: none;
  background-color: var(--hover-color);
  padding: 10px 5px;
  min-width: 100px;
}
</style>