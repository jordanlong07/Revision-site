<script lang='ts'>
import QuestionCard from "./QuestionCard.svelte";
import {onMount} from 'svelte'
let questions = {}
onMount(async () => {
    const res = await fetch('api/acro-questions')
    questions = await res.json()
    console.log(questions)
})

type questionType = {
   [key: number]: {
   question: string 
   answer: string 
   }
}

export let currentQuestion : number = 1
// const questions : questionType = {
//     1: {
//         question: "What does OS stand for?",
//         answer: "Operating System",
//         },
//     2: {
//         question: "What does MMU stand for?",
//         answer: "Memory Management Unit",
//         },
//     3: {
//         question: "What does DMA stand for?",
//         answer: "Direct Memory Access",
//     }
// }
const resetQuiz = () => {
    currentQuestion = 1
    score = 0
}
export let score : number = 0



</script>
<p class='ml-8 mt-3 text-lg'>Score: {score}/{Object.entries(questions).length}</p>
{#await questions}
{#if score < Object.entries(questions).length}
    {#each Object.entries(questions) as [questionNum, data]}
        {#if currentQuestion == questionNum}
            <QuestionCard 
                questionNum={questionNum} 
                question={data.question} 
                answer={data.answer} 
                bind:score={score}
                bind:currentQuestion={currentQuestion}
            />
        {/if}
    {/each}
{:else}
<div class='m-auto text-center w-full '>
    <p class=''>Congrats, you got 100%!!</p>
    <button class='border border-black w-fit px-2 py-1 mt-3 hover:bg-slate-100 hover:shadow-lg' on:click={()=>resetQuiz()}>Reset Quiz?</button>
</div>
{/if}
{/await}