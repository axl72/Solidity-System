// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract FishmealTraceability {
    uint256 constant SCALE_FACTOR = 100;
    uint256 anchovy_batch_counter = 0;

    struct AnchovyBatch {
        uint256 id;
        string enterprise;
        uint256 kilograms;
        string fishingArea;
        bool exists;
        uint256 createdAt;
    }
    
    struct FishmealBatch {
        uint256 id;
        uint256 kilograms;
        string processor_name ;
        uint256 init_range;
        uint256 final_range;
        string id_anchovy_batch;
    }

    struct FishmealPackages {
        uint256 id;
        uint256 fishmeal_batch_id;
        uint256 init_packages_id;
        uint256 packagesCount;
        uint256 final_packages_id;
    }

    event AnchovyBatchCreated(
        uint256 id,
        string enterprise,
        uint256 kilograms,
        string fishingArea,
        bool exits,
        uint256 createdAt
    );

    mapping(uint256 => AnchovyBatch) public anchovy_batches;

    function createAnchovyBatch(string memory _enterprise, uint256 _kilograms, string memory _fishingArea) public {
        anchovy_batch_counter++;
        anchovy_batches[anchovy_batch_counter] = AnchovyBatch(
            anchovy_batch_counter,
            _enterprise,
            _kilograms,
            _fishingArea,
            true,
            block.timestamp
        );   
    }

   
}
