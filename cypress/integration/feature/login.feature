@checkout
Feature: Orange HRM - Login
     @positive
     Scenario: [Positive] As a User, I can successfully logged in to dashboard
          Given I am on "LOGIN" page
          When I input username using "ADMIN" account
          And I input password with "ADMIN" credentials
          And I click on the Login button
          Then I successfully logged in to dashboard
     @negative
     Scenario: [Negative] As a User, I cannot logged in to dashboard using invalid username
          Given I am on "LOGIN" page
          When I input username using "INVALID" account
          And I input password with "ADMIN" credentials
          And I click on the Login button
          Then Error message is displayed, stating "Invalid credentials" on "Header"
     @negative
     Scenario: [Negative] As a User, I cannot logged in to dashboard using invalid password
          Given I am on "LOGIN" page
          When I input username using "ADMIN" account
          And I input password with "INVALID" credentials
          And I click on the Login button
          Then Error message is displayed, stating "Invalid credentials" on "Header"
     @negative
     Scenario: [Negative] As a User, I cannot logged in to dashboard without username and password
          Given I am on "LOGIN" page
          When I leave both username and password fields empty
          And I click on the Login button
          Then Error message is displayed, stating "Required" on "Username Password"
     @positive
     Scenario: [Positive] As a User, I can go to recovery password page
          Given I am on "LOGIN" page
          When I click on the Forgot Password link
          Then I redirected to recovery password page