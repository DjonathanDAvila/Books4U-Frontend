import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import BookRegistrationView from '../views/BookRegistrationView.vue'
import BookSearchView from '../views/BookSearchView.vue'
import LoanRegistrationView from '../views/LoanRegistrationView.vue'
import LoanSearchView from '../views/LoanSearchView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/book/register/:id?',
    name: 'BookRegistration',
    component: BookRegistrationView
  },
  {
    path: '/book/search',
    name: 'BookSearch',
    component: BookSearchView
  },
  {
    path: '/loan/register',
    name: 'LoanRegistration',
    component: LoanRegistrationView
  },
  {
    path: '/loan/search',
    name: 'LoanSearch',
    component: LoanSearchView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
