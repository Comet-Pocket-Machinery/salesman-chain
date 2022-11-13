<script>
 // import {comprarBoleto,main}from "../scripts_web3/inter.js";

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
   .card {
    background-color: aliceblue;
    border-radius: 1em;
    margin-bottom: 3em;
  }
.card:hover {
  box-shadow: 0 5px 35px 0px rgba(0,0,0,.1);
}

.card:hover::before, .card:hover::after {
  display: block;
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  background: #FDA8CF;
  border-radius: 75px;
  z-index: -1;
  animation: 1s clockwise infinite;
}

.card:hover:after {
  background: #F3CE5E;
  animation: 2s counterclockwise infinite;
}

@keyframes clockwise {
  0% {
    top: -5px;
    left: 0;
  }
  12% {
    top: -2px;
    left: 2px;
  }
  25% {
    top: 0;
    left: 5px;    
  }
  37% {
    top: 2px;
    left: 2px;
  }
  50% {
    top: 5px;
    left: 0;    
  }
  62% {
    top: 2px;
    left: -2px;
  }
  75% {
    top: 0;
    left: -5px;
  }
  87% {
    top: -2px;
    left: -2px;
  }
  100% {
    top: -5px;
    left: 0;    
  }
}

@keyframes counterclockwise {
  0% {
    top: -5px;
    right: 0;
  }
  12% {
    top: -2px;
    right: 2px;
  }
  25% {
    top: 0;
    right: 5px;    
  }
  37% {
    top: 2px;
    right: 2px;
  }
  50% {
    top: 5px;
    right: 0;    
  }
  62% {
    top: 2px;
    right: -2px;
  }
  75% {
    top: 0;
    right: -5px;
  }
  87% {
    top: -2px;
    right: -2px;
  }
  100% {
    top: -5px;
    right: 0;    
  }
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
