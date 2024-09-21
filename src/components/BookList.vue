<template>
  <v-container>
    <v-row v-if="books.length > 0">
      <v-col v-for="book in books" :key="book.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-text>
            <div>Authors: {{ book.authors.map(author => author.name).join(', ') }}</div>
            <div>Genres: {{ book.genres.map(genre => genre.name).join(', ') }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="$emit('edit', book.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete', book.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else type="info">No books found.</v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  emits: ['edit', 'delete']
};
</script>
