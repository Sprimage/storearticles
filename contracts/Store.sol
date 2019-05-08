pragma solidity >= 0.5.0;

contract DecentralizedJournal {
  mapping (address => uint256[]) public articlesByAuthor;
  uint256[] public articles;
  mapping (address => string) public usernames;
  function setUsername(string calldata username) external {
    usernames[msg.sender] = username;
  }
  function publishArticle() external {
    articles.push(block.number);
    articlesByAuthor[msg.sender].push(block.number);
  }
}