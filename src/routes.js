import React from 'react'
import { IndexRoute, Route } from 'react-router'
import {
  App,
  Home,
  Accounts,
  AccountCreate,
  NotFound,
  Transactions,
  TransactionCreate,
  Categories,
  CategoryCreate,
  CategoryDelete,
  RecurringPayments,
  RecurringPaymentCreate,
  Profile,
  About,
  ContactUs,
  Login,
  Register,
  AppCurrencies,
  UserCurrencies,
  ReportByPeriod,
  ReportByCategory,
  ReportCalendar,
  Logout
} from './components'
import CategoryView from './components/CategoryView'
import AccountView from './components/AccountView'
import AccountDelete from './components/AccountDelete'
import TransactionView from './components/TransactionView'
import TransactionDelete from './components/TransactionDelete'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import Landing from './components/Landing'
import EmailConfirm from './components/EmailConfirm'
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer'
import Agents from './components/Agents'
import AgentCreate from './components/AgentCreate'
import AgentView from './components/AgentView'
import AgentDelete from './components/AgentDelete'

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>

    <Route component={EnsureLoggedInContainer}>
      <Route path="home" component={Home}/>

      <Route path="agents" component={Agents}/>
      <Route path="agents/create" component={AgentCreate}/>
      <Route path="agents/:agentId" component={AgentView}/>
      <Route path="agents/:agentId/delete" component={AgentDelete}/>

      <Route path="accounts" component={Accounts}/>
      <Route path="accounts/create" component={AccountCreate}/>
      <Route path="accounts/:accountId" component={AccountView}/>
      <Route path="accounts/:accountId/delete" component={AccountDelete}/>

      <Route path="transactions" component={Transactions}/>
      <Route path="transactions/create" component={TransactionCreate}/>
      <Route path="transactions/:transactionId" component={TransactionView}/>
      <Route path="transactions/:transactionId/delete" component={TransactionDelete}/>

      <Route path="categories" component={Categories}/>
      <Route path="categories/create" component={CategoryCreate}/>
      <Route path="categories/:categoryId" component={CategoryView}/>
      <Route path="categories/:categoryId/delete"
              component={CategoryDelete}/>

      <Route path="currencies/">
        <Route path="app" component={AppCurrencies}/>
        <Route path="user" component={UserCurrencies}/>
      </Route>

      <Route path="recurring-payments" component={RecurringPayments}/>
      <Route path="recurring-payments/create"
              component={RecurringPaymentCreate}/>

      <Route path="reports/">
        <Route path="by-period" component={ReportByPeriod}/>
        <Route path="by-category" component={ReportByCategory}/>
        <Route path="calendar" component={ReportCalendar}/>
      </Route>

      <Route path="profile" component={Profile}/>
      <Route path="logout" component={Logout}/>
    </Route>

    <Route path="sign-in" component={Login}/>
    <Route path="register" component={Register}/>

    <Route path="about" component={About}/>
    <Route path="contact-us" component={ContactUs}/>
    <Route path="privacy-policy" component={PrivacyPolicy}/>
    <Route path="terms-and-conditions" component={TermsAndConditions}/>

    <Route path="email-confirm/:code" component={EmailConfirm}/>

    <Route path="*" component={NotFound}/>

  </Route>
)

export default routes
