
    // Test that minting a new NFT successfully increments the token counter and emits a DogMinted event with the correct token ID.
function test_mintNft_success() {
    Sacrifi contractInstance = new Sacrifi();
    address owner = address(this);
    uint256 initialTokenCounter = contractInstance.getTokenCounter();
    
    contractInstance.mintNft();
    
    uint256 newTokenCounter = contractInstance.getTokenCounter();
    assert(newTokenCounter == initialTokenCounter + 1, "Token counter was not incremented correctly");
    
    uint256 tokenId = initialTokenCounter;
    DogMinted[] events = contractInstance.getPastEvents("DogMinted", {fromBlock: 0, toBlock: "latest"});
    assert(events.length == 1, "DogMinted event was not emitted");
    assert(events[0].args.tokenId == tokenId, "DogMinted event did not have the correct token ID");
}

    // Test that retrieving the token counter returns the correct value.
function test_getTokenCounter() {
    Sacrifi contractInstance = new Sacrifi();
    uint256 initialTokenCounter = contractInstance.getTokenCounter();
    
    uint256 tokenCounter = contractInstance.getTokenCounter();
    
    assert(tokenCounter == initialTokenCounter, "Token counter was not retrieved correctly");
}

    // Test that retrieving the token URI for a non-existent token reverts with an error message.
function test_tokenURI_nonexistentToken() {
    Sacrifi contractInstance = new Sacrifi();
    uint256 tokenId = 1;
    
    try contractInstance.tokenURI(tokenId) returns (string memory) {
        assert(false, "Retrieving token URI for non-existent token did not revert");
    } catch Error(string memory errorMessage) {
        assert(keccak256(abi.encodePacked(errorMessage)) == keccak256(abi.encodePacked("ERC721Metadata: URI query for nonexistent token")), "Error message is incorrect");
    } catch {
        assert(false, "Retrieving token URI for non-existent token reverted with an unexpected error");
    }
}

    // Test that minting a new NFT after reaching the maximum token ID value (2^256 - 1) reverts with an error message.
function test_mintNft_maximumTokenID() {
    Sacrifi contractInstance = new Sacrifi();
    uint256 maxTokenId = 2**256 - 1;
    
    try contractInstance.mintNft() {
        assert(false, "Minting a new NFT after reaching maximum token ID did not revert");
    } catch Error(string memory errorMessage) {
        assert(keccak256(abi.encodePacked(errorMessage)) == keccak256(abi.encodePacked("SafeMath: addition overflow")), "Error message is incorrect");
    } catch {
        assert(false, "Minting a new NFT after reaching maximum token ID reverted with an unexpected error");
    }
}

    // Test that the contract owner can change the token URI.
function test_changeTokenURI_contractOwner() {
    Sacrifi contractInstance = new Sacrifi();
    address owner = address(this);
    string memory newTokenURI = "ipfs://new_token_uri";
    
    contractInstance.changeTokenURI(newTokenURI);
    
    string memory tokenURI = contractInstance.tokenURI(0);
    assert(keccak256(abi.encodePacked(tokenURI)) == keccak256(abi.encodePacked(newTokenURI)), "Token URI was not changed correctly");
}

    // Test that the contract owner can transfer ownership of the contract.
function test_transferOwnership_contractOwner() {
    Sacrifi contractInstance = new Sacrifi();
    address newOwner = address(0x1234567890);
    
    contractInstance.transferOwnership(newOwner);
    
    address owner = contractInstance.owner();
    assert(owner == newOwner, "Ownership was not transferred correctly");
}
