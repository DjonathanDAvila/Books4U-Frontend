<template>
  <v-container>
    <h1 class="mb-4">Book Search</h1>
    <v-form @submit.prevent="searchBooks">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="searchParams.title" label="Title"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="searchParams.author" label="Author"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="searchParams.genre" label="Genre"></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary" class="mt-4">Search</v-btn>
    </v-form>
    <BookList :books="searchResults" class="mt-4" @edit="editBook" @delete="confirmDelete" />
    
    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this book?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteBook">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { bookService } from '../services/bookService';
import BookList from '../components/BookList.vue';

export default {
  name: 'BookSearchView',
  components: {
    BookList
  },
  setup() {
    const router = useRouter();
    const searchParams = ref({ title: '', author: '', genre: '' });
    const searchResults = ref([]);
    const deleteDialog = ref(false);
    const bookToDelete = ref(null);
    const snackbar = ref({ show: false, message: '', color: 'success' });

    const searchBooks = async () => {
      try {
        searchResults.value = await bookService.searchBooks(searchParams.value);
      } catch (error) {
        console.error('Error searching books:', error);
        showSnackbar('Error searching books. Please try again.', 'error');
      }
    };

    const editBook = (bookId) => {
      router.push({ name: 'BookRegistration', params: { id: bookId.toString() } });
    };

    const confirmDelete = (bookId) => {
      bookToDelete.value = bookId;
      deleteDialog.value = true;
    };

    const deleteBook = async () => {
      try {
        await bookService.deleteBook(bookToDelete.value);
        searchResults.value = searchResults.value.filter(book => book.id !== bookToDelete.value);
        showSnackbar('Book successfully deleted.', 'success');
      } catch (error) {
        console.error('Error deleting book:', error);
        showSnackbar('Error deleting book. Please try again.', 'error');
      } finally {
        deleteDialog.value = false;
        bookToDelete.value = null;
      }
    };

    const showSnackbar = (message, color) => {
      snackbar.value = { show: true, message, color };
    };

    onMounted(async () => {
      await searchBooks();
    });

    return {
      searchParams,
      searchResults,
      searchBooks,
      editBook,
      confirmDelete,
      deleteBook,
      deleteDialog,
      snackbar
    };
  }
};
</script>
