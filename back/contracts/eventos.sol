pragma solidity ^0.8.17;

//SPDX-License-Identifier: MIT
contract eventos {
    struct Evento{
        uint256 identificadorEvento;
        address organizador;
        string nombreEvento;
        uint256 fechaEvento;
        uint256 ticketsDisponibles;
        uint256 precioBoleto;   
    }

    struct Boleto{
        uint256 identificador;
        uint256 eventoId;
        address compradorBoleto;
    }
    Boleto[] TodosLosBoletos;
    Evento[] TodosLosEventos;

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    modifier precio_evento_filtro(uint256 precioRecibido, uint256 precioEsperado){
        require (precioRecibido >= 0);
         _;
    }

    function geEventosActivos() public view returns(uint256[] memory){
        uint256[]  memory  EventosActivos = new uint256[](getCantidadEventosActivos());
        uint contadorActivos = 0;
        for(uint256 e = 0; e < TodosLosEventos.length;e++){
            if(TodosLosEventos[e].fechaEvento >= block.timestamp){
                EventosActivos[contadorActivos] = e;
                contadorActivos++;
            }

        }
        return EventosActivos;
    }

    function geEventosActivos1() public view returns(Evento[] memory){
        Evento[]  memory  EventosActivos = new Evento[](TodosLosEventos.length);
        uint contadorActivos = 0;
        for(uint256 e = 0; e < TodosLosEventos.length;e++){
            if(TodosLosEventos[e].fechaEvento >= block.timestamp){

                EventosActivos[contadorActivos] = TodosLosEventos[e];
                contadorActivos++;
            }

        }
        return EventosActivos;
    }

    function getBoletosRestantesPorUsuario(uint256 id_evento)public view returns(uint256){
       uint256 contadorVecesRepetidas = 0;
       for(uint256 e = 0; e < TodosLosBoletos.length;e++){
           if(TodosLosBoletos[e].compradorBoleto == msg.sender && id_evento ==TodosLosBoletos[e].eventoId){
               contadorVecesRepetidas+=1;
           }
       }

       return (3 - contadorVecesRepetidas);

    }

    function getBoletosCompradosPorUsuarioContador() public view returns(uint256){
       uint256 contadorVecesRepetidas = 0;
       for(uint256 e = 0; e < TodosLosBoletos.length;e++){
           if(TodosLosBoletos[e].compradorBoleto == msg.sender){
               contadorVecesRepetidas+=1;
           }
       }
       return contadorVecesRepetidas;
    }

    function getBoletosCompradosPorUsuario()public view returns(string[] memory){
        uint256 boletosCompradosPorUsuario = getBoletosCompradosPorUsuarioContador();
        string[]  memory boletosComprados = new string[](boletosCompradosPorUsuario); 
        uint256 contadorBoletos = 0;
       for(uint256 e = 0; e < TodosLosBoletos.length;e++){
           if(TodosLosBoletos[e].compradorBoleto == msg.sender){
               boletosComprados[contadorBoletos] = TodosLosEventos[TodosLosBoletos[e].eventoId].nombreEvento;
               contadorBoletos++;
           }
       }

       return boletosComprados;
    }

    modifier validar_compra_boleto(uint256 precioRecibido,uint256 eventoID){

        Evento[] memory eventosActivadementeActivos = geEventosActivos1();
        uint256 activo = 0;
        for(uint256 e =0; e < eventosActivadementeActivos.length;e++){
           if( eventosActivadementeActivos[e].identificadorEvento == eventoID){activo = 1; break;}

        }
        require ((activo == 1) && (getBoletosRestantesPorUsuario(eventoID) > 0) && (precioRecibido >= TodosLosEventos[eventoID].precioBoleto));
        _;
    }
    
    function crearEvento(uint256 boletosACrear, string memory nombreEvento, uint256  fechaEvento, uint256 precioBoleto)public precio_evento_filtro(msg.value,boletosACrear) payable  {
        Evento memory nuevoEvento;
        nuevoEvento.identificadorEvento = TodosLosEventos.length;
        nuevoEvento.organizador = msg.sender;
        nuevoEvento.nombreEvento = nombreEvento;
        nuevoEvento.fechaEvento = fechaEvento;
        nuevoEvento.ticketsDisponibles = boletosACrear;
        nuevoEvento.precioBoleto = precioBoleto;
        TodosLosEventos.push(nuevoEvento);
    }

    function comprarBoleto(uint id_evento)public validar_compra_boleto(msg.value,id_evento)payable{
        Boleto memory nuevoBoleto;
        nuevoBoleto.identificador = TodosLosBoletos.length;
        nuevoBoleto.eventoId = id_evento;
        nuevoBoleto.compradorBoleto = msg.sender;
        TodosLosBoletos.push(nuevoBoleto);
        TodosLosEventos[id_evento].ticketsDisponibles -= 1;
    }

    function getCantidadEventos()public view returns(uint256){
       return TodosLosEventos.length; 
    }  

    function getTodosLosEventos()public view returns(uint256[] memory){
        uint256[]  memory  EventosActivos = new uint256[](getCantidadEventosActivos());
        for(uint256 e = 0; e < TodosLosEventos.length;e++){
            EventosActivos[e] = e;
        }
        return EventosActivos;
    }

    function getBoletosRestantesDelEvento(uint256 id_evento)public view returns(uint256){
        return TodosLosEventos[id_evento].ticketsDisponibles;

    }

    function getCantidadEventosActivos() public view returns(uint256){
        uint contadorActivos = 0;
        for(uint256 e = 0; e < TodosLosEventos.length;e++){
            if(TodosLosEventos[e].fechaEvento >= block.timestamp){
                contadorActivos++;
            }

        }
        return contadorActivos;
    }

    function getDescripcionDeEvento(uint256 evento_id)public view returns (string memory){

       return string.concat("{",
       "'nombreEvento': "," '",TodosLosEventos[evento_id].nombreEvento,"'," ,"'fechaEvento': "," '",uint2str(TodosLosEventos[evento_id].fechaEvento),"'," ,"'ticketsDisponibles': "," '",uint2str(TodosLosEventos[evento_id].ticketsDisponibles),"'," ,"'precioBoleto': "," '",uint2str(TodosLosEventos[evento_id].precioBoleto),"'," , "}");


    }

}
