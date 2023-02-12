// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DappForum {
    struct Forum {
        string title;
        string description;
        string image;
        uint256 date;
        uint256 id;
        address creator;
        Comment[] comments;
    }

    struct Comment {
        string text;
        uint256 date;
        uint256 forumId;
        address creator;
    }

    struct ForumInfo {
        uint256 id;
        string title;
        uint256 date;
        string description;
        address creator;
        string image;
    }

    uint256 private forumCounter = 0;
    mapping(uint256 => Forum) public forums;

    function createForum(
        string memory _title,
        string memory _description,
        string memory _image
    ) public {
        forumCounter++;
        forums[forumCounter].title = _title;
        forums[forumCounter].description = _description;
        forums[forumCounter].image = _image;
        forums[forumCounter].date = block.timestamp;
        forums[forumCounter].id = forumCounter;
        forums[forumCounter].creator = msg.sender;
    }

    function addComment(uint256 _forumId, string memory _text) public {
        require(_forumId <= forumCounter, "Forum does not exist.");
        Comment memory newComment;
        newComment.text = _text;
        newComment.date = block.timestamp;
        newComment.forumId = _forumId;
        newComment.creator = msg.sender;
        forums[_forumId].comments.push(newComment);
    }

    function deleteForum(uint256 _forumId) public {
        require(_forumId <= forumCounter, "Forum does not exist.");
        require(
            msg.sender == forums[_forumId].creator,
            "Only the creator can delete the forum."
        );
        delete forums[_forumId];
    }

    function deleteComment(uint256 _forumId, uint256 _commentId) public {
        require(_forumId <= forumCounter, "Forum does not exist.");
        require(
            _commentId < forums[_forumId].comments.length,
            "Comment does not exist."
        );
        require(
            msg.sender == forums[_forumId].comments[_commentId].creator,
            "Only the comment creator can delete the comment."
        );
        delete forums[_forumId].comments[_commentId];
    }

    function getAllForums() public view returns (ForumInfo[] memory) {
        ForumInfo[] memory result = new ForumInfo[](forumCounter);
        for (uint256 i = 1; i <= forumCounter; i++) {
            result[i - 1].id = forums[i].id;
            result[i - 1].title = forums[i].title;
            result[i - 1].date = forums[i].date;
            result[i - 1].description = forums[i].description;
            result[i - 1].creator = forums[i].creator;
        }
        return result;
    }

    function getForum(
        uint256 _forumId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            address,
            Comment[] memory
        )
    {
        require(_forumId <= forumCounter, "Forum does not exist.");
        return (
            forums[_forumId].title,
            forums[_forumId].description,
            forums[_forumId].image,
            forums[_forumId].date,
            forums[_forumId].id,
            forums[_forumId].creator,
            forums[_forumId].comments
        );
    }

    function getForumComments(
        uint256 _forumId
    ) public view returns (Comment[] memory) {
        require(_forumId <= forumCounter, "Forum does not exist.");
        return forums[_forumId].comments;
    }
}
