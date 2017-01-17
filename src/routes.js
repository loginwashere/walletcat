import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  AccountsConnected,
  AccountCreateConnected,
  NotFound,
  TransactionsConnected,
  TransactionCreateConnected,
  CategoriesConnected,
  CategoryCreateConnected,
  CategoryDeleteConnected,
  RecurringPayments,
  RecurringPaymentCreateConnected,
  ProfileConnected,
  About,
  ContactUs,
  LoginConnected,
  RegisterConnected,
  AppCurrenciesConnected,
  UserCurrenciesConnected,
  ReportByPeriod,
  ReportByCategory,
  ReportCalendar,
  Logout
} from './components';
import CategoryView from './components/CategoryView';
import AccountView from './components/AccountView';
import AccountDelete from './components/AccountDelete';
import TransactionView from './components/TransactionView';
import TransactionDelete from './components/TransactionDelete';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Landing from './components/Landing';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>

    <Route path="home" component={Home}/>

    <Route path="accounts" component={AccountsConnected}/>
    <Route path="accounts/create" component={AccountCreateConnected}/>
    <Route path="accounts/:accountId" component={AccountView}/>
    <Route path="accounts/:accountId/delete" component={AccountDelete}/>

    <Route path="transactions" component={TransactionsConnected}/>
    <Route path="transactions/create" component={TransactionCreateConnected}/>
    <Route path="transactions/:transactionId" component={TransactionView}/>
    <Route path="transactions/:transactionId/delete" component={TransactionDelete}/>

    <Route path="categories" component={CategoriesConnected}/>
    <Route path="categories/create" component={CategoryCreateConnected}/>
    <Route path="categories/:categoryId" component={CategoryView}/>
    <Route path="categories/:categoryId/delete"
            component={CategoryDeleteConnected}/>

    <Route path="currencies/">
      <Route path="app" component={AppCurrenciesConnected}/>
      <Route path="user" component={UserCurrenciesConnected}/>
    </Route>

    <Route path="recurring-payments" component={RecurringPayments}/>
    <Route path="recurring-payments/create"
            component={RecurringPaymentCreateConnected}/>

    <Route path="reports/">
      <Route path="by-period" component={ReportByPeriod}/>
      <Route path="by-category" component={ReportByCategory}/>
      <Route path="calendar" component={ReportCalendar}/>
    </Route>

    <Route path="profile" component={ProfileConnected}/>

    <Route path="sign-in" component={LoginConnected}/>
    <Route path="logout" component={Logout}/>
    <Route path="register" component={RegisterConnected}/>

    <Route path="about" component={About}/>
    <Route path="contact-us" component={ContactUs}/>
    <Route path="privacy-policy" component={PrivacyPolicy}/>
    <Route path="terms-and-conditions" component={TermsAndConditions}/>

    <Route path="*" component={NotFound}/>

  </Route>
);
