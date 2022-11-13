<script>
  import {comprarBoleto}from "../scripts_web3/inter.js";
  	let questions = [
		{ id: 1, text: `Pal norte` },
		{ id: 2, text: `X next` },
		{ id: 3, text: `Rihanna
      ` }
	];

	let selected;

	let answer = '';
  function tosend() {
    comprarBoleto(questions.id)
  }
</script>
<style>
  .card{
    background-color: aliceblue;
    border-radius: 1em;
    margin-bottom: 2em;
  }
  input{
    border-radius: 3px;
        font-size: 1.5rem;
   margin: 5px;
   
  }
  select{
      border-radius: 3px;
        font-size: 1.5rem;
   margin: 5px;
   width: 97%;
  }
  button{
border: transparent;
    font-size: 1.2rem;
  }
  button:hover{
    background-color: goldenrod;
    color: black;
    border: transparent;

  }
</style>
<div class="card">
  <select  value={selected} on:change="{() => answer = ''}">
		{#each questions as question}
			<option  value={question}>
				{question.text}
			</option>
		{/each}
	</select><br>

  <div>
<button on:click="{comprarBoleto}">
  Buy
</button>
</div>
</div>
