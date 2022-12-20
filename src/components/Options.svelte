<script lang="ts">
    import { pickBy, shuffle } from 'lodash'
    export let allTags : string[]
    export let selectedTags : string[] = []
    export let questions : string[] = []
    export let options = {
        questions: [''],
    }
    export let optionsPicked : boolean = false
    export let questionsRaw : any

    const addTag = (e : any) => {
        let tag = e.target.innerText
        if(tag == 'All'){
            selectedTags = ['All']
            return
            
        }
        if(!selectedTags.includes(tag)){
            selectedTags = [...selectedTags, tag]
        }
        if(selectedTags.includes('All')){
            selectedTags = selectedTags.filter(t => t!== 'All')
        }
        
    }

    const removeTag = (e : any) => {
        let tag = e.target.innerText
        if(selectedTags.includes(tag)){
            selectedTags = selectedTags.filter(t => t != tag)
        }
        if(selectedTags.length == 0){
            selectedTags = ['All']
        }
    }
    const handleOptions = () => {
        optionsPicked = true
        options.questions = [...selectedTags]
      
        if(selectedTags.includes('All')){
            questions = pickBy(questionsRaw, ({ selected }) => selected)
            questions = shuffle(questions)
            console.log(questions)
        } else {
            for(const key in questionsRaw){
                questionsRaw[key].selected = false
        selectedTags.forEach(tag => {
                if (questionsRaw[key].tags.includes(tag)){
                    questionsRaw[key].selected = true
        }
    });
    }
        }
        
        questions = pickBy(questionsRaw, ({ selected }) => selected)
        questions = shuffle(questions)
        console.log(questions)
    }
</script>
<div class='flex flex-col gap-2 w-fit place-content-center m-auto'>
    <p class='text-center'>Select your topics</p>
    <div class='flex flex-row gap-2'>
        {#each allTags as tag}
        {#if selectedTags.includes(tag)}
        <button class='bg-slate-500 rounded px-2 py-1 cursor-pointer hover:brightness-110' on:click={removeTag}>{tag}</button>
        {:else}
        <button class='bg-slate-300 rounded px-2 py-1 cursor-pointer hover:brightness-90' on:click={addTag}>{tag}</button>
        {/if}
        {/each}
    </div>

        <button class='hover:border w-fit mx-auto px-3 py-1 hover:border-black' on:click={handleOptions}>Submit</button>
    </div>  