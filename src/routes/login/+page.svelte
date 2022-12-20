<script lang='ts'>
    import {auth} from '../../stores'
    import {redirect} from '@sveltejs/kit'
    let username : string = ''
    let password : string = ''
    let message : string = ''
    const handleLogin = (e : any) => {
        e.preventDefault()
        if(username.toLowerCase() == 'jordan' && password.toLowerCase() == 'password'){
            message = 'Login successful'
            auth.set(true)
            redirect(300, '/')
        } else {
            message = 'Incorrect username and password'
        }
    }

</script>
<div class='flex flex-col w-fit m-auto'>
<h1 class='text-center my-3 text-xl place-self-start'>Login:</h1>
{message}
<form on:submit={(e) => handleLogin(e)} class='flex flex-col w-fit m-auto gap-2'>
        <span class='inline-flex gap-3'>
    <label>
        Username: <input type='text' placeholder='Username' class='px-2' bind:value={username} />
    </label>
    <label>
        Password: <input type='password' placeholder='Password' class='px-2' bind:value={password} />
    </label>
    </span>
    <button type='submit' class='border border-width-2 py-1 hover:bg-slate-50'>Login</button>

</form>
</div>
<style>
    input {
        border: solid black 1px;
        border-radius: 0.4rem;
    }
</style>