pragma solidity ^0.5.0;

contract Voting {
    // Model a Candidate
    struct Candidate {
        uint id;
        uint databaseID;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping (uint=>bool) public voters;

    // Store candidate
    // Read Candidate
    mapping (uint=>Candidate) public candidates;
    
    // Store Candidate Count
    // Using counterCache to determine how many Candidates are there after mapping
    // Helpful for accessing each Candidate inside loops
    uint public candidatesCount;

    // Constructor
    constructor () public { 
        addCandidate(0);
        // for (uint8 i = 0; i < 99; i++) {
        //     addCandidate(i);
        // }
    }

    // Add Candidate
    function addCandidate(uint _databaseID) public {
        candidatesCount++;
        // Instantiate the candidate
        candidates[candidatesCount] = Candidate(candidatesCount, _databaseID, 0);
    }

    // Voting
    // Read candidate from mapping, increase voteCount from that candidate
    function vote(uint _candidateID, uint _databaseID) public {
        // Record that the voter has voted, to ensure that the voter can vote once
        // Access the voter using msg.sender
        // Add the voter to voters mapping and set the value to true
        voters[_databaseID] = true;

        // Increase the vote count of the voted candidate
        candidates[_candidateID].voteCount++;
    }
}