// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecordManagement {
    struct HealthRecord {
        string patientName;
        string gender;
        string diagnosedDisease;
        string treatment;
        string visitDate;
        string nextVisitDate;
    }

    mapping(address => HealthRecord[]) private records;

    function addHealthRecord(
        string memory _patientName,
        string memory _gender,
        string memory _diagnosedDisease,
        string memory _treatment,
        string memory _visitDate,
        string memory _nextVisitDate
    ) public {
        HealthRecord memory newRecord = HealthRecord({
            patientName: _patientName,
            gender: _gender,
            diagnosedDisease: _diagnosedDisease,
            treatment: _treatment,
            visitDate: _visitDate,
            nextVisitDate: _nextVisitDate
        });

        records[msg.sender].push(newRecord);
    }

    function getHealthRecords() public view returns (HealthRecord[] memory) {
        return records[msg.sender];
    }
}
