// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

/**
 * @title CompaignFactory
 * @dev Implements Campaign Factory for campaign creation
 */
contract CompaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Compaign(minimum, msg.sender));

        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

/**
 * @title Compaign
 * @dev Implements kickstarter like process along with campaign creation
 */
contract Compaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
    }

    address public manager;
    Request[] public requests;
    mapping(address => bool) public approvers;
    mapping(address => bool) approvals;
    uint256 public approversCount;
    uint256 public minimumContribution;
    uint256 public numRequests;

    modifier restricted() {
        require(manager == msg.sender, "You are not the manager");
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "Amount sent is less than the minimum contribution limit."
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public restricted {
        require(
            value <= address(this).balance,
            "Not enough money to request that amount"
        );

        Request memory newReq;
        newReq.description = description;
        newReq.value = value;
        newReq.recipient = recipient;
        newReq.complete = false;
        newReq.approvalCount = 0;

        numRequests++;
        requests.push(newReq);
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "You are not an approver.");
        require(
            !approvals[msg.sender],
            "You have already voted on this request."
        );
        require(!request.complete, "Request was already finalized.");

        approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(!request.complete, "Request was already finalized.");
        require(
            request.approvalCount > (approversCount / 2),
            "Not enough approvals."
        );

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numRequests;
    }

    function getAllRequests() public view returns (Request[] memory) {
        return requests;
    }
}
