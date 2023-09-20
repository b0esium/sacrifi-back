// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sacrifi is ERC721, ERC721URIStorage, Ownable {
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    uint256 private s_tokenCounter;

    event CreatedNFT(uint256 indexed tokenId);
    event BurnedNFT(uint256 indexed tokenId);

    constructor() ERC721("MyToken", "MTK") {
        s_tokenCounter = 0;
    }

    function safeMint() public onlyOwner {
        s_tokenCounter++;
        emit CreatedNFT(s_tokenCounter);
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, TOKEN_URI);
    }

    function burn(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(msg.sender == ownerOf(tokenId), "Caller is not owner");
        _burn(tokenId);
        emit BurnedNFT(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
