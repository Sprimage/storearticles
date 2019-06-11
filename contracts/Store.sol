pragma solidity >= 0.5.0;

contract Store {
  
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

 function fetchLatestArticle() public view returns(uint256) {
    uint length = articlesByAuthor[msg.sender].length - 1;
    return articlesByAuthor[msg.sender][length];
  }

  function () external {
  }
}