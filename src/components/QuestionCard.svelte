<script lang="ts">

    interface Results {
        [key: number] : {
            question: String,
            userAnswer: String,
            actualAnswer : String,
            correct: Boolean
        }
    }
    export let question : string = "Loading question..."
    export let answer : string = ""
    export let questionNum : number = 1
    export let currentQuestion : number = 1
    export let results : Results;
    export let tags : any
    export let wrongTags : string[] = []
    export let score : number = 0
    export let questionLimit : number = 0
    export let topics : string[] = ['All']

    if(tags){
        tags = tags.split(',')
    }
    let correct : boolean
    let userAnswer : string = ''
    let correctAnswer : boolean = false
    let wrongAnswer : boolean = false
    const handleAnswer = (e : any) => {
        if(userAnswer.toLowerCase() == answer.toLowerCase() && !correctAnswer){
            correctAnswer = true
            correct = true
            score += 1
        } else {
            wrongAnswer = true
            correct = false

            if(tags && tags.length > 1){
                for( let i :number = 0; i < tags.length; i++){
                    if(!wrongTags.includes(tags[i])){
                        wrongTags = [...wrongTags, tags[i]]
                    }
                }
            
        } else if(tags) {
            if(!wrongTags.includes(tags[0])){
                wrongTags = [...wrongTags, tags[0]]
        }
        }
        console.log(wrongTags)
    }
        results[questionNum] = {
            question:question,
            userAnswer:userAnswer,
            actualAnswer: answer,
            correct: correct,
        }
        userAnswer = ''
    }
    const handleKeyPress = (event : any) => {
        if(event.key === 'Enter'){
            currentQuestion += 1
        }
    }
    
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
</svelte:head>
{#if !correctAnswer && !wrongAnswer}
<div class='flex flex-col w-fit mt-4 border m-auto shadow-md bg-slate-100'>
    <p class="border-b text-lg mb-4 float-left ml-2">Question {questionNum}</p>
    <div class='px-8 pb-8'>
        <p class='text-center mb-3'>{question}</p>
        <form on:submit={(e) => handleAnswer(e)} class='flex flex-col justify-items-center'>
            <input type="text" placeholder="Answer here..." class='border w-full pl-1' id='user-input' bind:value={userAnswer} required/>
            <button type="submit" class="rounded mt-2 border-transparent px-1 mx-auto border hover:border-black" id='submit-button' on:click={(e)=> handleAnswer(e)}>Submit</button>
        </form>
    </div>
</div>

{:else if correctAnswer}
    <div class=" flexborder border-green-400  bg-green-200 w-4/12 h-6/12 text-center px-4 py-2 shadow-md m-auto mt-4">
        <p class='border-b'>That's right</p>
        <div class='flex flex-col gap-1'>
            <p>{question}</p>
            <p>{answer}</p>
        </div>
        
        
       <!-- svelte-ignore a11y-click-events-have-key-events -->
       <span on:click={() => currentQuestion += 1} class="hover:cursor-pointer hover:underline inline-flex align-middle">
        <button class="w-fit mr-1 border-transparent" autofocus on:keydown={handleKeyPress}>Next</button> 
        <i class="bi bi-arrow-right w-fit m-auto"></i>
        </span>
    </div>
{:else if wrongAnswer}
        <div class=" flexborder border-re-400  bg-red-200 w-4/12 h-6/12 text-center px-4 py-2 shadow-md m-auto mt-4">
            <span class='flex flex-col'>
                <p class='border-b'  >Not quite</p>
                Answer: {answer}
            </span>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click={() => currentQuestion += 1} class="hover:cursor-pointer hover:underline inline-flex align-middle">
                <button on:keydown={handleKeyPress} autofocus class="w-fit mr-1">Next</button> 
                <i class="bi bi-arrow-right w-fit m-auto"></i>
            </span>
        </div>
{/if}
