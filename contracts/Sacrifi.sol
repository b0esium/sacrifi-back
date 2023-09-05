// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Sacrifi is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    uint256 private s_tokenCounter;

    event DogMinted(uint256 indexed tokenId);

    constructor() ERC721("Rugs", "RUG") {
        s_tokenCounter = 0;
    }

    /**
    @dev Allows a user to mint a new NFT.
    @notice The function mints a new NFT using the _safeMint function inherited from the ERC721 contract.
    The NFT is assigned to the msg.sender and the DogMinted event is emitted with the token ID as the parameter.
    The s_tokenCounter variable is incremented by 1.
    */
    function mintNft() external {
        _safeMint(msg.sender, s_tokenCounter);
        emit DogMinted(s_tokenCounter);
        s_tokenCounter++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
