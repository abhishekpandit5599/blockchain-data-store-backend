// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorage {
    struct Data {
        string name;
        string email;
        string content;
    }

    Data[] public dataList;

    function saveData(string memory name, string memory email, string memory content) public {
        dataList.push(Data(name, email, content));
    }

    function getAllData() public view returns (Data[] memory) {
        return dataList;
    }

    function getDataByFilter(string memory name, string memory email) public view returns (Data[] memory) {
        Data[] memory filteredData = new Data[](dataList.length);
        uint256 count = 0;

        for (uint256 i = 0; i < dataList.length; i++) {
            if (
                keccak256(abi.encodePacked(dataList[i].name)) == keccak256(abi.encodePacked(name)) &&
                keccak256(abi.encodePacked(dataList[i].email)) == keccak256(abi.encodePacked(email))
            ) {
                filteredData[count] = dataList[i];
                count++;
            }
        }

        return filteredData;
    }
}
