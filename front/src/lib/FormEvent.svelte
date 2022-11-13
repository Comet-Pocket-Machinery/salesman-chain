<script>
  //import { crearEvento } from '../scripts_web3/inter.js'
  let nameEvent = ''
  let date = 0
  let amountTicket = 0
  let price = 0
  function tosend() {
    crearEvent(amountTicket, nameEvent, date, price)
  }
</script>

<style>
  h1 {
    color: black;
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

  input {
    border-radius: 3px;
    font-size: 1.5rem;
    margin: 5px;
  }
  button {
    border: transparent;
    font-size: 1.2rem;
  }
  button:hover {
    background-color: goldenrod;
    color: black;
    border: transparent;
  }
</style>

<div class="card">
  <h1>Make your event</h1>
  <input value={nameEvent} type="text" placeholder="Name event" />
  <br />
  <input value={date} type="number" placeholder="Date evento" />
  <br />
  <input value={amountTicket} type="number" placeholder="Amount tickets" />
  <br />
  <input value={price} type="number" placeholder="ticket price" />
  <br />

  <div>
    <button on:click={tosend}>Create</button>
  </div>
</div>
