<script lang="ts">
    export let data : any;
    export let editContext : any;
    let question : string= data.question
    let answer : string = data.answer
    let id : number = parseInt(data.id)
    let tags : string[] = []
    if(data.tags){
        tags = data.tags.split(',')
    }
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
    const handleNewTag = (e : any) => {

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
    const handleSubmit = (e : any) => {
        e.preventDefault()
        if(document.getElementById('tag-box')! == document.activeElement){
            return
        }

        let toUpdate = {
            id:id,
            question:question,
            answer:answer,
            tags: tags.toString()
        }
        fetch('/api/edit-question',{
            method: 'POST',
            body: JSON.stringify(toUpdate)
        }
        ).then((res) => {if(res.status && res.status == 200){
            editContext = ''
        }})
    }
</script>
<div class='border shadow-md  mt-10 pt-3'>
    <form class='flex flex-col w-full'>
        <span class='flex'>
            <p class=' float-left ml-3 text-lg basis-10/12'>Edit a question - {id}</p>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <p class='mb-4 underline w-fit m-auto px-4 hover:text-red-600 cursor-pointer' on:click={()=>editContext=''}>Close</p>
        </span>
        <span class='flex flex-row gap-3 m-auto '>
            <label class=''> Question
                <input  type='text'class='border  w-96' bind:value={question} />
            </label>
        </span>
        <span class='flex flex-row gap-3 mx-auto  my-3'>
            <label> Answer
                <input type='text' class='border w-96 ml-2' bind:value={answer} />
            </label>
        </span>
        <span class="flex flex-row gap-3 m-auto mb-3">
            <label class="inline-flex"> <p class='mr-8'>Tags</p> 
                <div class='border border-black pl-1 py-1 rounded'>
                    <span class='inline-flex gap-2'>
                    {#each tags as tag}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class='px-1 rounded {colors[Math.floor(Math.random() * colors.length)]} hover:brightness-90 cursor-pointer' on:click={removeTag}>{tag}</span>
                    {/each}
                </span>
                <input type='text' class='focus:border-none' id='tag-box' bind:value={newTag} on:keydown={handleNewTag}/>
                </div>
            </label>
        </span>

        <button class='mb-4 border w-fit px-4 place-self-center hover:bg-slate-100 ml-1/2 '  
        on:click={(e)=>handleSubmit(e)}>
    Save Changes
    </button>
</form>

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