<script>
  import {crearEvent}from "../scripts_web3/inter.js";
  let nameEvent="";
  let date=0;
  let amountTicket=0;
  let price=0;
  function tosend(){
crearEvent(amountTicket, nameEvent, date, price);
  }
</script>
<style>
  .card{
    background-color: aliceblue;
    border-radius: 1em;
    margin-bottom: 3em;
  }
  input{
    border-radius: 3px;
        font-size: 1.5rem;
   margin: 5px;
   
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
  <input value="{nameEvent}" type="text" placeholder="Name event"><br>
  <input value="{date}" type="number" placeholder="Date evento"><br>
  <input value="{amountTicket}"type="number" placeholder="Amount tickets"><br>
    <input value="{price}" type="number" placeholder="ticket price"><br>

  <div>
<button on:click="{tosend}">
  Create
</button>
</div>
</div>
