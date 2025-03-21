
Feature: Profanity Filter via REST API

  Scenario: Filter a sentence with default profanity list
    Given I have the text "you motherfucker idiot"
    When I send a REST request to the profanity filter
    Then the response should contain filtered characters

  Scenario: Custom blacklist is ignored
    Given I have the text "bad app and nasty site"
    And I use the blacklist "bad,nasty"
    When I send a REST request to the profanity filter
    Then the response should return the original text

  Scenario: Get RESTful response in JSON format
    Given I have the text " response"
    And I want the response format to be "json"
    When I send a REST request to the profanity filter
    Then the response should be a valid JSON response

  Scenario: Profane word is filtered
    Given I have the text "You son of a bitch"
    When I send a REST request to the profanity filter
    Then the response should contain filtered characters

  Scenario: Clean sentence remains unchanged
    Given I have the text "hello how are you"
    When I send a REST request to the profanity filter
    Then the response should return clean text


  Scenario: Profane word replaced with custom fill text
    Given I have the text "you piece of shit"
    And I want to use "---" as the replacement
    When I send a REST request with custom fill text
    Then the response should include "---"