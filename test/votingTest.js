const Voting = artifacts.require("./Voting.sol");

contract("Voting", function(accounts) {
  let votingInstance;

  it("initializes genesis candidate", function() {
    return Voting.deployed()
      .then(function(instance) {
        return instance.candidatesCount();
      })

      .then(function(count) {
        assert.equal(count, 1);
      });
  });

  it("initializes candidates with the correct values", function() {
    return Voting.deployed()
      .then(function(instance) {
        return instance.candidates(1);
      })
      .then(function(candidate) {
        assert.equal(candidate[0], 1, "correct id");
        assert.equal(candidate[1], 0, "correct databaseID");
        assert.equal(candidate[2], 0, "correct vote count");
      });
  });
});
