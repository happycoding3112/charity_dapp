// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Charity {
    address public owner;
    uint public campaignCount;
    uint public balance;
    statsStruct public stats;
    campaignStruct[] campaigns;

    constructor() {
        owner = msg.sender;
    }

    mapping(address => campaignStruct[]) campaignsOf;
    mapping(uint => donorStruct[]) donorsOf;
    mapping(uint => bool) public campaignExists;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct campaignStruct {
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint cost;
        uint raised;
        uint deadline;
        uint donors;
        uint timestamp;
        statusEnum status;
    }

    struct statsStruct {
        uint totalCampaigns;
        uint totalDonors;
        uint totalDonations;
    }

    struct donorStruct {
        address owner;
        uint donationAmount;
        uint timestamp;
        bool refunded;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    function getCampaign(uint id) public view returns (campaignStruct memory) {
        require(campaignExists[id], "Campaign not found");
        return campaigns[id];
    }

    function getCampaigns() public view returns (campaignStruct[] memory) {
        return campaigns;
    }

    function getDonors(uint id) public view returns (donorStruct[] memory) {
        return donorsOf[id];
    }

    function payTo(address receiverAddress, uint256 amount) internal {
        (bool success, ) = payable(receiverAddress).call{value: amount}("");
        require(success);
    }

    function performPayout(uint id) internal {
        uint raised = campaigns[id].raised;

        campaigns[id].status = statusEnum.PAIDOUT;

        payTo(campaigns[id].owner, raised);

        balance -= campaigns[id].raised;

        emit Action(id, "Project Paid Out", msg.sender, block.timestamp);
    }

    function payoutToCampaign(uint id) public returns (bool) {
        require(
            campaigns[id].status == statusEnum.APPROVED,
            "Campaign is not APPROVED"
        );
        require(
            msg.sender == campaigns[id].owner || msg.sender == owner,
            "Unauthorized entity"
        );

        performPayout(id);
        return true;
    }

    function performRefund(uint id) internal {
        for (uint i = 0; i < donorsOf[id].length; i++) {
            address _owner = donorsOf[id][i].owner;
            uint _donationMade = donorsOf[id][i].donationAmount;

            donorsOf[id][i].refunded = true;
            donorsOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _donationMade);

            stats.totalDonors -= 1;
            stats.totalDonations -= _donationMade;
        }
    }

    function createCampaign(
        string memory title,
        string memory description,
        string memory imageURL,
        uint cost,
        uint deadline
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image cannot be empty");
        require(cost > 0 ether, "Cost cannot be zero");

        campaignStruct memory campaign;
        campaign.id = campaignCount;
        campaign.owner = msg.sender;
        campaign.title = title;
        campaign.description = description;
        campaign.imageURL = imageURL;
        campaign.cost = cost;
        campaign.deadline = deadline;
        campaign.timestamp = block.timestamp;

        campaigns.push(campaign);
        campaignExists[campaignCount] = true;
        campaignsOf[msg.sender].push(campaign);
        stats.totalCampaigns += 1;

        emit Action(
            campaignCount++,
            "CAMPAIGN CREATED!",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function updateCampaign(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint deadline
    ) public returns (bool) {
        require(
            msg.sender == campaigns[id].owner,
            "You can edit only your Campaigns!"
        );
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image cannot be empty");

        campaigns[id].title = title;
        campaigns[id].description = description;
        campaigns[id].imageURL = imageURL;
        campaigns[id].deadline = deadline;

        emit Action(id, "CAMPAIGN UPDATED!", msg.sender, block.timestamp);

        return true;
    }

    function deleteCampaign(uint id) public returns (bool) {
        require(
            campaigns[id].status == statusEnum.OPEN,
            "Project is no longer open to be deleted!"
        );
        require(
            campaigns[id].owner == msg.sender,
            "You can delete only your Campaigns"
        );

        campaigns[id].status = statusEnum.DELETED;
        performRefund(id);

        emit Action(id, "CAMPAIGN DELETED", msg.sender, block.timestamp);

        return true;
    }

    function donateToCampaign(uint id) public payable returns (bool) {
        require(campaignExists[id], "Campaign does not exist");
        require(
            campaigns[id].status == statusEnum.OPEN,
            "Campaign is no longer Open for donations"
        );
        require(msg.value > 0 ether, "Donation amount cannot be zero");

        stats.totalDonors += 1;
        stats.totalDonations += msg.value;
        campaigns[id].raised += msg.value;
        campaigns[id].donors += 1;

        donorsOf[id].push(
            donorStruct(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(id, "Donation Successful", msg.sender, block.timestamp);

        if (campaigns[id].raised >= campaigns[id].cost) {
            campaigns[id].status = statusEnum.APPROVED;
            balance += campaigns[id].raised;
            performPayout(id);
        }

        if (block.timestamp >= campaigns[id].deadline) {
            campaigns[id].status = statusEnum.REVERTED;
            performRefund(id);
            return true;
        }

        return true;
    }
}
