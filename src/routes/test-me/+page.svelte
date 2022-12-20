<script lang='ts'>
    import QuestionCard from "../../components/QuestionCard.svelte";
    import Options from "../../components/Options.svelte";
    interface quizResult {
        [key : number] : {
            question : string
            userAnswer : string
            actualAnswer : string
            correct : boolean
            tags : string[]
        }
    }
    export let results : quizResult = {}
    export let data
    export let wrongTags : string[] = []
    export let score : number = 0
    export let currentQuestion : any = 0
    export let selectedTags : string[] = ['All']
    export let optionsPicked : boolean = false
    export let options = {
        questions: [''],
        questionCount: 'All',
    }

    // Get a list of all the tags in the quiz allow a user to chose from that list, one or many. Allow them to pick an amount of questions 

    export let {questionsRaw} = data
    const {allTagsRaw} = data
    const allTags : string[] = ['All']
    for(let i = 0; i < allTagsRaw.length; i++){
        if(allTagsRaw[i].tags.includes(',')){

            allTagsRaw[i].tags.split(',').forEach(tag => {
                if(!allTags.includes(tag)){
                allTags.push(tag)
                }
            })
        } else{
            if(!allTags.includes(allTagsRaw[i].tags)){
                allTags.push(allTagsRaw[i].tags)
            }
    }
}
    export let questions : string[] = []

    const resetQuiz = () => {
        currentQuestion = 1
        score = 0
    }
    </script>
    {#if !optionsPicked}
    <Options 
        bind:options={options}
        bind:optionsPicked={optionsPicked}
        bind:selectedTags={selectedTags}
        allTags={allTags}
        bind:questionsRaw={questionsRaw}
        bind:questions={questions}
    />
    {/if}
   
    {#if currentQuestion < Object.entries(questions).length && optionsPicked}
    <p class='ml-8 mt-3 text-lg'>Score: {score}/{Object.entries(questions).length}</p>
        {#each Object.entries(questions) as [questionNum, data]}
            {#if currentQuestion == parseInt(questionNum)}
                <QuestionCard 
                    questionNum={parseInt(questionNum)+1} 
                    question={data.question} 
                    answer={data.answer} 
                    bind:score={score}
                    bind:currentQuestion={currentQuestion}
                    bind:results={results}
                    bind:tags={data.tags}
                    bind:wrongTags={wrongTags}
                />
            {/if}
        {/each}

    {:else if optionsPicked && currentQuestion >= Object.entries(questions).length}


    {#if wrongTags.length > 0}
        <div class='inline-flex gap-3 mx-auto mt-3 w-full text-center place-content-center border-b pb-2'>
            <p class='text-xl font-weight-bold '>Area's you need to work on:</p>
            <!-- make it bolder and make the tags look like tags -->
        {#each wrongTags as tag}
        <span class='px-1 rounded bg-sky-300' >{tag}</span>

        {/each}
    </div>
    {/if}
    <div class='m-auto text-center w-full flex flex-col gap-2 '>
        <span class='inline-flex align-middle m-auto'><p class='ml-8 mt-3 text-lg'>{(score / Object.entries(questions).length * 100).toFixed(2)}%</p></span>
        {#each Object.entries(results) as [questionNum, data]}
        {#if data.correct}
        <div class='border border-green-300 bg-green-300'>
            <div>
                <p>Question {questionNum}</p>
                <p>Q: {data.question}</p>
                <p>A: {data.userAnswer}</p>
            </div>
        </div>
        {:else}
        <div class='border border-red-300 bg-red-300'>
            <div>
                <p>Question {questionNum}</p>
                <p>Q: {data.question}</p>
                <p>A: {data.userAnswer}</p>
                <p>Actual Answer: {data.actualAnswer}</p>
            </div>
        </div>
        {/if}
        {/each}
        <button class='border border-black w-fit px-2 py-1 mt-3 hover:bg-slate-100 hover:shadow-lg m-auto' on:click={()=>resetQuiz()}>Reset Quiz?</button>
    </div>
    {/if}
    