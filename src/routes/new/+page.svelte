<script lang='ts'>
    import {PrismaClient} from '@prisma/client'
    
    let newQuestion : string;
    let newAnswer : string;
    let message : string = ''
    let tags : string[] = []
    let newTag : string = ''
    const colors = [
        'bg-red-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-200',
        'bg-indigo-200',
        'bg-purple-200',
        'bg-pink-200'
    ]
    async function addNewEntry(e : any){
        if(newTag){
            return
        }
        e.preventDefault()
        const data = {
                question:newQuestion,
                answer:newAnswer,
                tags:tags
           }
        
        fetch('/api/new-question',{
            method: 'POST',
            body: JSON.stringify(data)
        }
        ).then((res) => {if(res.status && res.status == 200){
            message = 'Added successfully'
        }})
        newQuestion = ''
        newAnswer = '' 
        tags = []
    }
    const handleNewTag = (e : any) => {
        if(newTag.trim() == '' || tags.includes(newTag)){
            return
        }
        if(e.key == 'Enter'){
            tags = [...tags, newTag]
            newTag = ''
        }
    }
    const removeTag = (e : any) => {
        if(tags.length == 1){
            tags = []
            return
        }
        tags = tags.filter((tag) => tag != e.target.innerText)
    }
</script>
<div class=' mt-3 w-full flex flex-col'>
    <h1 class='text-lg text-center'>Add a new question</h1>
    <form on:submit={(e) => addNewEntry(e)} class='flex flex-col gap-3 mx-auto w-1/2'>
        <p class='text-center text-green-500'>{message}</p>
    <label class='inline-flex gap-2'>
        <p class=''>Question:</p>

        <input type='text' 
        class='border border-black pl-1 rounded w-full' 
        style='height:1.8rem'
        bind:value={newQuestion}
        required
        />
    </label>

    <label class='inline-flex gap-5'>
        <p class=''>Answer: </p>

        <input type='text' 
            class='border border-black pl-1 rounded w-full' 
            style='height:1.8rem'
            bind:value={newAnswer}
            required
            />
    </label>
</form>
<div class='mx-auto mt-3'>
    <label class="inline-flex gap-10"> <p>Tags:</p> 
        <div class='border border-black pl-1 py-1 rounded'>
            <span class='inline-flex gap-2'>
                {#each tags as tag}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class='px-1 rounded {colors[Math.floor(Math.random() * colors.length)]} hover:brightness-90 cursor-pointer' on:click={removeTag}>{tag}</span>
                {/each}
            </span>
            <input type='text' class='focus:border-none' bind:value={newTag} on:keydown={handleNewTag}/>
        </div>
    </label>
    </div>

    <button type='submit' class='px-1 py-2 border w-full hover:bg-slate-100 rounded mt-3' on:click={(e) => addNewEntry(e)}>Add question</button>

  
</div>

<style>

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
  outline: none
}
input{
    outline: none
}

</style>