import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Accounts,
  NotFound,
  Blotter,
  Categories,
  RecurringPayments,
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

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route path="accounts" component={Accounts}/>

      <Route path="blotter" component={Blotter}/>
      <Route path="categories" component={Categories}/>
      <Route path="currencies/">
        <Route path="app" component={AppCurrencies}/>
        <Route path="user" component={UserCurrencies}/>
      </Route>
      <Route path="recurring-payments" component={RecurringPayments}/>
      <Route path="reports/">
        <Route path="by-period" component={ReportByPeriod}/>
        <Route path="by-category" component={ReportByCategory}/>
        <Route path="calendar" component={ReportCalendar}/>
      </Route>
      <Route path="profile" component={Profile}/>

      <Route path="about" component={About}/>
      <Route path="contact-us" component={ContactUs}/>
      <Route path="login" component={Login}/>
      <Route path="logout" component={Logout}/>
      <Route path="register" component={Register}/>

      <Route path="*" component={NotFound}/>

    </Route>
  );
}