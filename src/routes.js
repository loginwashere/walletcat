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
  CategoryViewConnected,
  CategoryDeleteConnected,
  RecurringPayments,
  RecurringPaymentCreateConnected,
  ProfileConnected,
  About,
  ContactUs,
  LoginConnected,
  Register,
  AppCurrenciesConnected,
  UserCurrenciesConnected,
  ReportByPeriod,
  ReportByCategory,
  ReportCalendar,
  Logout
} from './components'

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route path="accounts" component={AccountsConnected}/>
      <Route path="accounts/create" component={AccountCreateConnected}/>

      <Route path="transactions" component={TransactionsConnected}/>
      <Route path="transactions/create" component={TransactionCreateConnected}/>

      <Route path="categories" component={CategoriesConnected}/>
      <Route path="categories/create" component={CategoryCreateConnected}/>
      <Route path="categories/:categoryId" component={CategoryViewConnected}/>
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

      <Route path="about" component={About}/>
      <Route path="contact-us" component={ContactUs}/>
      <Route path="login" component={LoginConnected}/>
      <Route path="logout" component={Logout}/>
      <Route path="register" component={Register}/>

      <Route path="*" component={NotFound}/>

    </Route>
  );
}
