@all
Feature: DEF base tests

@def
Scenario: Create new Patent case record
    Given I am on the Query screen

    When I click Data Entry menu and select 'Patent DEF' template
    Then New Data Entry Form screen should be opened

    When I fill fields:
        | Field Name    | Field Value    |
        | Docket Number | #autogenerated |
        | Country       | Belarus        |
        | Case Type     | Black Box      |
        | Relation Type | Division       |
        | Filing Type   | ARIPO Case     |
    And I click Save button
    Then successful toast message should be displayed
    And Record ID should be displayed