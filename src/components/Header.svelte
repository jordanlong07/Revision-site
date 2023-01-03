<script lang="ts">
    import "../app.css";
    import { auth } from '../stores'
    const links = {
        "Home": "/",
        "Test Me" : "/test-me",
        "Submit Questions": "/new",
    }
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    <title>Jordan's revision tool</title>
</svelte:head>
<div class="w-full bg-sky-100 border-b border-black inline-flex gap-8  py-2 h-10 justify-between pr-3">
    <h3 class="ml-3"><a href="/">Revision Tool</a></h3>
   <div class='flex flex-row gap-6'>
    {#each Object.entries(links) as [name, data]}
        <a href="{data}"><p class='w-fit' >{name}</p></a>

    {/each}
    {#if $auth}
        <a href="/view-questions"><p class='w-fit' >Moderate</p></a>
    {:else}
        <a href="/login"><p class='w-fit' >Admin Login</p></a>
    {/if}
    </div>
</div>
<style scoped>
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>