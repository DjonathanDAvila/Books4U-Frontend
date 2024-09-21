<template>
  <v-container>
    <h1 class="mb-4">Book Registration</h1>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="book.title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field v-model="book.CDD" label="CDD"></v-text-field>
          <v-text-field v-model="book.CDU" label="CDU"></v-text-field>
          <v-text-field v-model="book.CUTER" label="CUTER"></v-text-field>
          <v-switch v-model="book.active" label="Active"></v-switch>
          <v-text-field
            v-model="book.status"
            label="Status"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="book.copy"
            label="Copy"
            type="number"
          ></v-text-field>
          <v-autocomplete
            v-model="book.genresId"
            :items="filteredGenres"
            label="Genres"
            multiple
            chips
            item-title="name"
            item-value="id"
            :search-input.sync="genreSearch"
          ></v-autocomplete>
          <v-select
            v-model="book.publisherId"
            :items="publishers"
            label="Publisher"
            item-title="name"
            item-value="id"
          ></v-select>
          <v-select
            v-model="book.bookLocalizationId"
            :items="bookLocalizations"
            label="Book Localization"
            item-title="name"
            item-value="id"
            :hint="`Selected: ${getSelectedBookLocalization}`"
            persistent-hint
          ></v-select>
          <v-autocomplete
            v-model="book.authorsIds"
            :items="filteredAuthors"
            label="Authors"
            multiple
            chips
            item-title="name"
            item-value="id"
            :search-input.sync="authorSearch"
          ></v-autocomplete>
          <v-text-field
            v-model.number="book.publication_year"
            label="Publication Year"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary" class="mt-4">Submit</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { bookService } from "../services/bookService";

export default {
  name: "BookRegistrationView",
  setup() {
    const route = useRoute();
    const book = ref({
      id: null,
      title: "",
      CDD: "",
      CDU: "",
      CUTER: "",
      active: true,
      status: "",
      copy: null,
      genresId: [],
      publisherId: null,
      bookLocalizationId: null,
      authorsIds: [],
      publication_year: null,
    });

    const genres = ref([]);
    const publishers = ref([]);
    const bookLocalizations = ref([]);
    const authors = ref([]);

    const genreSearch = ref("");
    const authorSearch = ref("");

    const snackbar = ref({
      show: false,
      message: "",
      color: "success",
    });

    const filteredGenres = computed(() => {
      return genres.value
        .filter((genre) =>
          genre.name.toLowerCase().includes(genreSearch.value.toLowerCase())
        )
        .slice(0, 10);
    });

    const filteredAuthors = computed(() => {
      return authors.value
        .filter((author) =>
          author.name.toLowerCase().includes(authorSearch.value.toLowerCase())
        )
        .slice(0, 10);
    });

    onMounted(async () => {
      try {
        [genres.value, publishers.value, bookLocalizations.value, authors.value] = await Promise.all([
          bookService.getGenres(),
          bookService.getPublishers(),
          bookService.getBookLocalizations(),
          bookService.getAuthors(),
        ]);

        if (route.params.id) {
          const bookData = await bookService.getBook(route.params.id);
          book.value = {
            ...book.value,
            ...bookData,
            genresId: bookData.genres.map(genre => genre.id),
            authorsIds: bookData.authors.map(author => author.id),
            publisherId: bookData.publisher ? bookData.publisher.id : null,
            bookLocalizationId: bookData.bookLocalization ? bookData.bookLocalization.id : null,
          };
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar("Error fetching data. Please try again.", "error");
      }
    });

    const submitForm = async () => {
      try {
        let savedBook;
        if (book.value.id) {
          savedBook = await bookService.updateBook(book.value);
        } else {
          savedBook = await bookService.saveBook(book.value);
        }
        console.log("Book saved:", savedBook);
        showSnackbar("Book successfully saved!", "success");
        // Reset form
        book.value = {
          id: null,
          title: "",
          CDD: "",
          CDU: "",
          CUTER: "",
          active: true,
          status: "",
          copy: null,
          genresId: [],
          publisherId: null,
          bookLocalizationId: null,
          authorsIds: [],
          publication_year: null,
        };
      } catch (error) {
        console.error("Error saving book:", error);
        showSnackbar("Error saving book. Please try again.", "error");
      }
    };

    const showSnackbar = (message, color) => {
      snackbar.value.message = message;
      snackbar.value.color = color;
      snackbar.value.show = true;
    };

    const getSelectedBookLocalization = computed(() => {
      const selected = bookLocalizations.value.find(loc => loc.id === book.value.bookLocalizationId);
      return selected ? selected.name : 'None selected';
    });

    return {
      book,
      genres,
      publishers,
      bookLocalizations,
      authors,
      submitForm,
      filteredGenres,
      filteredAuthors,
      genreSearch,
      authorSearch,
      getSelectedBookLocalization,
      snackbar,
    };
  },
};
</script>
