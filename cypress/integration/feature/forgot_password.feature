@checkout
Feature: Orange HRM - Forgot Password
     # @positive
     # Scenario: [Positive] As a User, I can recover my password
     #      Given I am on "FORGOT PASSWORD" page
     #      When I input username using "ADMIN" account
     #      And I click on the Reset Password button
     #      Then Reset password link successfully sent to my email
     @negative
     Scenario: [Negative] As a User, I cannot recover my password without username
          Given I am on "FORGOT PASSWORD" page
          And I click on the Reset Password button
          Then Error message is displayed, stating "Required" on "Username"