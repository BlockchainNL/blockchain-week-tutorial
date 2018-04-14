pragma solidity ^0.4.21;

contract Escrow {

    // STATE VARIABLES
    uint public payment;
    address public client;
    address public freelancer;
    enum EscrowState { Inactive, Active }
    EscrowState public state;

    // MAPPINGS

    // EVENTS
    event EscrowCreated(address _client, address _freelancer);
    event Started(address _client, address _freelancer, uint _reward, uint startTime);
    event Completed(address _client, address _freelancer, uint endTime);
    event Terminated(address _client, address _freelancer, uint terminationTime);

    // MODIFIERS
    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer);
        _;
    }

    modifier inState(EscrowState _state) {
        require(state == _state);
        _;
    }


    function Escrow() public {
        state = EscrowState.Inactive;
        emit EscrowCreated(client, freelancer);
    }
    
    function setClient(address _client) public {
        require(_client != address(0));
        client = _client;
    }
    
    function setFreelancer(address _freelancer) public {
        require(_freelancer != address(0));
        freelancer = _freelancer;
    }
    
    function start() public onlyClient inState(EscrowState.Inactive) payable {
        require(msg.value > 0 && msg.sender.balance >= msg.value);
        payment = msg.value;
        state = EscrowState.Active;
        emit Started(client, freelancer, msg.value, block.timestamp);
    }

    function complete() public onlyFreelancer inState(EscrowState.Active) {
        freelancer.transfer(payment);
        state = EscrowState.Inactive;
        payment = 0;
        emit Completed(client, freelancer, now);
    }

    function terminate() public onlyClient inState(EscrowState.Active) {
        client.transfer(payment);
        payment = 0;
        state = EscrowState.Inactive;
        emit Terminated(client, freelancer, now);
    }
}