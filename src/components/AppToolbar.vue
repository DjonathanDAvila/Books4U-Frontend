<template>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Books4U</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/book/register" text>Register Book</v-btn>
      <v-btn to="/book/search" text>Search Books</v-btn>
      <v-btn to="/loan/register" text>Register Loan</v-btn>
      <v-btn to="/loan/search" text>Search Loans</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppToolbar'
  }
  </script>