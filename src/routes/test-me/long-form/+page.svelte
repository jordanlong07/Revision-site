<script lang='ts'>
    import LongFormQuestionCard from "../../../components/LongFormQuestionCard.svelte";

    let questions = {
        1: {
            question: "What is a Publish-Subscribe distributed system?",
            points: ['sources', 'delivered', 'unaware', 'automatic'],
            format: 'text'
        },
        2: {
            question: "What are the different states of a program?",
            points: ['new', "running", "waiting", "ready", "terminated"],
            format: 'list'
        }
    }
</script>


{#each Object.entries(questions) as [questionNum, data]}
    <LongFormQuestionCard 
        question={data.question}
        points={data.points}
        questionNum={questionNum}
        type={data.format}
    />
{/each}
