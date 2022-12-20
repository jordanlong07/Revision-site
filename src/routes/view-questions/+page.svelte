<script lang="ts">
    import EditQuestion from '../../components/EditQuestion.svelte';
    import { auth } from '../../stores'
    export let data : any;
    let {allQuestions} = data
    let message : string = ''
    let questionCount = Object.entries(allQuestions).length
    const entries : any = Object.entries(allQuestions)

    export let editContext : any;
    const handleRemove = async (id : number, questionNum : string) => {
        fetch('/api/remove-question',{
            method: 'POST',
            body: JSON.stringify(id)
        }
        ).then((res) => {if(res.status && res.status == 200){
            message = 'Successfully removed'
            document.getElementById(questionNum)!.style.display = 'none'
        } else {
            message = 'An error has occurred'
        }
    })
    }

    const handleEdit = (data:any) => {
        if(!editContext){
            editContext = data
        } else {
            editContext = ''
            setTimeout(()=>editContext=data)
            
        }
        window.scrollTo(0,0)
    }
</script>


{#if $auth}
<div class='flex flex-row w-full' id='container'>
    <div class='w-full basis-1/2'>
        <div class="flex flex-col gap-4 ml-3 w-8/12 py-2 text-center h-full overflow-y-scroll"> 
            <p>Questions: {questionCount}</p>
            {#each entries as [questionNum, data]}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class='flex gap-8 border px-6 align-middle' id={questionNum} >
                <div class='flex flex-col gap-2 w-full'>
                    <span class='basis-10/12'><p>Q: {data.question}</p> <p>A: {data.answer}</p></span>
                    {#if data.tags}
            <div class='flex flex-row gap-2 place-content-center'>
                {#each data.tags.split(',') as tag}
                <p class='text-xs text-gray-500 text-center'>{tag}</p>
                {/each}
            </div>  
            {/if}
                </div>
                    <span class='flex flex-col gap-3 align-middle'>
                        <i class="bi bi-pencil-square cursor-pointer hover:text-slate-500 h-fit w-fit m-auto" on:click={()=>handleEdit(data)}></i>
                        <i class="bi bi-trash cursor-pointer hover:text-red-500 h-fit w-fit m-auto" on:click = {() => handleRemove(parseInt(data.id), questionNum)}></i>
                    </span>
         
            
        </div>
        {/each}
        </div>
    </div>
    <div class='basis-1/2 m-2'>
    {#if editContext}
    <EditQuestion data={editContext} bind:editContext={editContext} />
    {/if}
    </div>
</div>
{:else}
    <p class='text-3xl text-center mt-5 text-red-500'>Permission denied, please <a href="/login" class=' hover:font-bold underline'>Login</a> to continue</p>


    {/if}
<style>
    #container {
        height: calc(100vh - 2.5rem);
        padding: 0;
        margin: 0;
    }
</style>